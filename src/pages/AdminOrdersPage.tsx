import { useState } from "react";
import { motion } from "framer-motion";
import {
  Search,
  Filter,
  Download,
  Trash2,
  Clock,
  CheckCircle,
  XCircle,
  Package,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { useOrders, useUpdateOrderStatus, useDeleteOrder } from "@/hooks/useOrders";
import { formatPrice, formatDate } from "@/lib/utils";
import toast from "react-hot-toast";

const statusConfig = {
  pending: { label: "Pending", color: "bg-warning-100 text-warning-700 dark:bg-warning-900/30 dark:text-warning-400", icon: Clock },
  processing: { label: "Processing", color: "bg-primary-100 text-primary-700 dark:bg-primary-900/30 dark:text-primary-400", icon: Package },
  delivered: { label: "Delivered", color: "bg-success-100 text-success-700 dark:bg-success-900/30 dark:text-success-400", icon: CheckCircle },
  cancelled: { label: "Cancelled", color: "bg-error-100 text-error-700 dark:bg-error-900/30 dark:text-error-400", icon: XCircle },
};

export function AdminOrdersPage() {
  const { data: orders, isLoading } = useOrders();
  const updateStatus = useUpdateOrderStatus();
  const deleteOrder = useDeleteOrder();
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const filteredOrders = orders?.filter((order) => {
    const matchesSearch =
      order.customer_name.toLowerCase().includes(search.toLowerCase()) ||
      order.phone.includes(search);
    const matchesStatus = statusFilter === "all" || order.status === statusFilter;
    return matchesSearch && matchesStatus;
  }) || [];

  const totalPages = Math.ceil(filteredOrders.length / itemsPerPage);
  const paginatedOrders = filteredOrders.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handleStatusChange = async (id: string, status: string) => {
    try {
      await updateStatus.mutateAsync({ id, status });
      toast.success(`Order marked as ${status}`);
    } catch {
      toast.error("Failed to update status");
    }
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Are you sure you want to delete this order?")) return;
    try {
      await deleteOrder.mutateAsync(id);
      toast.success("Order deleted");
    } catch {
      toast.error("Failed to delete order");
    }
  };

  const exportCSV = () => {
    const headers = ["Customer", "Phone", "Bottle", "Quantity", "Total", "Address", "Status", "Date"];
    const rows = filteredOrders.map((o) => [
      o.customer_name,
      o.phone,
      o.bottle_type,
      o.quantity,
      o.total_price,
      o.delivery_address,
      o.status,
      o.created_at,
    ]);
    const csv = [headers, ...rows].map((r) => r.join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `orders-${new Date().toISOString().split("T")[0]}.csv`;
    a.click();
    URL.revokeObjectURL(url);
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
              Orders
            </h1>
            <button
              onClick={exportCSV}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl text-sm font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            >
              <Download className="w-4 h-4" />
              Export CSV
            </button>
          </div>

          <div className="card dark:card-dark p-4 mb-6">
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="relative flex-1">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <input
                  type="text"
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by name or phone..."
                  className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                />
              </div>
              <div className="relative">
                <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                <select
                  value={statusFilter}
                  onChange={(e) => setStatusFilter(e.target.value)}
                  className="pl-10 pr-8 py-2.5 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 appearance-none"
                >
                  <option value="all">All Status</option>
                  <option value="pending">Pending</option>
                  <option value="processing">Processing</option>
                  <option value="delivered">Delivered</option>
                  <option value="cancelled">Cancelled</option>
                </select>
              </div>
            </div>
          </div>

          <div className="card dark:card-dark overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="border-b border-gray-100 dark:border-gray-800">
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Customer</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Phone</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Bottle</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Qty</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Total</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Status</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Date</th>
                    <th className="text-left px-6 py-4 text-sm font-semibold text-gray-700 dark:text-gray-300">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {paginatedOrders.map((order) => {
                    const status = statusConfig[order.status as keyof typeof statusConfig];
                    return (
                      <tr
                        key={order.id}
                        className="border-b border-gray-50 dark:border-gray-800/50 hover:bg-gray-50 dark:hover:bg-gray-800/50 transition-colors"
                      >
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">
                          {order.customer_name}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400">{order.phone}</td>
                        <td className="px-6 py-4 text-sm text-gray-600 dark:text-gray-400 max-w-xs truncate">
                          {order.bottle_type}
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-900 dark:text-white font-medium">
                          {order.quantity}
                        </td>
                        <td className="px-6 py-4 text-sm text-primary-600 dark:text-primary-400 font-semibold">
                          {formatPrice(order.total_price)}
                        </td>
                        <td className="px-6 py-4">
                          <select
                            value={order.status}
                            onChange={(e) => handleStatusChange(order.id, e.target.value)}
                            className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium ${status?.color} border-0 cursor-pointer`}
                          >
                            <option value="pending">Pending</option>
                            <option value="processing">Processing</option>
                            <option value="delivered">Delivered</option>
                            <option value="cancelled">Cancelled</option>
                          </select>
                        </td>
                        <td className="px-6 py-4 text-sm text-gray-500 dark:text-gray-400">
                          {formatDate(order.created_at)}
                        </td>
                        <td className="px-6 py-4">
                          <button
                            onClick={() => handleDelete(order.id)}
                            className="p-2 text-gray-400 hover:text-error-500 transition-colors"
                          >
                            <Trash2 className="w-4 h-4" />
                          </button>
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {paginatedOrders.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-500 dark:text-gray-400">No orders found</p>
              </div>
            )}

            {totalPages > 1 && (
              <div className="flex items-center justify-between px-6 py-4 border-t border-gray-100 dark:border-gray-800">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm disabled:opacity-50"
                >
                  <ChevronLeft className="w-4 h-4" />
                  Previous
                </button>
                <span className="text-sm text-gray-600 dark:text-gray-400">
                  Page {currentPage} of {totalPages}
                </span>
                <button
                  onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                  disabled={currentPage === totalPages}
                  className="flex items-center gap-2 px-4 py-2 rounded-lg border border-gray-200 dark:border-gray-700 text-sm disabled:opacity-50"
                >
                  Next
                  <ChevronRight className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>
        </motion.div>
      </div>
    </div>
  );
}
