import { Outlet } from "react-router-dom";
import { AdminSidebar } from "@/components/AdminSidebar";
import { Toaster } from "react-hot-toast";

export function AdminLayout() {
  return (
    <div className="flex min-h-screen bg-gray-50 dark:bg-gray-900">
      <AdminSidebar />
      <main className="flex-1 lg:ml-0">
        <Outlet />
      </main>
      <Toaster position="top-right" />
    </div>
  );
}
