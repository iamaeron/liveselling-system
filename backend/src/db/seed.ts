import { nanoid } from "nanoid";
import { db } from "./index";
import { user, account, product } from "./schema";
import { sql } from "drizzle-orm";
import { hashPassword } from "better-auth/crypto";

async function resetDatabase() {
  console.log("🧹 Resetting database...");

  // Option A: Truncate tables with CASCADE (cleans data & resets auto-increment IDs)
  await db.execute(sql`
    TRUNCATE TABLE 
      "order_item",
      "order",
      "stock_hold",
      "live_stream",
      "customer",
      "product",
      "verification",
      "account",
      "session",
      "user"
    RESTART IDENTITY CASCADE;
  `);

  console.log("✨ Database cleared!");
}

async function seed() {
  await resetDatabase();

  console.log("🌱 Starting database seed...");

  try {
    const hashedPassword = await hashPassword("test123");

    // 1. Seed Admin User
    const adminId = nanoid();
    const [adminUser] = await db
      .insert(user)
      .values({
        id: adminId,
        name: "System Administrator",
        email: "admin@example.com",
        emailVerified: true,
        role: "admin",
      })
      .onConflictDoNothing()
      .returning();

    if (adminUser) {
      console.log(`✅ Admin created: ${adminUser.email}`);
      // Add credential account for Better Auth
      await db
        .insert(account)
        .values({
          id: nanoid(),
          accountId: adminUser.id,
          providerId: "credential",
          userId: adminUser.id,
          // Optional hashed password if you test password login manually
          password: hashedPassword,
        })
        .onConflictDoNothing();
    } else {
      console.log("ℹ️ Admin already exists, skipping...");
    }

    // 2. Seed Seller ("Kairo Collections")
    const sellerId = nanoid();
    const [sellerUser] = await db
      .insert(user)
      .values({
        id: sellerId,
        name: "Kairo Collections",
        email: "kairo@collections.com",
        emailVerified: true,
        role: "seller",
      })
      .onConflictDoNothing()
      .returning();

    if (sellerUser) {
      console.log(`✅ Seller created: ${sellerUser.name}`);
      await db
        .insert(account)
        .values({
          id: nanoid(),
          accountId: sellerUser.id,
          providerId: "credential",
          userId: sellerUser.id,
          password: hashedPassword,
        })
        .onConflictDoNothing();
    } else {
      console.log("ℹ️ Seller 'Kairo Collections' already exists, skipping...");
    }

    // 3. Seed 5 Products
    const productsToSeed = [
      {
        code: "3AB",
        name: "Oversized Vintage Denim Jacket",
        price: "1250.00",
        stock: 10,
      },
      {
        code: "10X",
        name: "Minimalist Linen Button-Down Shirt",
        price: "850.00",
        stock: 15,
      },
      {
        code: "01A",
        name: "High-Waisted Cargo Trousers",
        price: "990.00",
        stock: 8,
      },
      {
        code: "7BC",
        name: "Ribbed Knit Crop Top",
        price: "450.00",
        stock: 25,
      },
      {
        code: "5ZZ",
        name: "Classic Streetwear Tote Bag",
        price: "350.00",
        stock: 30,
      },
    ];

    console.log("📦 Seeding 5 products...");

    for (const item of productsToSeed) {
      await db
        .insert(product)
        .values({
          code: item.code,
          name: item.name,
          price: item.price,
          stock: item.stock,
        })
        .onConflictDoUpdate({
          target: product.code,
          set: {
            name: item.name,
            price: item.price,
            stock: item.stock,
          },
        });
    }

    console.log("✅ 5 Products seeded successfully!");
    console.log("🎉 Seeding complete.");
  } catch (error) {
    console.error("❌ Seeding failed:", error);
    process.exit(1);
  } finally {
    process.exit(0);
  }
}

seed();
