import { createBrowserRouter } from "react-router";
import Login from "./pages/login";
import SellerDashboard from "./pages/seller/dashboard";
import { protectedLoader, publicOnlyLoader } from "./lib/protected-loader";
import type { QueryClient } from "@tanstack/react-query";
import { AppLayout } from "./layouts/app-layout";
import SellerProducts from "./pages/seller/products";
import SellerFacebookPage from "./pages/seller/facebook";

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
      Component: AppLayout,
      children: [
        {
          path: "dashboard",
          Component: SellerDashboard,
        },
        {
          path: "products",
          Component: SellerProducts,
        },
        {
          path: "settings",
          children: [
            {
              path: "facebook",
              Component: SellerFacebookPage,
            },
          ],
        },
      ],
    },
  ]);
}
