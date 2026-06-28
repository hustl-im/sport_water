import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  Package,
  Clock,
  CheckCircle,
  DollarSign,
  ShoppingCart,
  TrendingUp,
  Users,
  ArrowUpRight,
  ArrowDownRight,
} from "lucide-react";
import { supabase } from "@/lib/supabase";
import { useOrders } from "@/hooks/useOrders";
import { useProducts } from "@/hooks/useProducts";
import { formatPrice } from "@/lib/utils";
import {
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
} from "recharts";

interface DashboardStats {
  totalOrders: number;
  pendingOrders: number;
  completedOrders: number;
  totalRevenue: number;
  todayOrders: number;
}

export function AdminDashboardPage() {
  const navigate = useNavigate();
  const { data: orders, isLoading: ordersLoading } = useOrders();
  const { data: products } = useProducts();
  const [stats, setStats] = useState<DashboardStats>({
    totalOrders: 0,
    pendingOrders: 0,
    completedOrders: 0,
    totalRevenue: 0,
    todayOrders: 0,
  });

  useEffect(() => {
    const checkAuth = async () => {
      const { data } = await supabase.auth.getSession();
      if (!data.session) {
        navigate("/admin/login");
      }
    };
    checkAuth();
  }, [navigate]);

  useEffect(() => {
    if (!orders) return;

    const today = new Date().toISOString().split("T")[0];
    const pending = orders.filter((o) => o.status === "pending").length;
    const completed = orders.filter((o) => o.status === "delivered").length;
    const revenue = orders.reduce((sum, o) => sum + (o.total_price || 0), 0);
    const todayOrders = orders.filter((o) => o.created_at.startsWith(today)).length;

    setStats({
      totalOrders: orders.length,
      pendingOrders: pending,
      completedOrders: completed,
      totalRevenue: revenue,
      todayOrders,
    });
  }, [orders]);

  const salesData = orders
    ? orders.reduce((acc: Record<string, number>, order) => {
        const date = new Date(order.created_at).toLocaleDateString("en-GB", {
          day: "numeric",
          month: "short",
        });
        acc[date] = (acc[date] || 0) + order.total_price;
        return acc;
      }, {})
    : {};

  const chartData = Object.entries(salesData)
    .slice(-7)
    .map(([date, revenue]) => ({ date, revenue }));

  const statusData = orders
    ? [
        { name: "Pending", value: orders.filter((o) => o.status === "pending").length, color: "#f59e0b" },
        { name: "Processing", value: orders.filter((o) => o.status === "processing").length, color: "#3b82f6" },
        { name: "Delivered", value: orders.filter((o) => o.status === "delivered").length, color: "#10b981" },
        { name: "Cancelled", value: orders.filter((o) => o.status === "cancelled").length, color: "#ef4444" },
      ]
    : [];

  const productSales = products?.map((p) => ({
    name: p.name.replace("Sport Water ", ""),
    sales: orders?.filter((o) => o.bottle_type.includes(p.name)).reduce((sum, o) => sum + o.quantity, 0) || 0,
  })) || [];

  if (ordersLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
        <div className="animate-spin w-8 h-8 border-4 border-primary-500 border-t-transparent rounded-full" />
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Orders",
      value: stats.totalOrders,
      icon: ShoppingCart,
      color: "bg-primary-500",
      trend: "+12%",
      trendUp: true,
    },
    {
      title: "Pending Orders",
      value: stats.pendingOrders,
      icon: Clock,
      color: "bg-warning-500",
      trend: "+5%",
      trendUp: true,
    },
    {
      title: "Completed",
      value: stats.completedOrders,
      icon: CheckCircle,
      color: "bg-success-500",
      trend: "+8%",
      trendUp: true,
    },
    {
      title: "Total Revenue",
      value: formatPrice(stats.totalRevenue),
      icon: DollarSign,
      color: "bg-secondary-500",
      trend: "+15%",
      trendUp: true,
    },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 p-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <div className="flex items-center justify-between mb-8">
            <div>
              <h1 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white">
                Dashboard
              </h1>
              <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">
                Welcome back! Here is what is happening today.
              </p>
            </div>
            <div className="flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
              <Package className="w-5 h-5 text-primary-500" />
              <span className="text-sm font-medium text-gray-900 dark:text-white">
                {stats.todayOrders} orders today
              </span>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            {statCards.map((card, index) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
                className="card dark:card-dark p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className={`w-12 h-12 ${card.color} rounded-xl flex items-center justify-center`}>
                    <card.icon className="w-6 h-6 text-white" />
                  </div>
                  <div className={`flex items-center gap-1 text-sm ${card.trendUp ? "text-success-500" : "text-error-500"}`}>
                    {card.trendUp ? <ArrowUpRight className="w-4 h-4" /> : <ArrowDownRight className="w-4 h-4" />}
                    {card.trend}
                  </div>
                </div>
                <h3 className="text-2xl font-bold text-gray-900 dark:text-white">{card.value}</h3>
                <p className="text-gray-500 dark:text-gray-400 text-sm mt-1">{card.title}</p>
              </motion.div>
            ))}
          </div>

          <div className="grid lg:grid-cols-2 gap-6 mb-8">
            <div className="card dark:card-dark p-6">
              <h3 className="font-poppins font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-primary-500" />
                Revenue Trend
              </h3>
              <div className="h-72">
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={chartData}>
                    <defs>
                      <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                        <stop offset="5%" stopColor="#0099FF" stopOpacity={0.3} />
                        <stop offset="95%" stopColor="#0099FF" stopOpacity={0} />
                      </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                    <XAxis dataKey="date" stroke="#9ca3af" fontSize={12} />
                    <YAxis stroke="#9ca3af" fontSize={12} />
                    <Tooltip
                      contentStyle={{
                        backgroundColor: "#fff",
                        border: "1px solid #e5e7eb",
                        borderRadius: "12px",
                        boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1)",
                      }}
                    />
                    <Area
                      type="monotone"
                      dataKey="revenue"
                      stroke="#0099FF"
                      strokeWidth={2}
                      fillOpacity={1}
                      fill="url(#colorRevenue)"
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </div>
            </div>

            <div className="card dark:card-dark p-6">
              <h3 className="font-poppins font-semibold text-gray-900 dark:text-white mb-6 flex items-center gap-2">
                <Users className="w-5 h-5 text-primary-500" />
                Order Status
              </h3>
              <div className="h-72 flex items-center justify-center">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={statusData}
                      cx="50%"
                      cy="50%"
                      innerRadius={60}
                      outerRadius={100}
                      paddingAngle={5}
                      dataKey="value"
                    >
                      {statusData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="flex flex-wrap justify-center gap-4 mt-4">
                {statusData.map((item) => (
                  <div key={item.name} className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-sm text-gray-600 dark:text-gray-400">{item.name}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="card dark:card-dark p-6">
            <h3 className="font-poppins font-semibold text-gray-900 dark:text-white mb-6">
              Product Sales
            </h3>
            <div className="h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productSales}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="name" stroke="#9ca3af" fontSize={12} />
                  <YAxis stroke="#9ca3af" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#fff",
                      border: "1px solid #e5e7eb",
                      borderRadius: "12px",
                    }}
                  />
                  <Bar dataKey="sales" fill="#0099FF" radius={[8, 8, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
}
