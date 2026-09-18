import { db } from "@/db";
import type { Handler } from "hono";

export const productControllers = {
  get: (async (c) => {
    const products = await db.query.product.findMany({
      limit: 20,
      with: {
        holds: {
          columns: {
            quantity: true,
          },
          where: {
            expiresAt: {
              gte: new Date(),
            },
          },
        },
      },
    });

    return c.json({
      products,
      success: true,
      message: "Products found!",
    });
  }) satisfies Handler,
};
