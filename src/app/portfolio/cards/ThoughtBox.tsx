import { motion } from "framer-motion";

export const WhatImThinkingCard = () => {
  return (
    <motion.div
      className="relative mt-4 rounded-2xl p-5 bg-black/60 backdrop-blur-md border border-white/10 shadow-inner text-white group overflow-hidden transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.01 }}
    >
      {/* Soft Hover Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition duration-300 blur-2xl">
        <div className="absolute top-1 right-1 w-48 h-48 bg-indigo-400/20 rounded-full" />
      <div className="absolute top-1/2 left-1 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-400/20 rounded-full blur-2xl" />
      </div>
      <div className="absolute top-1/2 left-1 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-400/10 rounded-full blur-2xl" />

      {/* Content */}
      <h3 className="bg-gradient-to-r from-indigo-400 to-cyan-100 bg-clip-text text-transparent text-lg font-bold mb-3 z-10 relative">
        🧠 What I’m Thinking
      </h3>
      <p className="text-sm text-neutral-300 z-10 relative">
      Building a product is prioritization, narrative, and timing.
      </p>
    </motion.div>
  );
};