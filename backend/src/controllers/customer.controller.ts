import { db } from "@/db";
import type { Handler } from "hono";

export const customerControllers = {
  get: (async (c) => {
    const user = c.get("user");
    if (!user) return c.text("Unauthorized", 401);

    const customers = await db.query.customer.findMany({
      where: {
        userId: user.id,
      },
      limit: 20,
      with: {
        holds: true,
        orders: true,
      },
    });

    return c.json({
      customers,
      success: true,
      message: "Customers found!",
    });
  }) satisfies Handler,
};
