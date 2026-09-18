import { facebookControllers } from "@/controllers/facebook.controller";
import { Hono } from "hono";

const app = new Hono().basePath("/facebook");

app.get("/webhook", facebookControllers.get);
app.post("/webhook", facebookControllers.post);
app.get("/connect", facebookControllers.connect);
app.get("/callback", facebookControllers.callback);
app.get("/page", facebookControllers.getPage);

export default app;
