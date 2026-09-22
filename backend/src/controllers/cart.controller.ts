import { db } from "@/db";
import { user } from "@/db/schema";
import "dotenv/config";
import { eq } from "drizzle-orm";
import type { Handler } from "hono";
import { sign } from "hono/jwt";

export const cartControllers = {
  get: (async (c) => {
    const { facebookPsid, userId } = c.get("tokenPayload");

    const stockHolds = await db.query.stockHold.findMany({
      where: {
        user: {
          id: userId,
        },
        customer: {
          facebookPsid,
        },
        status: "reserved",
        expiresAt: {
          gte: new Date(),
        },
      },
      with: {
        liveStream: true,
        product: true,
      },
    });

    const seller = await db.query.user.findFirst({
      where: {
        id: userId,
      },
    });

    const customer = await db.query.customer.findFirst({
      where: {
        facebookPsid,
      },
    });

    if (!seller) {
      return c.json({
        stockHolds: null,
        success: false,
        message: "Seller does not exist.",
        seller: null,
        customer: null,
      });
    }

    return c.json({
      stockHolds,
      success: true,
      message: "Customer's cart found!",
      seller,
      customer,
    });
  }) satisfies Handler,
  generateToken: (async (c) => {
    const facebookPsid = c.req.param("facebookPsid");
    const user = c.get("user");
    if (!user) return c.text("Unauthorized", 401);

    const token = await sign(
      {
        facebookPsid,
        userId: user.id,
        exp: Math.floor(Date.now() / 1000) + 60 * 60 * 24,
      },
      process.env.JWT_SECRET_TOKEN!,
    );

    const portalUrl = `${process.env.FRONTEND_URL}/checkout?token=${token}`;

    return c.json({ url: portalUrl, token });
  }) satisfies Handler,
};
