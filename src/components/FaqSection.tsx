import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HelpCircle } from "lucide-react";
import { useFaq } from "@/hooks/useFaq";

export function FaqSection() {
  const { data: faqItems, isLoading } = useFaq();
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  if (isLoading) {
    return (
      <section id="faq" className="section-padding bg-gray-50 dark:bg-gray-900">
        <div className="max-w-3xl mx-auto space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card p-6 animate-pulse">
              <div className="h-5 bg-gray-200 dark:bg-gray-700 rounded w-3/4" />
            </div>
          ))}
        </div>
      </section>
    );
  }

  return (
    <section id="faq" className="section-padding bg-gray-50 dark:bg-gray-900">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-500 font-medium text-sm uppercase tracking-wider">FAQ</span>
          <h2 className="text-4xl lg:text-5xl font-poppins font-bold text-gray-900 dark:text-white mt-3 mb-4">
            Frequently Asked <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Everything you need to know about Sport Water.
          </p>
        </motion.div>

        <div className="space-y-4">
          {faqItems?.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
            >
              <div
                className={`card dark:card-dark overflow-hidden transition-all duration-300 ${
                  openIndex === index ? "ring-2 ring-primary-500/20" : ""
                }`}
              >
                <button
                  onClick={() => setOpenIndex(openIndex === index ? null : index)}
                  className="w-full flex items-center justify-between p-6 text-left"
                >
                  <div className="flex items-center gap-4">
                    <div className="w-10 h-10 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                      <HelpCircle className="w-5 h-5 text-primary-500" />
                    </div>
                    <span className="font-poppins font-semibold text-gray-900 dark:text-white">
                      {item.question}
                    </span>
                  </div>
                  <motion.div
                    animate={{ rotate: openIndex === index ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                  >
                    <ChevronDown className="w-5 h-5 text-gray-400" />
                  </motion.div>
                </button>

                <AnimatePresence>
                  {openIndex === index && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="px-6 pb-6 pl-20">
                        <p className="text-gray-600 dark:text-gray-400 leading-relaxed">
                          {item.answer}
                        </p>
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
