import { db } from "@/db";
import {
  customer,
  facebookPage,
  liveStream,
  product,
  stockHold,
} from "@/db/schema";
import { ensureLiveStreamExists } from "@/lib/ensure-livestream";
import { parseCommentClaim } from "@/lib/parse-comment-claim";
import "dotenv/config";
import { and, eq, gte } from "drizzle-orm";
import type { Handler } from "hono";

const EIGHT_HOURS_MS = 8 * 60 * 60 * 1000;
const VERIFY_TOKEN = process.env.FB_WEBHOOK_SECRET_TOKEN;
const FB_APP_ID = process.env.FACEBOOK_APP_ID!;
const FB_APP_SECRET = process.env.FACEBOOK_APP_SECRET!;
const REDIRECT_URI = `${process.env.APP_URL}/api/facebook/callback`;

export const facebookControllers = {
  get: (async (c) => {
    const mode = c.req.query("hub.mode");
    const token = c.req.query("hub.verify_token");
    const challenge = c.req.query("hub.challenge")!;

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("Webhook verified successfully!");
      return c.text(challenge, 200);
    }

    return c.text("Forbidden", 403);
  }) satisfies Handler,
  post: (async (c) => {
    const body = await c.req.json();

    console.log("Incoming Webhook Event:", JSON.stringify(body, null, 2));

    if (body.object === "page") {
      for (const entry of body.entry) {
        const pageId = entry.id;

        const page = await db.query.facebookPage.findFirst({
          where: {
            id: pageId,
          },
        });

        if (!page) {
          return c.text("PAGE_NOT_FOUND", 200);
        }

        for (const change of entry.changes) {
          // Filter strictly for new comments on the feed
          if (
            change.field === "feed" &&
            change.value?.item === "comment" &&
            change.value?.verb === "add"
          ) {
            const comment = change.value;

            const commentId = comment.comment_id;
            const postId = comment.post_id;
            const senderId = comment.from?.id;
            const senderName = comment.from?.name;
            const messageText = comment.message?.trim(); // e.g., "Mine 3AB"
            const sentAt = comment.created_time;

            const claim = parseCommentClaim(messageText);

            if (claim) {
              console.log(
                `Valid Claim Detected! Buyer: ${senderName} (${senderId}) | Code: ${claim.code} | Qty: ${claim.quantity}`,
              );

              const foundProduct = await db.query.product.findFirst({
                where: {
                  code: claim.code,
                },
              });

              if (!foundProduct) {
                console.warn(
                  `[Claim Ignored] Code "${claim.code}" not found for Page ${pageId}`,
                );
                return c.text("PRODUCT_NOT_FOUND_HANDLED", 200);
              }

              // const productStockHolds = await db.query.stockHold.findMany({
              //   where: {
              //     productId: foundProduct.id,
              //   },
              //   columns: {
              //     quantity: true,
              //   },
              // });

              const productStockHolds = await db
                .select({ quantity: stockHold.quantity })
                .from(stockHold)
                .where(
                  and(
                    eq(stockHold.userId, page.userId),
                    eq(stockHold.productId, foundProduct.id),
                    eq(stockHold.status, "reserved"),
                    gte(stockHold.expiresAt, new Date()),
                  ),
                );

              const productWithHeldStock = productStockHolds.reduce(
                (sum, hold) => sum + hold.quantity,
                0,
              );
              const available = foundProduct.stock - productWithHeldStock;

              if (available >= claim.quantity) {
                try {
                  // insert customer first
                  const [createdCustomer] = await db
                    .insert(customer)
                    .values({
                      facebookPsid: senderId,
                      facebookName: senderName,
                      userId: page.userId,
                    })
                    .onConflictDoUpdate({
                      target: [customer.userId, customer.facebookPsid],
                      set: {
                        facebookName: senderName,
                      },
                    })
                    .returning();

                  const foundLiveStream = await ensureLiveStreamExists(
                    page.id,
                    postId,
                  );

                  if (!foundLiveStream)
                    return c.text("PRODUCT_CLAIMED_UNSUCESSFUL", 200);

                  // reserve a stock hold
                  await db.insert(stockHold).values({
                    commentId,
                    userId: page.userId,
                    customerId: createdCustomer.id,
                    expiresAt: new Date(sentAt * 1000 + EIGHT_HOURS_MS),
                    productId: foundProduct.id,
                    quantity: claim.quantity,
                    liveStreamId: foundLiveStream.id,
                  });

                  return c.text("PRODUCT_CLAIMED_SUCCESSFULLY", 200);
                } catch (e: any) {
                  // return c.text("PRODUCT_CLAIMED_UNSUCCESSFUL", 200);
                  return c.text(e.message, 200);
                }
              }
            } else {
              console.log(`Ignored non-claim comment: "${messageText}"`);
            }
          }
        }
      }
    }

    return c.text("EVENT_RECEIVED", 200);
  }) satisfies Handler,
  connect: (async (c) => {
    const user = c.get("user");
    if (!user) return c.text("Unauthorized", 401);
    const userId = user.id;

    // Pass userId in 'state' so callback knows who is authenticating
    const scopes = [
      "pages_show_list",
      "pages_messaging",
      "pages_read_engagement",
      "pages_manage_metadata",
    ].join(",");
    const fbAuthUrl = `https://www.facebook.com/v20.0/dialog/oauth?client_id=${FB_APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&scope=${scopes}&state=${userId}`;

    return c.redirect(fbAuthUrl);
  }) satisfies Handler,
  callback: (async (c) => {
    const code = c.req.query("code");
    const userId = c.req.query("state"); // Retrieved from state param

    if (!code || !userId) {
      return c.text("Authorization failed or code missing", 400);
    }

    try {
      // A. Exchange code for Short-Lived User Access Token
      const tokenUrl = `https://graph.facebook.com/v20.0/oauth/access_token?client_id=${FB_APP_ID}&redirect_uri=${encodeURIComponent(REDIRECT_URI)}&client_secret=${FB_APP_SECRET}&code=${code}`;
      const tokenRes = await fetch(tokenUrl).then((r) => r.json());
      const shortLivedToken = tokenRes.access_token;

      // B. Exchange Short-Lived Token for Long-Lived User Token (~60 days)
      const longTokenUrl = `https://graph.facebook.com/v20.0/oauth/access_token?grant_type=fb_exchange_token&client_id=${FB_APP_ID}&client_secret=${FB_APP_SECRET}&fb_exchange_token=${shortLivedToken}`;
      const longTokenRes = await fetch(longTokenUrl).then((r) => r.json());
      const longLivedUserToken = longTokenRes.access_token;

      // C. Fetch Pages managed by this seller
      const pagesUrl = `https://graph.facebook.com/v20.0/me/accounts?fields=id,name,access_token,picture{url}&access_token=${longLivedUserToken}`;
      const pagesRes = await fetch(pagesUrl).then((r) => r.json());

      if (!pagesRes.data || pagesRes.data.length === 0) {
        return c.text("No Facebook Pages found for this account", 404);
      }

      // Process the first page (or loop if supporting multiple)
      const page = pagesRes.data[0];
      const pageId = page.id;
      const pageName = page.name;
      const pageAccessToken = page.access_token; // Never-expiring page access token

      // D. Automatically Subscribe Page Webhook to Feed & Messages
      const subscribeUrl = `https://graph.facebook.com/v20.0/${pageId}/subscribed_apps?subscribed_fields=feed,messages&access_token=${pageAccessToken}`;
      const subRes = await fetch(subscribeUrl, { method: "POST" }).then((r) =>
        r.json(),
      );

      if (!subRes.success) {
        console.warn(
          `⚠️ Warning: Webhook subscription for page ${pageId} failed:`,
          subRes,
        );
      }

      // E. Save or Update in PostgreSQL via Drizzle
      await db
        .insert(facebookPage)
        .values({
          id: pageId,
          userId: userId,
          pageName: pageName,
          pageAccessToken: pageAccessToken,
          isConnected: true,
        })
        .onConflictDoUpdate({
          target: facebookPage.id,
          set: {
            userId: userId,
            pageName: pageName,
            pageAccessToken: pageAccessToken,
            isConnected: true,
          },
        });

      console.log(
        `✅ Page "${pageName}" successfully connected for seller ${userId}`,
      );

      // Redirect seller back to UI settings page
      return c.redirect(
        `${process.env.FRONTEND_URL}/seller/settings/facebook?connected=true`,
      );
    } catch (error) {
      console.error("❌ OAuth Integration Failed:", error);
      return c.text("Internal Server Error during Facebook Connect", 500);
    }
  }) satisfies Handler,
  getPage: (async (c) => {
    const user = c.get("user");
    if (!user) return c.text("Unauthorized", 401);

    const foundPage = await db.query.facebookPage.findFirst({
      where: {
        userId: user.id,
      },
      with: {
        user: true,
      },
    });

    if (!foundPage) {
      return c.json({
        page: null,
        success: false,
        message: "Page not connected yet.",
      });
    }

    return c.json({
      page: foundPage,
      success: true,
      message: "Page found!",
    });
  }) satisfies Handler,
};
