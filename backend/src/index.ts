import { serve } from "@hono/node-server";
import { Hono, type Context } from "hono";
import { auth } from "./lib/auth";
import { cors } from "hono/cors";
import productsRoutes from "./routes/product.route";
import facebookRoutes from "./routes/facebook.route";
import stockHoldRoutes from "./routes/stock-hold.route";
import cartRoutes from "./routes/cart.route";
import customerRoutes from "./routes/customer.route";

const app = new Hono();

app.use(
  "*",
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  }),
);

app.use("*", async (c: Context, next) => {
  const session = await auth.api.getSession({ headers: c.req.raw.headers });

  if (!session) {
    c.set("user", null);
    c.set("session", null);
    return next();
  }

  c.set("user", session.user);
  c.set("session", session.session);
  return next();
});

app.on(["POST", "GET"], "/api/auth/*", (c) => auth.handler(c.req.raw));

app.route("/api", productsRoutes);
app.route("/api", facebookRoutes);
app.route("/api", stockHoldRoutes);
app.route("/api", cartRoutes);
app.route("/api", customerRoutes);

serve(
  {
    fetch: app.fetch,
    port: 3000,
  },
  (info) => {
    console.log(`Server is running on http://localhost:${info.port}`);
  },
);
