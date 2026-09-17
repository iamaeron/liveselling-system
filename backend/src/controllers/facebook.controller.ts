import { db } from "@/db";
import { facebookPage } from "@/db/schema";
import "dotenv/config";
import { eq } from "drizzle-orm";
import type { Handler } from "hono";

const VERIFY_TOKEN = process.env.FB_WEBHOOK_SECRET_TOKEN;
const FB_APP_ID = process.env.FACEBOOK_APP_ID!;
const FB_APP_SECRET = process.env.FACEBOOK_APP_SECRET!;
const REDIRECT_URI = `${process.env.APP_URL}/api/facebook/callback`;

export const facebookControllers = {
  get: (async (c) => {
    const mode = c.req.query("hub.mode");
    const token = c.req.query("hub.verify_token");
    const challenge = c.req.query("hub.challenge");

    if (mode === "subscribe" && token === VERIFY_TOKEN) {
      console.log("✅ Webhook verified successfully by Meta!");
      return c.text(challenge || "", 200);
    }

    console.error("❌ Webhook verification failed. Token mismatch.");
    return c.text("Forbidden", 403);
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
