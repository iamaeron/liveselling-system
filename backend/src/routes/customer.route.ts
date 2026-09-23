import { customerControllers } from "@/controllers/customer.controller";
import { Hono } from "hono";

const app = new Hono().basePath("/customers");

app.get("/", customerControllers.get);

export default app;
