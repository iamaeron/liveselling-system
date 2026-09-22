import { cartControllers } from "@/controllers/cart.controller";
import { verifyCartToken } from "@/middlewares/cart-token.middleware";
import { Hono } from "hono";

const app = new Hono().basePath("/cart");

app.get("/", verifyCartToken, cartControllers.get);
app.get("/gen-link/:facebookPsid", cartControllers.generateToken);

export default app;
