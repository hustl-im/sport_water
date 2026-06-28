import { motion } from "framer-motion";
import { ArrowRight, Play } from "lucide-react";
import { Link } from "react-router-dom";
import { WaterBubbles } from "./WaterBubbles";

export function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-gradient-to-br from-primary-600 via-primary-500 to-secondary-400">
      <WaterBubbles count={20} />

      {/* Animated wave background */}
      <div className="absolute bottom-0 left-0 right-0 h-64 opacity-20">
        <svg
          viewBox="0 0 1440 320"
          className="absolute bottom-0 w-full animate-wave"
          preserveAspectRatio="none"
        >
          <path
            fill="rgba(255,255,255,0.3)"
            d="M0,192L48,197.3C96,203,192,213,288,229.3C384,245,480,267,576,250.7C672,235,768,181,864,181.3C960,181,1056,235,1152,234.7C1248,235,1344,181,1392,154.7L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z"
          />
        </svg>
      </div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center lg:text-left"
          >
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 text-white/90 text-sm font-medium mb-8"
            >
              <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
              Premium Ethiopian Water
            </motion.div>

            <h1 className="font-poppins font-extrabold text-5xl sm:text-6xl lg:text-7xl text-white leading-tight mb-6">
              Stay Hydrated.
              <br />
              <span className="text-secondary-200">Stay Strong.</span>
            </h1>

            <p className="text-lg text-white/80 max-w-xl mx-auto lg:mx-0 mb-10 leading-relaxed">
              Premium purified drinking water for athletes, families, offices, schools, and everyone who values clean hydration.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
              <Link to="/checkout" className="btn-primary bg-white text-primary-600 hover:bg-gray-100 shadow-xl shadow-black/20">
                Shop Now
                <ArrowRight className="w-5 h-5 ml-2" />
              </Link>
              <button className="inline-flex items-center justify-center px-6 py-3 text-white font-medium rounded-xl border-2 border-white/30 hover:bg-white/10 transition-all duration-300">
                <Play className="w-5 h-5 mr-2" />
                Watch Video
              </button>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="relative flex items-center justify-center"
          >
            <div className="relative w-72 h-72 sm:w-96 sm:h-96">
              {/* Glow effect */}
              <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white/20 to-transparent blur-3xl" />

              {/* Floating bottle representation */}
              <motion.div
                animate={{ y: [0, -20, 0], rotate: [0, 2, 0] }}
                transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                className="relative w-full h-full flex items-center justify-center"
              >
                <div className="w-48 h-80 sm:w-60 sm:h-96 relative">
                  {/* Bottle shape */}
                  <div className="absolute inset-0 bg-gradient-to-b from-white/30 via-white/10 to-white/5 rounded-t-3xl rounded-b-xl backdrop-blur-sm border border-white/20 shadow-2xl">
                    <div className="absolute top-4 left-1/2 -translate-x-1/2 w-20 h-8 bg-white/20 rounded-full" />
                    <div className="absolute top-14 left-4 right-4 h-px bg-white/10" />
                    <div className="absolute top-20 left-4 right-4 h-px bg-white/10" />
                    <div className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/60 font-poppins font-bold text-lg">
                      SPORT
                    </div>
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-white/40 text-xs">
                      600ml
                    </div>
                  </div>
                  {/* Water fill effect */}
                  <motion.div
                    animate={{ height: ["60%", "65%", "60%"] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-primary-400/40 to-secondary-300/20 rounded-b-xl"
                  />
                </div>
              </motion.div>

              {/* Orbiting elements */}
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
                className="absolute inset-0"
              >
                <div className="absolute top-0 left-1/2 -translate-x-1/2 w-4 h-4 rounded-full bg-white/40" />
              </motion.div>
              <motion.div
                animate={{ rotate: -360 }}
                transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
                className="absolute inset-4"
              >
                <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full bg-secondary-300/50" />
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
