import { db } from "@/db";
import { stockHold } from "@/db/schema";
import { and, eq, gte } from "drizzle-orm";
import type { Handler } from "hono";

export const stockHoldControllers = {
  get: (async (c) => {
    const user = c.get("user");
    if (!user) return c.text("Unauthorized", 401);

    const stockHolds = await db.query.stockHold.findMany({
      where: {
        userId: user.id,
        status: "reserved",
        expiresAt: { gte: new Date() },
      },
      limit: 20,
      with: {
        customer: true,
        product: true,
        liveStream: true,
      },
    });

    return c.json({
      stockHolds,
      success: true,
      message: "Stock Holds found!",
    });
  }) satisfies Handler,
};
