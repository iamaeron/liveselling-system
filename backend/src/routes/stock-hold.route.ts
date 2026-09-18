import { stockHoldControllers } from "@/controllers/stock-hold.controller";
import { Hono } from "hono";

const app = new Hono().basePath("/stock-holds");

app.get("/", stockHoldControllers.get);

export default app;
