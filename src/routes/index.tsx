import { createBrowserRouter, RouterProvider, Navigate } from "react-router-dom";
import { MainLayout } from "@/layouts/MainLayout";
import { AdminLayout } from "@/layouts/AdminLayout";
import { HomePage } from "@/pages/HomePage";
import { CheckoutPage } from "@/pages/CheckoutPage";
import { AdminLoginPage } from "@/pages/AdminLoginPage";
import { AdminDashboardPage } from "@/pages/AdminDashboardPage";
import { AdminOrdersPage } from "@/pages/AdminOrdersPage";
import { AdminProductsPage } from "@/pages/AdminProductsPage";
import { AdminSettingsPage } from "@/pages/AdminSettingsPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "checkout", element: <CheckoutPage /> },
    ],
  },
  {
    path: "/admin/login",
    element: <AdminLoginPage />,
  },
  {
    path: "/admin",
    element: <AdminLayout />,
    children: [
      { index: true, element: <Navigate to="/admin/dashboard" replace /> },
      { path: "dashboard", element: <AdminDashboardPage /> },
      { path: "orders", element: <AdminOrdersPage /> },
      { path: "products", element: <AdminProductsPage /> },
      { path: "settings", element: <AdminSettingsPage /> },
    ],
  },
]);

export function AppRoutes() {
  return <RouterProvider router={router} />;
}
