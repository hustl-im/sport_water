import { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, ShoppingCart, Droplets, Moon, Sun } from "lucide-react";
import { useCartStore } from "@/store/cartStore";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/#products" },
  { label: "About", href: "/#about" },
  { label: "Gallery", href: "/#gallery" },
  { label: "FAQ", href: "/#faq" },
  { label: "Contact", href: "/#contact" },
];

export function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [darkMode, setDarkMode] = useState(false);
  const location = useLocation();
  const { totalItems, toggleCart } = useCartStore();

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const isHome = location.pathname === "/";

  const handleNavClick = (href: string) => {
    setMobileOpen(false);
    if (isHome && href.startsWith("/#")) {
      const id = href.replace("/#", "");
      setTimeout(() => {
        document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
      }, 100);
    }
  };

  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-white/90 dark:bg-gray-900/90 backdrop-blur-xl shadow-lg border-b border-gray-100 dark:border-gray-800"
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16 lg:h-20">
            <Link to="/" className="flex items-center gap-2 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-400 flex items-center justify-center shadow-lg shadow-primary-500/30 group-hover:shadow-primary-500/50 transition-shadow">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <span className={`font-poppins font-bold text-xl ${scrolled ? "text-gray-900 dark:text-white" : "text-white"}`}>
                Sport Water
              </span>
            </Link>

            <div className="hidden lg:flex items-center gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  to={link.href}
                  onClick={() => handleNavClick(link.href)}
                  className={`text-sm font-medium transition-colors hover:text-primary-500 ${
                    scrolled ? "text-gray-700 dark:text-gray-300" : "text-white/90"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => setDarkMode(!darkMode)}
                className={`p-2 rounded-xl transition-colors ${
                  scrolled ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800" : "text-white/90 hover:bg-white/10"
                }`}
              >
                {darkMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5" />}
              </button>

              <button
                onClick={toggleCart}
                className={`relative p-2 rounded-xl transition-colors ${
                  scrolled ? "text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800" : "text-white/90 hover:bg-white/10"
                }`}
              >
                <ShoppingCart className="w-5 h-5" />
                {totalItems() > 0 && (
                  <motion.span
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    className="absolute -top-1 -right-1 w-5 h-5 bg-primary-500 text-white text-xs font-bold rounded-full flex items-center justify-center"
                  >
                    {totalItems()}
                  </motion.span>
                )}
              </button>

              <Link
                to="/checkout"
                className="hidden sm:inline-flex btn-primary text-sm"
              >
                Order Now
              </Link>

              <button
                onClick={() => setMobileOpen(!mobileOpen)}
                className={`lg:hidden p-2 rounded-xl transition-colors ${
                  scrolled ? "text-gray-700 dark:text-gray-300" : "text-white"
                }`}
              >
                {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>
      </motion.nav>

      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="fixed inset-0 z-40 lg:hidden"
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={() => setMobileOpen(false)} />
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="absolute right-0 top-0 bottom-0 w-80 bg-white dark:bg-gray-900 shadow-2xl p-6 pt-24"
            >
              <div className="flex flex-col gap-4">
                {navLinks.map((link) => (
                  <Link
                    key={link.href}
                    to={link.href}
                    onClick={() => handleNavClick(link.href)}
                    className="text-lg font-medium text-gray-800 dark:text-gray-200 hover:text-primary-500 transition-colors py-2"
                  >
                    {link.label}
                  </Link>
                ))}
                <Link
                  to="/checkout"
                  onClick={() => setMobileOpen(false)}
                  className="btn-primary mt-4"
                >
                  Order Now
                </Link>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
