import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Star, ChevronLeft, ChevronRight, Quote } from "lucide-react";
import { useTestimonials } from "@/hooks/useTestimonials";

export function TestimonialsSection() {
  const { data: testimonials, isLoading } = useTestimonials();
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    if (!testimonials?.length) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % testimonials.length);
    }, 6000);
    return () => clearInterval(timer);
  }, [testimonials]);

  if (isLoading) {
    return (
      <section className="section-padding bg-white dark:bg-gray-950">
        <div className="max-w-4xl mx-auto">
          <div className="card dark:card-dark p-8 animate-pulse">
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4" />
            <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-1/2" />
          </div>
        </div>
      </section>
    );
  }

  if (!testimonials?.length) return null;

  const testimonial = testimonials[current];

  return (
    <section className="section-padding bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-500 font-medium text-sm uppercase tracking-wider">Testimonials</span>
          <h2 className="text-4xl lg:text-5xl font-poppins font-bold text-gray-900 dark:text-white mt-3 mb-4">
            What Our <span className="gradient-text">Customers Say</span>
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto relative">
          <div className="absolute -top-8 left-1/2 -translate-x-1/2 w-16 h-16 bg-gradient-to-br from-primary-500 to-secondary-400 rounded-2xl flex items-center justify-center shadow-xl">
            <Quote className="w-8 h-8 text-white" />
          </div>

          <div className="card dark:card-dark p-8 md:p-12 pt-16">
            <AnimatePresence mode="wait">
              <motion.div
                key={testimonial.id}
                initial={{ opacity: 0, x: 50 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -50 }}
                transition={{ duration: 0.4 }}
                className="text-center"
              >
                <div className="flex justify-center gap-1 mb-6">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`w-5 h-5 ${
                        i < testimonial.rating
                          ? "text-warning-400 fill-warning-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>

                <p className="text-lg md:text-xl text-gray-700 dark:text-gray-300 leading-relaxed mb-8 italic">
                  "{testimonial.content}"
                </p>

                <div className="flex items-center justify-center gap-4">
                  <div className="w-14 h-14 rounded-full bg-gradient-to-br from-primary-400 to-secondary-400 flex items-center justify-center text-white font-bold text-xl">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div className="text-left">
                    <div className="font-poppins font-bold text-gray-900 dark:text-white">
                      {testimonial.name}
                    </div>
                    <div className="text-sm text-primary-500">{testimonial.role}</div>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>

            <div className="flex items-center justify-center gap-4 mt-8">
              <button
                onClick={() =>
                  setCurrent((prev) =>
                    prev === 0 ? (testimonials.length - 1) : prev - 1
                  )
                }
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
              >
                <ChevronLeft className="w-5 h-5" />
              </button>
              <div className="flex gap-2">
                {testimonials.map((_, i) => (
                  <button
                    key={i}
                    onClick={() => setCurrent(i)}
                    className={`w-2.5 h-2.5 rounded-full transition-all ${
                      i === current
                        ? "bg-primary-500 w-8"
                        : "bg-gray-300 dark:bg-gray-600"
                    }`}
                  />
                ))}
              </div>
              <button
                onClick={() =>
                  setCurrent((prev) => (prev + 1) % testimonials.length)
                }
                className="w-10 h-10 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
              >
                <ChevronRight className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
