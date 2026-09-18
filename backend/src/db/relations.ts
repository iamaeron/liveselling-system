import { defineRelations } from "drizzle-orm";
import * as schema from "./schema";

export const relations = defineRelations(schema, (r) => ({
  user: {
    sessions: r.many.session(),
    accounts: r.many.account(),
    products: r.many.product(),
    stockHolds: r.many.stockHold(),
    customers: r.many.customer(),
    orders: r.many.order(),
    facebookPages: r.many.facebookPage(),
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
  facebookPage: {
    user: r.one.user({
      from: r.facebookPage.userId,
      to: r.user.id,
    }),
    liveStreams: r.many.liveStream(),
  },
  product: {
    user: r.one.user({
      from: r.product.userId,
      to: r.user.id,
    }),
    holds: r.many.stockHold(),
    orderItems: r.many.orderItem(),
  },
  customer: {
    user: r.one.user({
      from: r.customer.userId,
      to: r.user.id,
    }),
    holds: r.many.stockHold(),
    orders: r.many.order(),
  },
  liveStream: {
    facebookPage: r.one.facebookPage({
      from: r.liveStream.facebookPageId,
      to: r.facebookPage.id,
    }),
    holds: r.many.stockHold(),
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
    user: r.one.user({
      from: r.stockHold.userId,
      to: r.user.id,
    }),
  },
  order: {
    user: r.one.user({
      from: r.order.userId,
      to: r.user.id,
    }),
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
