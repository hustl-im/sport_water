import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Minus, Heart, Star, ShoppingCart } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { useCartStore } from "@/store/cartStore";
import { formatPrice } from "@/lib/utils";

export function ProductsSection() {
  const { data: products, isLoading } = useProducts();
  const { addItem } = useCartStore();
  const [quantities, setQuantities] = useState<Record<string, number>>({});
  const [wishlist, setWishlist] = useState<Set<string>>(new Set());

  const getQuantity = (id: string) => quantities[id] || 1;

  const updateQuantity = (id: string, delta: number) => {
    setQuantities((prev) => ({
      ...prev,
      [id]: Math.max(1, (prev[id] || 1) + delta),
    }));
  };

  const toggleWishlist = (id: string) => {
    setWishlist((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  if (isLoading) {
    return (
      <section id="products" className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {[1, 2].map((i) => (
              <div key={i} className="card p-6 animate-pulse">
                <div className="h-64 bg-gray-200 dark:bg-gray-700 rounded-xl mb-4" />
                <div className="h-6 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-2" />
                <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
              </div>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="products" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-500 font-medium text-sm uppercase tracking-wider">Our Products</span>
          <h2 className="text-4xl lg:text-5xl font-poppins font-bold text-gray-900 dark:text-white mt-3 mb-4">
            Pure Water, <span className="gradient-text">Pure Life</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Choose the perfect size for your hydration needs. Every bottle is filled with premium purified water.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {products?.map((product, index) => (
            <motion.div
              key={product.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.15 }}
              whileHover={{ y: -8 }}
              className="card dark:card-dark overflow-hidden group"
            >
              <div className="relative p-8 bg-gradient-to-br from-primary-50 to-secondary-50 dark:from-primary-900/20 dark:to-secondary-900/20">
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => toggleWishlist(product.id)}
                    className={`w-10 h-10 rounded-full flex items-center justify-center transition-all ${
                      wishlist.has(product.id)
                        ? "bg-error-500 text-white"
                        : "bg-white/80 dark:bg-gray-800/80 text-gray-400 hover:text-error-500"
                    }`}
                  >
                    <Heart className={`w-5 h-5 ${wishlist.has(product.id) ? "fill-current" : ""}`} />
                  </button>
                </div>

                {product.stock > 0 ? (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-success-500 text-white text-xs font-bold rounded-full">
                    In Stock
                  </span>
                ) : (
                  <span className="absolute top-4 left-4 px-3 py-1 bg-error-500 text-white text-xs font-bold rounded-full">
                    Out of Stock
                  </span>
                )}

                <div className="flex justify-center py-8">
                  <motion.div
                    animate={{ y: [0, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="relative"
                  >
                    <div className="w-32 h-52 relative">
                      <div className="absolute inset-0 bg-gradient-to-b from-primary-400/20 to-secondary-400/20 rounded-t-2xl rounded-b-lg backdrop-blur-sm border border-primary-200/30 dark:border-primary-700/30">
                        <div className="absolute top-3 left-1/2 -translate-x-1/2 w-16 h-6 bg-primary-300/30 rounded-full" />
                        <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-primary-600 dark:text-primary-400 font-poppins font-bold">
                          SPORT
                        </div>
                        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 text-primary-500/60 text-xs">
                          {product.size_ml}ml
                        </div>
                      </div>
                    </div>
                  </motion.div>
                </div>
              </div>

              <div className="p-6">
                <div className="flex items-center gap-1 mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-4 h-4 ${
                        i < Math.floor(product.rating)
                          ? "text-warning-400 fill-warning-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="text-sm text-gray-500 ml-2">({product.reviews_count})</span>
                </div>

                <h3 className="text-xl font-poppins font-bold text-gray-900 dark:text-white mb-2">
                  {product.name}
                </h3>
                <p className="text-gray-600 dark:text-gray-400 text-sm mb-4 line-clamp-2">
                  {product.description}
                </p>

                <div className="flex items-center justify-between mb-6">
                  <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {formatPrice(product.price_etb)}
                  </span>
                </div>

                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2 bg-gray-100 dark:bg-gray-800 rounded-xl p-1">
                    <button
                      onClick={() => updateQuantity(product.id, -1)}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-8 text-center font-medium text-gray-900 dark:text-white">
                      {getQuantity(product.id)}
                    </span>
                    <button
                      onClick={() => updateQuantity(product.id, 1)}
                      className="w-8 h-8 rounded-lg bg-white dark:bg-gray-700 flex items-center justify-center hover:bg-gray-50 transition-colors"
                    >
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <button
                    onClick={() => addItem(product, getQuantity(product.id))}
                    disabled={product.stock <= 0}
                    className="flex-1 btn-primary py-2.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </button>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
