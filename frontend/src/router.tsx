import { createBrowserRouter } from "react-router";
import Login from "./pages/login";
import SellerDashboard from "./pages/seller/dashboard";
import { protectedLoader, publicOnlyLoader } from "./lib/protected-loader";
import type { QueryClient } from "@tanstack/react-query";

export function createRouter(queryClient: QueryClient) {
  return createBrowserRouter([
    {
      path: "/",
      element: <div>Hello World</div>,
    },
    {
      path: "/login",
      loader: publicOnlyLoader(queryClient),
      Component: Login,
    },
    {
      path: "seller",
      loader: protectedLoader(queryClient),
      children: [
        {
          path: "dashboard",
          Component: SellerDashboard,
        },
      ],
    },
  ]);
}
