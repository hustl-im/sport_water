import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Check, Loader2, Package, Truck, CreditCard, ChevronRight, Minus, Plus, Trash2 } from "lucide-react";
import { useCartStore } from "@/store/cartStore";
import { useCreateOrder } from "@/hooks/useOrders";
import { formatPrice } from "@/lib/utils";
import toast from "react-hot-toast";

const orderSchema = z.object({
  customer_name: z.string().min(2, "Name must be at least 2 characters"),
  phone: z.string().min(9, "Please enter a valid phone number"),
  delivery_address: z.string().min(5, "Please enter a complete address"),
  additional_notes: z.string().optional(),
});

type OrderFormData = z.infer<typeof orderSchema>;

export function CheckoutPage() {
  const { items, totalPrice, removeItem, updateQuantity, clearCart } = useCartStore();
  const createOrder = useCreateOrder();
  const navigate = useNavigate();
  const [step, setStep] = useState<"cart" | "details" | "success">("cart");

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<OrderFormData>({
    resolver: zodResolver(orderSchema),
  });

  const onSubmit = async (data: OrderFormData) => {
    if (items.length === 0) {
      toast.error("Your cart is empty");
      return;
    }

    const orderData = {
      customer_name: data.customer_name,
      phone: data.phone,
      bottle_type: items.map((i) => `${i.product.name} x${i.quantity}`).join(", "),
      quantity: items.reduce((sum, i) => sum + i.quantity, 0),
      total_price: totalPrice(),
      delivery_address: data.delivery_address,
      additional_notes: data.additional_notes || null,
      status: "pending" as const,
    };

    try {
      await createOrder.mutateAsync(orderData);

      // Send to Telegram via edge function
      const response = await fetch(
        `${import.meta.env.VITE_SUPABASE_URL}/functions/v1/telegram-notify`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${import.meta.env.VITE_SUPABASE_ANON_KEY}`,
          },
          body: JSON.stringify(orderData),
        }
      );

      if (!response.ok) {
        console.error("Telegram notification failed");
      }

      clearCart();
      setStep("success");
    } catch (error) {
      toast.error("Failed to place order. Please try again.");
      console.error(error);
    }
  };

  if (step === "success") {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900 px-4">
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          className="text-center max-w-md"
        >
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1 }}
            transition={{ delay: 0.2, type: "spring" }}
            className="w-24 h-24 rounded-full bg-success-100 dark:bg-success-900/30 flex items-center justify-center mx-auto mb-6"
          >
            <Check className="w-12 h-12 text-success-500" />
          </motion.div>
          <h1 className="text-3xl font-poppins font-bold text-gray-900 dark:text-white mb-4">
            Thank You!
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-8">
            Your order has been received successfully. We will contact you shortly.
          </p>
          <button
            onClick={() => navigate("/")}
            className="btn-primary"
          >
            Back to Home
          </button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 pb-16">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <h1 className="text-3xl font-poppins font-bold text-gray-900 dark:text-white mb-2">
            Checkout
          </h1>
          <div className="flex items-center gap-2 text-sm text-gray-500 mb-8">
            <span className={step === "cart" ? "text-primary-500 font-medium" : ""}>Cart</span>
            <ChevronRight className="w-4 h-4" />
            <span className={step === "details" ? "text-primary-500 font-medium" : ""}>Details</span>
            <ChevronRight className="w-4 h-4" />
            <span>Confirmation</span>
          </div>
        </motion.div>

        <div className="grid lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <AnimatePresence mode="wait">
              {step === "cart" ? (
                <motion.div
                  key="cart"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: 20 }}
                >
                  <div className="card dark:card-dark p-6">
                    <h2 className="text-lg font-poppins font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Package className="w-5 h-5 text-primary-500" />
                      Your Cart
                    </h2>

                    {items.length === 0 ? (
                      <div className="text-center py-12">
                        <p className="text-gray-500 dark:text-gray-400">Your cart is empty</p>
                        <button
                          onClick={() => navigate("/")}
                          className="btn-primary mt-4"
                        >
                          Continue Shopping
                        </button>
                      </div>
                    ) : (
                      <div className="space-y-4">
                        {items.map((item) => (
                          <div
                            key={item.product.id}
                            className="flex gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl"
                          >
                            <div className="w-16 h-16 rounded-lg bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/30 dark:to-secondary-900/30 flex items-center justify-center flex-shrink-0">
                              <span className="text-2xl">💧</span>
                            </div>
                            <div className="flex-1">
                              <h3 className="font-medium text-gray-900 dark:text-white">
                                {item.product.name}
                              </h3>
                              <p className="text-primary-500 font-semibold">
                                {formatPrice(item.product.price_etb)}
                              </p>
                              <div className="flex items-center gap-2 mt-2">
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                  className="w-7 h-7 rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center"
                                >
                                  <Minus className="w-3 h-3" />
                                </button>
                                <span className="text-sm w-6 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                  className="w-7 h-7 rounded-md bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 flex items-center justify-center"
                                >
                                  <Plus className="w-3 h-3" />
                                </button>
                              </div>
                            </div>
                            <button
                              onClick={() => removeItem(item.product.id)}
                              className="text-gray-400 hover:text-error-500 self-start"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>

                  {items.length > 0 && (
                    <button
                      onClick={() => setStep("details")}
                      className="btn-primary w-full mt-6"
                    >
                      Continue to Details
                      <ChevronRight className="w-5 h-5 ml-2" />
                    </button>
                  )}
                </motion.div>
              ) : (
                <motion.div
                  key="details"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -20 }}
                >
                  <form onSubmit={handleSubmit(onSubmit)} className="card dark:card-dark p-6 space-y-6">
                    <h2 className="text-lg font-poppins font-semibold text-gray-900 dark:text-white mb-4 flex items-center gap-2">
                      <Truck className="w-5 h-5 text-primary-500" />
                      Delivery Details
                    </h2>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Full Name *
                      </label>
                      <input
                        {...register("customer_name")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="Your full name"
                      />
                      {errors.customer_name && (
                        <p className="text-error-500 text-sm mt-1">{errors.customer_name.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Phone Number *
                      </label>
                      <input
                        {...register("phone")}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500"
                        placeholder="0926549254"
                      />
                      {errors.phone && (
                        <p className="text-error-500 text-sm mt-1">{errors.phone.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Delivery Address *
                      </label>
                      <textarea
                        {...register("delivery_address")}
                        rows={3}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                        placeholder="Your full delivery address"
                      />
                      {errors.delivery_address && (
                        <p className="text-error-500 text-sm mt-1">{errors.delivery_address.message}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Additional Notes (Optional)
                      </label>
                      <textarea
                        {...register("additional_notes")}
                        rows={2}
                        className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 resize-none"
                        placeholder="Any special instructions..."
                      />
                    </div>

                    <div className="flex gap-4">
                      <button
                        type="button"
                        onClick={() => setStep("cart")}
                        className="flex-1 py-3 rounded-xl border-2 border-gray-200 dark:border-gray-700 text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors"
                      >
                        Back
                      </button>
                      <button
                        type="submit"
                        disabled={createOrder.isPending}
                        className="flex-1 btn-primary disabled:opacity-50"
                      >
                        {createOrder.isPending ? (
                          <Loader2 className="w-5 h-5 animate-spin" />
                        ) : (
                          <>
                            <CreditCard className="w-5 h-5 mr-2" />
                            Place Order
                          </>
                        )}
                      </button>
                    </div>
                  </form>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          <div className="lg:col-span-1">
            <div className="card dark:card-dark p-6 sticky top-24">
              <h3 className="font-poppins font-semibold text-gray-900 dark:text-white mb-4">
                Order Summary
              </h3>
              <div className="space-y-3 mb-6">
                {items.map((item) => (
                  <div key={item.product.id} className="flex justify-between text-sm">
                    <span className="text-gray-600 dark:text-gray-400">
                      {item.product.name} x{item.quantity}
                    </span>
                    <span className="font-medium text-gray-900 dark:text-white">
                      {formatPrice(item.product.price_etb * item.quantity)}
                    </span>
                  </div>
                ))}
              </div>
              <div className="border-t border-gray-100 dark:border-gray-700 pt-4">
                <div className="flex justify-between items-center">
                  <span className="font-semibold text-gray-900 dark:text-white">Total</span>
                  <span className="text-2xl font-bold text-primary-600 dark:text-primary-400">
                    {formatPrice(totalPrice())}
                  </span>
                </div>
              </div>
              <div className="mt-6 p-4 bg-primary-50 dark:bg-primary-900/20 rounded-xl">
                <p className="text-sm text-primary-700 dark:text-primary-300">
                  Free delivery within Addis Ababa for orders above 500 ETB.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
