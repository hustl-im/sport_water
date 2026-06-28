import { useEffect, useState } from "react";
import { motion } from "framer-motion";

interface Bubble {
  id: number;
  size: number;
  left: number;
  delay: number;
  duration: number;
}

export function WaterBubbles({ count = 15 }: { count?: number }) {
  const [bubbles, setBubbles] = useState<Bubble[]>([]);

  useEffect(() => {
    const generated = Array.from({ length: count }, (_, i) => ({
      id: i,
      size: Math.random() * 20 + 8,
      left: Math.random() * 100,
      delay: Math.random() * 8,
      duration: Math.random() * 6 + 6,
    }));
    setBubbles(generated);
  }, [count]);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {bubbles.map((bubble) => (
        <motion.div
          key={bubble.id}
          className="absolute rounded-full bg-white/10 border border-white/20"
          style={{
            width: bubble.size,
            height: bubble.size,
            left: `${bubble.left}%`,
            bottom: -30,
          }}
          animate={{
            y: [0, -window.innerHeight - 100],
            x: [0, Math.sin(bubble.id) * 50, Math.sin(bubble.id + 1) * -30, 0],
            opacity: [0, 0.5, 0.3, 0],
          }}
          transition={{
            duration: bubble.duration,
            delay: bubble.delay,
            repeat: Infinity,
            ease: "linear",
          }}
        />
      ))}
    </div>
  );
}
