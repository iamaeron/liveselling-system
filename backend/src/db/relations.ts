import * as schema from "./schema";
import { defineRelations } from "drizzle-orm";

export const relations = defineRelations(schema, (r) => ({
  user: {
    sessions: r.many.session(),
    accounts: r.many.account(),
  },
  session: {
    user: r.one.user({
      from: r.session.userId,
      to: r.user.id,
    }),
  },
  account: {
    user: r.one.user({
      from: r.account.userId,
      to: r.user.id,
    }),
  },
  product: {
    holds: r.many.stockHold(),
    orderItems: r.many.orderItem(),
  },
  stockHold: {
    product: r.one.product({
      from: r.stockHold.productId,
      to: r.product.id,
    }),
    customer: r.one.customer({
      from: r.stockHold.customerId,
      to: r.customer.id,
    }),
    liveStream: r.one.liveStream({
      from: r.stockHold.liveStreamId,
      to: r.liveStream.id,
    }),
  },
  order: {
    customer: r.one.customer({
      from: r.order.customerId,
      to: r.customer.id,
    }),
    items: r.many.orderItem(),
  },
  orderItem: {
    order: r.one.order({
      from: r.orderItem.orderId,
      to: r.order.id,
    }),
    product: r.one.product({
      from: r.orderItem.productId,
      to: r.product.id,
    }),
  },
}));
