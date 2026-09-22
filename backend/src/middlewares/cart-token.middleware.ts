import { createMiddleware } from "hono/factory";
import { verify } from "hono/jwt";

export type TokenPayload = {
  facebookUserId: string;
  userId: string;
  exp: number;
};

export const verifyCartToken = createMiddleware<{
  Variables: {
    tokenPayload: TokenPayload;
  };
}>(async (c, next) => {
  const token =
    c.req.query("token") ||
    c.req.header("Authorization")?.replace("Bearer ", "");

  if (!token) {
    return c.json({ error: "Missing cart token" }, 401);
  }

  try {
    const payload = (await verify(
      token,
      process.env.JWT_SECRET_TOKEN!,
      "HS256",
    )) as TokenPayload;

    c.set("tokenPayload", payload);

    await next();
  } catch (err) {
    return c.json({ error: "Invalid or expired token" }, 401);
  }
});
