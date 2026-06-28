import { motion } from "framer-motion";
import { Target, Eye, Shield, Truck, Droplets, Award } from "lucide-react";

const features = [
  {
    icon: Target,
    title: "Our Mission",
    description: "To provide every Ethiopian with access to premium, purified drinking water that supports health, performance, and wellbeing.",
    color: "from-primary-500 to-primary-600",
  },
  {
    icon: Eye,
    title: "Our Vision",
    description: "To become Ethiopia's most trusted and loved bottled water brand, recognized for quality, sustainability, and community impact.",
    color: "from-secondary-500 to-secondary-600",
  },
  {
    icon: Shield,
    title: "Quality Assurance",
    description: "Our water undergoes a 7-step purification process including reverse osmosis, UV sterilization, and mineral balancing. Every batch is lab-tested.",
    color: "from-accent-500 to-accent-600",
  },
  {
    icon: Truck,
    title: "Fast Delivery",
    description: "Same-day delivery across Addis Ababa. Bulk orders for offices and schools with flexible scheduling and competitive pricing.",
    color: "from-success-500 to-success-600",
  },
];

export function AboutSection() {
  return (
    <section id="about" className="section-padding bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-500 font-medium text-sm uppercase tracking-wider">About Us</span>
          <h2 className="text-4xl lg:text-5xl font-poppins font-bold text-gray-900 dark:text-white mt-3 mb-4">
            Why Choose <span className="gradient-text">Sport Water</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            We are committed to delivering the purest drinking water to every corner of Ethiopia.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -8, scale: 1.02 }}
              className="card dark:card-dark p-6 group cursor-default"
            >
              <div className={`w-14 h-14 rounded-2xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-5 shadow-lg group-hover:shadow-xl transition-shadow`}>
                <feature.icon className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-lg font-poppins font-bold text-gray-900 dark:text-white mb-3">
                {feature.title}
              </h3>
              <p className="text-gray-600 dark:text-gray-400 text-sm leading-relaxed">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 grid lg:grid-cols-2 gap-12 items-center"
        >
          <div className="relative">
            <div className="absolute -inset-4 bg-gradient-to-br from-primary-100 to-secondary-100 dark:from-primary-900/20 dark:to-secondary-900/20 rounded-3xl -z-10" />
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <div className="bg-gradient-to-br from-primary-500 to-primary-600 rounded-2xl p-6 text-white">
                  <Droplets className="w-8 h-8 mb-3" />
                  <div className="text-3xl font-bold">7-Step</div>
                  <div className="text-primary-100 text-sm">Purification</div>
                </div>
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                  <Award className="w-8 h-8 text-warning-500 mb-3" />
                  <div className="text-3xl font-bold text-gray-900 dark:text-white">ISO</div>
                  <div className="text-gray-500 text-sm">Certified</div>
                </div>
              </div>
              <div className="space-y-4 pt-8">
                <div className="bg-white dark:bg-gray-800 rounded-2xl p-6 border border-gray-100 dark:border-gray-700">
                  <div className="text-3xl font-bold text-primary-600 dark:text-primary-400">500K+</div>
                  <div className="text-gray-500 text-sm">Bottles Sold</div>
                </div>
                <div className="bg-gradient-to-br from-secondary-500 to-secondary-600 rounded-2xl p-6 text-white">
                  <div className="text-3xl font-bold">24/7</div>
                  <div className="text-secondary-100 text-sm">Delivery</div>
                </div>
              </div>
            </div>
          </div>

          <div>
            <h3 className="text-3xl font-poppins font-bold text-gray-900 dark:text-white mb-6">
              The Purest Water in Ethiopia
            </h3>
            <div className="space-y-4 text-gray-600 dark:text-gray-400 leading-relaxed">
              <p>
                Sport Water is sourced from the pristine highlands of Ethiopia, where natural springs provide some of the purest water on the continent.
              </p>
              <p>
                Our state-of-the-art purification facility uses reverse osmosis, UV sterilization, and advanced filtration to ensure every drop meets international quality standards.
              </p>
              <p>
                From families to professional athletes, offices to schools, we deliver hydration that powers performance and supports healthy living across Ethiopia.
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
