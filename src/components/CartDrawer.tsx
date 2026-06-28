import { motion, AnimatePresence } from "framer-motion";
import { X, Plus, Minus, ShoppingBag, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { Link } from "react-router-dom";
import { formatPrice } from "@/lib/utils";

export function CartDrawer() {
  const { items, isOpen, setCartOpen, removeItem, updateQuantity, totalPrice, clearCart } = useCartStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setCartOpen(false)}
            className="fixed inset-0 bg-black/40 backdrop-blur-sm z-50"
          />
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 25, stiffness: 200 }}
            className="fixed right-0 top-0 bottom-0 w-full max-w-md bg-white dark:bg-gray-900 shadow-2xl z-50 flex flex-col"
          >
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-800">
              <div className="flex items-center gap-3">
                <ShoppingBag className="w-6 h-6 text-primary-500" />
                <h2 className="text-xl font-poppins font-bold text-gray-900 dark:text-white">
                  Your Cart
                </h2>
              </div>
              <button
                onClick={() => setCartOpen(false)}
                className="p-2 rounded-xl hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            <div className="flex-1 overflow-y-auto p-6">
              {items.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-full text-center">
                  <ShoppingBag className="w-16 h-16 text-gray-300 mb-4" />
                  <p className="text-gray-500 dark:text-gray-400 text-lg font-medium">
                    Your cart is empty
                  </p>
                  <p className="text-gray-400 text-sm mt-2">
                    Add some water bottles to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-4">
                  {items.map((item) => (
                    <motion.div
                      key={item.product.id}
                      layout
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, x: 100 }}
                      className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-2xl"
                    >
                      <div className="w-20 h-20 rounded-xl bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 flex items-center justify-center flex-shrink-0">
                        <span className="text-2xl">💧</span>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h3 className="font-medium text-gray-900 dark:text-white truncate">
                          {item.product.name}
                        </h3>
                        <p className="text-primary-500 font-semibold mt-1">
                          {formatPrice(item.product.price_etb)}
                        </p>
                        <div className="flex items-center gap-3 mt-2">
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                            className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:border-primary-500 transition-colors"
                          >
                            <Minus className="w-4 h-4" />
                          </button>
                          <span className="font-medium text-gray-900 dark:text-white w-6 text-center">
                            {item.quantity}
                          </span>
                          <button
                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                            className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center hover:border-primary-500 transition-colors"
                          >
                            <Plus className="w-4 h-4" />
                          </button>
                        </div>
                      </div>
                      <button
                        onClick={() => removeItem(item.product.id)}
                        className="p-2 text-gray-400 hover:text-error-500 transition-colors self-start"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </motion.div>
                  ))}
                </div>
              )}
            </div>

            {items.length > 0 && (
              <div className="p-6 border-t border-gray-100 dark:border-gray-800 space-y-4">
                <div className="flex items-center justify-between">
                  <span className="text-gray-600 dark:text-gray-400">Subtotal</span>
                  <span className="text-xl font-bold text-gray-900 dark:text-white">
                    {formatPrice(totalPrice())}
                  </span>
                </div>
                <Link
                  to="/checkout"
                  onClick={() => setCartOpen(false)}
                  className="btn-primary w-full"
                >
                  Proceed to Checkout
                </Link>
                <button
                  onClick={clearCart}
                  className="w-full py-2 text-sm text-gray-500 hover:text-error-500 transition-colors"
                >
                  Clear Cart
                </button>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
