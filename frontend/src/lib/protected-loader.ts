import { redirect } from "react-router";
import { QueryClient } from "@tanstack/react-query";
import { sessionQueryOptions } from "@/lib/session";
import { useAuthStore } from "@/stores/auth";

// Protects private routes (e.g., /dashboard)
export const protectedLoader = (queryClient: QueryClient) => async () => {
  // 1. Fetch or retrieve user from TanStack Query cache
  const user = await queryClient.query(sessionQueryOptions);

  // 2. If no user, trigger React Router redirect
  if (!user) {
    useAuthStore.getState().setIsAuthenticated(false);
    throw redirect("/login");
  }

  // 3. Sync Zustand store
  useAuthStore.getState().setIsAuthenticated(true);
  return { user };
};

// Redirects logged-in users away from auth pages (e.g., /login)
export const publicOnlyLoader = (queryClient: QueryClient) => async () => {
  const user = await queryClient.query(sessionQueryOptions);

  if (user) {
    throw redirect("/seller/dashboard");
  }

  return null;
};
