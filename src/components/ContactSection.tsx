import { motion } from "framer-motion";
import { Phone, Mail, MapPin, Send, MessageCircle } from "lucide-react";
import { useState } from "react";
import toast from "react-hot-toast";

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [sending, setSending] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSending(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    toast.success("Message sent successfully! We will get back to you soon.");
    setFormData({ name: "", email: "", message: "" });
    setSending(false);
  };

  return (
    <section id="contact" className="section-padding bg-white dark:bg-gray-950">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <span className="text-primary-500 font-medium text-sm uppercase tracking-wider">Contact</span>
          <h2 className="text-4xl lg:text-5xl font-poppins font-bold text-gray-900 dark:text-white mt-3 mb-4">
            Get In <span className="gradient-text">Touch</span>
          </h2>
          <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
            Have questions or need a bulk order? We are here to help.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="space-y-8"
          >
            <div className="card dark:card-dark p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-primary-50 dark:bg-primary-900/30 flex items-center justify-center flex-shrink-0">
                <Phone className="w-6 h-6 text-primary-500" />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-gray-900 dark:text-white mb-1">Phone</h3>
                <p className="text-gray-600 dark:text-gray-400">0926549254</p>
                <div className="flex gap-3 mt-3">
                  <a
                    href="tel:0926549254"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-primary-500 text-white text-sm rounded-lg hover:bg-primary-600 transition-colors"
                  >
                    <Phone className="w-4 h-4" />
                    Call Now
                  </a>
                  <a
                    href="https://wa.me/251926549254"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 px-4 py-2 bg-success-500 text-white text-sm rounded-lg hover:bg-success-600 transition-colors"
                  >
                    <MessageCircle className="w-4 h-4" />
                    WhatsApp
                  </a>
                </div>
              </div>
            </div>

            <div className="card dark:card-dark p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-secondary-50 dark:bg-secondary-900/30 flex items-center justify-center flex-shrink-0">
                <Mail className="w-6 h-6 text-secondary-500" />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-gray-900 dark:text-white mb-1">Email</h3>
                <p className="text-gray-600 dark:text-gray-400">info@sportwater.et</p>
                <a
                  href="mailto:info@sportwater.et"
                  className="inline-flex items-center gap-2 px-4 py-2 bg-secondary-500 text-white text-sm rounded-lg hover:bg-secondary-600 transition-colors mt-3"
                >
                  <Mail className="w-4 h-4" />
                  Send Email
                </a>
              </div>
            </div>

            <div className="card dark:card-dark p-6 flex items-start gap-4">
              <div className="w-12 h-12 rounded-xl bg-accent-50 dark:bg-accent-900/30 flex items-center justify-center flex-shrink-0">
                <MapPin className="w-6 h-6 text-accent-500" />
              </div>
              <div>
                <h3 className="font-poppins font-semibold text-gray-900 dark:text-white mb-1">Address</h3>
                <p className="text-gray-600 dark:text-gray-400">Addis Ababa, Ethiopia</p>
              </div>
            </div>

            <div className="rounded-2xl overflow-hidden h-64 bg-gray-200 dark:bg-gray-800">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d126093.3!2d38.7!3d9.0!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zOcKwMDAnMDAuMCJOIDM4wrA0MycwMC4wIkU!5e0!3m2!1sen!2set!4v1"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Sport Water Location"
              />
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
          >
            <form onSubmit={handleSubmit} className="card dark:card-dark p-8 space-y-6">
              <h3 className="text-2xl font-poppins font-bold text-gray-900 dark:text-white mb-6">
                Send us a Message
              </h3>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Your Name
                </label>
                <input
                  type="text"
                  required
                  value={formData.name}
                  onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="John Doe"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Email Address
                </label>
                <input
                  type="email"
                  required
                  value={formData.email}
                  onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                  placeholder="john@example.com"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Message
                </label>
                <textarea
                  required
                  rows={5}
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full px-4 py-3 rounded-xl border border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 text-gray-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                  placeholder="How can we help you?"
                />
              </div>

              <button
                type="submit"
                disabled={sending}
                className="btn-primary w-full disabled:opacity-50"
              >
                {sending ? (
                  "Sending..."
                ) : (
                  <>
                    Send Message
                    <Send className="w-5 h-5 ml-2" />
                  </>
                )}
              </button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
