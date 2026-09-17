import type { product } from "../../backend/src/db/schema";

export type Product = typeof product.$inferSelect;
