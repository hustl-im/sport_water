import { Link } from "react-router-dom";
import { Droplets, Phone, Mail, MapPin, Linkedin, Facebook, Instagram, Twitter, ArrowRight } from "lucide-react";
import { useState } from "react";

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="bg-gray-900 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="space-y-6">
            <div className="flex items-center gap-2">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-primary-500 to-secondary-400 flex items-center justify-center">
                <Droplets className="w-5 h-5 text-white" />
              </div>
              <span className="font-poppins font-bold text-xl">Sport Water</span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed">
              Premium purified drinking water for athletes, families, offices, and schools across Ethiopia.
            </p>
            <div className="flex gap-3">
              <a href="#" className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-primary-500 transition-colors">
                <Facebook className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-primary-500 transition-colors">
                <Instagram className="w-5 h-5" />
              </a>
              <a href="#" className="w-10 h-10 rounded-xl bg-gray-800 flex items-center justify-center hover:bg-primary-500 transition-colors">
                <Twitter className="w-5 h-5" />
              </a>
            </div>

            <div className="flex justify-center md:justify-end gap-4">
              <p className="text-gray-400 text-sm leading-relaxed">Made by Imran N.</p>

              <div className="flex gap-3">
              <a
                href="https://www.instagram.com/crntly.imran_/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-chocolate-700 hover:bg-peanut-500 transition"
              >
                <Instagram className="w-4 h-4" />
              </a>

              <a
                href="https://www.linkedin.com/in/imran-nuru/"
                target="_blank"
                rel="noopener noreferrer"
                className="p-2 rounded-full bg-chocolate-700 hover:bg-peanut-500 transition"
              >
                <Linkedin className="w-4 h-4" />
              </a>

            </div>
            </div>

          </div>

          <div>
            <h3 className="font-poppins font-semibold text-lg mb-6">Quick Links</h3>
            <ul className="space-y-3">
              {["Home", "Products", "About Us", "Gallery", "FAQ", "Contact"].map((link) => (
                <li key={link}>
                  <Link
                    to={link === "Home" ? "/" : `/#${link.toLowerCase().replace(" ", "-")}`}
                    className="text-gray-400 hover:text-primary-400 transition-colors text-sm flex items-center gap-2 group"
                  >
                    <ArrowRight className="w-4 h-4 opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all" />
                    {link}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="font-poppins font-semibold text-lg mb-6">Products</h3>
            <ul className="space-y-3">
              <li className="text-gray-400 text-sm">Sport Water 600ml</li>
              <li className="text-gray-400 text-sm">Sport Water 2000ml</li>
              <li className="text-gray-400 text-sm">Bulk Orders</li>
              <li className="text-gray-400 text-sm">Subscription Plans</li>
            </ul>
          </div>

          <div>
            <h3 className="font-poppins font-semibold text-lg mb-6">Contact</h3>
            <ul className="space-y-4">
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Phone className="w-5 h-5 text-primary-400 flex-shrink-0" />
                0926549254
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <Mail className="w-5 h-5 text-primary-400 flex-shrink-0" />
                info@sportwater.et
              </li>
              <li className="flex items-center gap-3 text-gray-400 text-sm">
                <MapPin className="w-5 h-5 text-primary-400 flex-shrink-0" />
                Addis Ababa, Ethiopia
              </li>
            </ul>

            <div className="mt-6">
              <h4 className="text-sm font-medium mb-3">Newsletter</h4>
              <div className="flex gap-2">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 rounded-xl bg-gray-800 border border-gray-700 text-white text-sm focus:outline-none focus:border-primary-500"
                />
                <button className="px-4 py-2 rounded-xl bg-primary-500 hover:bg-primary-600 transition-colors">
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-16 pt-8 border-t border-gray-800 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            &copy; {new Date().getFullYear()} Sport Water Ethiopia. All rights reserved.
          </p>
          <div className="flex gap-6 text-sm text-gray-500">
            <a href="#" className="hover:text-primary-400 transition-colors">Privacy Policy</a>
            <a href="#" className="hover:text-primary-400 transition-colors">Terms of Service</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
