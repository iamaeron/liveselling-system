import { auth } from "../../backend/src/lib/auth";

export type User = typeof auth.$Infer.Session.user;
