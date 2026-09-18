import { db } from "@/db";
import type { Handler } from "hono";

export const stockHoldControllers = {
  get: (async (c) => {
    const user = c.get("user");
    if (!user) return c.text("Unauthorized", 401);

    const stockHolds = await db.query.stockHold.findMany({
      where: {
        userId: user.id,
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
