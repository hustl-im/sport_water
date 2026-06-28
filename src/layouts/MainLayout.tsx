import { Outlet } from "react-router-dom";
import { Navbar } from "@/components/Navbar";
import { CartDrawer } from "@/components/CartDrawer";
import { Footer } from "@/components/Footer";
import { Toaster } from "react-hot-toast";

export function MainLayout() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-950">
      <Navbar />
      <CartDrawer />
      <Outlet />
      <Footer />
      <Toaster position="top-right" />
    </div>
  );
}
