import {
  pgTable,
  text,
  timestamp,
  boolean,
  index,
  pgEnum,
  uuid,
  integer,
  varchar,
  numeric,
} from "drizzle-orm/pg-core";

export const holdStatusEnum = pgEnum("hold_status", [
  "reserved", // Stock temporarily held after "Mine Code"
  "confirmed", // Buyer clicked checkout/confirm
  "expired", // Buyer failed to checkout within the time limit
  "cancelled", // Released back to pool manually or by user
]);

export const orderStatusEnum = pgEnum("order_status", [
  "pending_payment",
  "paid",
  "shipped",
  "cancelled",
]);

export const userRole = pgEnum("user_role", ["admin", "seller"]);

export const user = pgTable("user", {
  id: text("id").primaryKey(),
  name: text("name").notNull(),
  email: text("email").notNull().unique(),
  emailVerified: boolean("email_verified").default(false).notNull(),
  image: text("image"),
  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at")
    .defaultNow()
    .$onUpdate(() => /* @__PURE__ */ new Date())
    .notNull(),
  role: userRole("role").default("seller").notNull(),
});

export const session = pgTable(
  "session",
  {
    id: text("id").primaryKey(),
    expiresAt: timestamp("expires_at").notNull(),
    token: text("token").notNull().unique(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
    ipAddress: text("ip_address"),
    userAgent: text("user_agent"),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
  },
  (table) => [index("session_userId_idx").on(table.userId)],
);

export const account = pgTable(
  "account",
  {
    id: text("id").primaryKey(),
    accountId: text("account_id").notNull(),
    providerId: text("provider_id").notNull(),
    userId: text("user_id")
      .notNull()
      .references(() => user.id, { onDelete: "cascade" }),
    accessToken: text("access_token"),
    refreshToken: text("refresh_token"),
    idToken: text("id_token"),
    accessTokenExpiresAt: timestamp("access_token_expires_at"),
    refreshTokenExpiresAt: timestamp("refresh_token_expires_at"),
    scope: text("scope"),
    password: text("password"),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("account_userId_idx").on(table.userId)],
);

export const verification = pgTable(
  "verification",
  {
    id: text("id").primaryKey(),
    identifier: text("identifier").notNull(),
    value: text("value").notNull(),
    expiresAt: timestamp("expires_at").notNull(),
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at")
      .defaultNow()
      .$onUpdate(() => /* @__PURE__ */ new Date())
      .notNull(),
  },
  (table) => [index("verification_identifier_idx").on(table.identifier)],
);

export const product = pgTable(
  "product",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    code: varchar("code", { length: 50 }).notNull().unique(), // e.g., "3AB"
    name: varchar("name", { length: 255 }).notNull(),
    price: numeric("price", { precision: 10, scale: 2 }).notNull(),
    stock: integer("stock").notNull().default(0), // Total active stock available
    createdAt: timestamp("created_at").defaultNow().notNull(),
    updatedAt: timestamp("updated_at").defaultNow().notNull(),
  },
  (table) => [index("idx_products_code").on(table.code)],
);

export const customer = pgTable(
  "customer",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    facebookPsid: varchar("facebook_psid", { length: 255 }).notNull().unique(), // Page-Scoped User ID for Messenger
    facebookName: varchar("facebook_name", { length: 255 }),
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [index("idx_customers_psid").on(table.facebookPsid)],
);

export const liveStream = pgTable("live_stream", {
  id: uuid("id").primaryKey().defaultRandom(),
  facebookVideoId: varchar("facebook_video_id", { length: 255 }).notNull(),
  title: varchar("title", { length: 255 }),
  isActive: integer("is_active").default(1).notNull(), // 1 = active stream, 0 = ended
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const stockHold = pgTable(
  "stock_hold",
  {
    id: uuid("id").primaryKey().defaultRandom(),
    productId: uuid("product_id")
      .references(() => product.id, { onDelete: "cascade" })
      .notNull(),
    customerId: uuid("customer_id")
      .references(() => customer.id, { onDelete: "cascade" })
      .notNull(),
    liveStreamId: uuid("live_stream_id").references(() => liveStream.id),

    // FB Webhook Tracking
    commentId: varchar("comment_id", { length: 255 }).notNull().unique(), // Prevents duplicate claims from same comment

    quantity: integer("quantity").notNull().default(1),
    status: holdStatusEnum("status").default("reserved").notNull(),

    // Expiration strategy for holds
    expiresAt: timestamp("expires_at").notNull(), // e.g., now + 15 minutes
    createdAt: timestamp("created_at").defaultNow().notNull(),
  },
  (table) => [
    index("idx_holds_product_status").on(table.productId, table.status),
    index("idx_holds_customer_status").on(table.customerId, table.status),
    index("idx_holds_comment").on(table.commentId),
  ],
);

export const order = pgTable("order", {
  id: uuid("id").primaryKey().defaultRandom(),
  customerId: uuid("customer_id")
    .references(() => customer.id)
    .notNull(),
  totalAmount: numeric("total_amount", { precision: 10, scale: 2 }).notNull(),
  status: orderStatusEnum("status").default("pending_payment").notNull(),

  // Shipping info collected via webview
  shippingAddress: text("shipping_address"),
  phoneNumber: varchar("phone_number", { length: 50 }),
  paymentProofUrl: text("payment_proof_url"),

  createdAt: timestamp("created_at").defaultNow().notNull(),
  updatedAt: timestamp("updated_at").defaultNow().notNull(),
});

export const orderItem = pgTable("order_item", {
  id: uuid("id").primaryKey().defaultRandom(),
  orderId: uuid("order_id")
    .references(() => order.id, { onDelete: "cascade" })
    .notNull(),
  productId: uuid("product_id")
    .references(() => product.id)
    .notNull(),
  quantity: integer("quantity").notNull(),
  unitPrice: numeric("unit_price", { precision: 10, scale: 2 }).notNull(),
});
