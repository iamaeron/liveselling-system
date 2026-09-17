import { db } from "@/db";
import type { Context } from "hono";

export const productControllers = {
  get: async (c: Context) => {
    const products = await db.query.product.findMany({
      limit: 20,
      with: {
        holds: true,
      },
    });

    return c.json({
      products,
      success: true,
      message: "Products found!",
    });
  },
};
