import { productControllers } from "@/controllers/product.controller";
import { Hono } from "hono";

const app = new Hono().basePath("/products");

app.get("/", productControllers.get);

export default app;
