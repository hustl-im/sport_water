import { Link, useLocation, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  LayoutDashboard,
  ShoppingCart,
  Package,
  Settings,
  LogOut,
  Droplets,
  Menu,
  X,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useState } from "react";
import toast from "react-hot-toast";

const navItems = [
  { label: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { label: "Orders", href: "/admin/orders", icon: ShoppingCart },
  { label: "Products", href: "/admin/products", icon: Package },
  { label: "Settings", href: "/admin/settings", icon: Settings },
];

export function AdminSidebar() {
  const location = useLocation();
  const navigate = useNavigate();
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    toast.success("Logged out successfully");
    navigate("/admin/login");
  };

  const SidebarContent = () => (
    <>
      <div className="p-6">
        <Link to="/" className="flex items-center gap-2">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-400 flex items-center justify-center">
            <Droplets className="w-5 h-5 text-white" />
          </div>
          <span className="font-poppins font-bold text-xl text-gray-900 dark:text-white">
            Sport Water
          </span>
        </Link>
      </div>

      <nav className="flex-1 px-4 space-y-1">
        {navItems.map((item) => {
          const isActive = location.pathname === item.href;
          return (
            <Link
              key={item.href}
              to={item.href}
              onClick={() => setMobileOpen(false)}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                isActive
                  ? "bg-primary-500 text-white shadow-lg shadow-primary-500/30"
                  : "text-gray-600 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800"
              }`}
            >
              <item.icon className="w-5 h-5" />
              {item.label}
            </Link>
          );
        })}
      </nav>

      <div className="p-4">
        <button
          onClick={handleLogout}
          className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-600 dark:text-gray-400 hover:bg-error-50 dark:hover:bg-error-900/20 hover:text-error-600 transition-all w-full"
        >
          <LogOut className="w-5 h-5" />
          Logout
        </button>
      </div>
    </>
  );

  return (
    <>
      {/* Mobile toggle */}
      <button
        onClick={() => setMobileOpen(!mobileOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 w-10 h-10 bg-white dark:bg-gray-800 rounded-xl shadow-lg flex items-center justify-center"
      >
        {mobileOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
      </button>

      {/* Desktop sidebar */}
      <aside className="hidden lg:flex flex-col w-64 h-screen sticky top-0 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800">
        <SidebarContent />
      </aside>

      {/* Mobile sidebar */}
      {mobileOpen && (
        <motion.aside
          initial={{ x: -280 }}
          animate={{ x: 0 }}
          className="fixed inset-y-0 left-0 z-40 w-64 bg-white dark:bg-gray-900 border-r border-gray-100 dark:border-gray-800 flex flex-col lg:hidden"
        >
          <SidebarContent />
        </motion.aside>
      )}
    </>
  );
}
