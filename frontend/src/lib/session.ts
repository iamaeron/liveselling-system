import { queryOptions } from "@tanstack/react-query";
import { api } from "@/lib/api";
import type { User } from "better-auth";

export const sessionQueryOptions = queryOptions({
  queryKey: ["session"],
  queryFn: async () => {
    try {
      const { data } = await api.get("/api/auth/get-session");
      return data.user as User;
    } catch (error) {
      return null;
    }
  },
  staleTime: 1000 * 60 * 5,
});
