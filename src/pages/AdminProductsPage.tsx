import { useState } from "react";
import { motion } from "framer-motion";
import { Plus, Pencil, Trash2, Search, Package } from "lucide-react";
import { useProducts } from "@/hooks/useProducts";
import { supabase } from "@/lib/supabase";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/types";
import toast from "react-hot-toast";

export function AdminProductsPage() {
  const { data: products, isLoading, refetch } = useProducts();
  const [search, setSearch] = useState("");
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    size_ml: 0,
    price_etb: 0,
    stock: 0,
    is_active: true,
  });

  const filteredProducts = products?.filter((p) =>
    p.name.toLowerCase().includes(search.toLowerCase())
  ) || [];

  const openAddModal = () => {
    setEditingProduct(null);
    setFormData({ name: "", description: "", size_ml: 0, price_etb: 0, stock: 0, is_active: true });
    setIsModalOpen(true);
  };

  const openEditModal = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      size_ml: product.size_ml,
      price_etb: product.price_etb,
      stock: product.stock,
      is_active: product.is_active,
    });
    setIsModalOpen(true);
  };

  const handleSave = async () => {
    try {
      if (editingProduct) {
        await supabase.from("products").update(formData).eq("id", editingProduct.id);
        toast.success("Product updated");
      } else {
        await supabase.from("products").insert({
          ...formData,
          rating: 5,
          reviews_count: 0,
        });
        toast.success("Product created");
      }
      setIsModalOpen(false);
      refetch();
    } catch {
      toast.error("Failed to save product");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Delete this product?")) return;
    try {
      await supabase.from("products").delete().eq("id", id);
      toast.success("Product deleted");
      refetch();
    } catch {
      toast.error("Failed to delete");
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 mb-8">
            <h1 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white">
              Products
            </h1>
            <button
              onClick={openAddModal}
              className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white rounded-xl hover:bg-primary-600 transition-colors"
            >
              <Plus className="w-4 h-4" />
              Add Product
            </button>
          </div>

          <div className="card dark:card-dark p-4 mb-6">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <input
                type="text"
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                placeholder="Search products..."
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
              />
            </div>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <motion.div
                key={product.id}
                layout
                className="card dark:card-dark p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 flex items-center justify-center">
                    <Package className="w-7 h-7 text-primary-500" />
                  </div>
                  <div className="flex gap-2">
                    <button
                      onClick={() => openEditModal(product)}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                    >
                      <Pencil className="w-4 h-4 text-primary-500" />
                    </button>
                    <button
                      onClick={() => handleDelete(product.id)}
                      className="p-2 rounded-lg bg-gray-100 dark:bg-gray-800 hover:bg-error-100 dark:hover:bg-error-900/30 transition-colors"
                    >
                      <Trash2 className="w-4 h-4 text-error-500" />
                    </button>
                  </div>
                </div>
                <h3 className="font-poppins font-bold text-gray-900 dark:text-white mb-1">
                  {product.name}
                </h3>
                <p className="text-sm text-gray-500 dark:text-gray-400 mb-3 line-clamp-2">
                  {product.description}
                </p>
                <div className="flex items-center justify-between">
                  <span className="text-xl font-bold text-primary-600 dark:text-primary-400">
                    {formatPrice(product.price_etb)}
                  </span>
                  <span className={`text-xs px-2 py-1 rounded-full ${
                    product.stock > 0
                      ? "bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400"
                      : "bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400"
                  }`}>
                    {product.stock > 0 ? `${product.stock} in stock` : "Out of stock"}
                  </span>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-lg max-h-[90vh] overflow-y-auto"
          >
            <h2 className="text-xl font-poppins font-bold text-gray-900 dark:text-white mb-6">
              {editingProduct ? "Edit Product" : "Add Product"}
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Name</label>
                <input
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Description</label>
                <textarea
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  rows={3}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Size (ml)</label>
                  <input
                    type="number"
                    value={formData.size_ml}
                    onChange={(e) => setFormData({ ...formData, size_ml: parseInt(e.target.value) || 0 })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price (ETB)</label>
                  <input
                    type="number"
                    value={formData.price_etb}
                    onChange={(e) => setFormData({ ...formData, price_etb: parseFloat(e.target.value) || 0 })}
                    className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                  />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Stock</label>
                <input
                  type="number"
                  value={formData.stock}
                  onChange={(e) => setFormData({ ...formData, stock: parseInt(e.target.value) || 0 })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={formData.is_active}
                  onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                  className="w-4 h-4 rounded border-gray-300 text-primary-500 focus:ring-primary-500"
                />
                <label className="text-sm text-gray-700 dark:text-gray-300">Active</label>
              </div>
            </div>
            <div className="flex gap-4 mt-6">
              <button
                onClick={() => setIsModalOpen(false)}
                className="flex-1 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={handleSave}
                className="flex-1 btn-primary py-3"
              >
                Save
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </div>
  );
}
