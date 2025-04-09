"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";

export const NorthStarCard = () => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setScore(87), 400);
    return () => clearTimeout(timer);
  }, []);

  return (
    <motion.div
      className="relative rounded-2xl p-5 bg-black/60 backdrop-blur-md border border-white/10 shadow-inner text-white group overflow-hidden transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Soft Hover Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition duration-300 blur-2xl">
        <div className="absolute top-1/2 right-1 -translate-x-0.5 -translate-y-1/2 w-48 h-48 bg-cyan-400/30 rounded-full" />
        <div className="absolute top-0 left-0 w-24 h-24 bg-blue-500/40 rounded-full" />
      </div>
      <div className="absolute top-1/2 right-1 -translate-x-0.5 -translate-y-1/2 w-48 h-48 bg-cyan-400/10 rounded-full blur-2xl" />
      <div className="absolute top-0 left-0 w-24 h-24 bg-blue-500/20 rounded-full blur-2xl" />

      {/* Content */}
      <h3 className="text-cyan-300 text-sm font-semibold mb-3 z-10 relative">📊 North Star Metric</h3>

      <p className="text-xs text-neutral-400 mb-4 z-10 relative">2025 Theme: Simplicity</p>

      <div className="text-sm flex justify-between items-center mb-2 z-10 relative">
        <span>Fulfillment Score</span>
        <span>{score}% 📈</span>
      </div>

      <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden z-10 relative">
        <motion.div
          className="h-full bg-gradient-to-r from-blue-500 via-cyan-400 to-emerald-400 rounded-full"
          animate={{ width: `${score}%` }}
          transition={{ duration: 1 }}
        />
      </div>
    </motion.div>
  );
};