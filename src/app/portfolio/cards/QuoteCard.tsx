"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaEllipsisH } from "react-icons/fa";

export const QuoteCard = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timeout = setTimeout(() => setIsLoading(false), 2000);
    return () => clearTimeout(timeout);
  }, []);

  return (
    <motion.div
      className="col-span-1 row-span-1 rounded-2xl p-5 bg-black/60 backdrop-blur-md border border-white/10 shadow-inner text-white relative overflow-hidden group transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.01 }}
    >
      {/* Hover Glows: Random placement */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition duration-300 blur-2xl">
        {/* Left pink glow */}
        <div className="absolute -top-6 -left-8 w-32 h-32 bg-pink-500/20 rounded-full" />
        {/* Right purple glow */}
        <div className="absolute bottom-2 -right-10 w-40 h-40 bg-purple-500/20 rounded-full" />
      </div>

      {/* Base Glows (dim, always visible, off-center) */}
      <div className="absolute -bottom-8 -left-6 w-36 h-36 bg-pink-500/10 rounded-full blur-2xl z-0" />
      <div className="absolute top-4 -right-8 w-28 h-28 bg-purple-500/10 rounded-full blur-2xl z-0" />

      {/* Heading */}
      <h3 className="bg-gradient-to-r from-pink-400 to-purple-200 bg-clip-text text-transparent text-lg font-bold mb-3 relative z-10">
        💬 Life Quote
      </h3>

      {/* Quote or Loader */}
      <div className="h-24 flex items-center justify-center relative z-10 text-center">
        {isLoading ? (
          <motion.div
            animate={{ opacity: [0.2, 0.7, 0.2] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="text-neutral-500"
          >
            <FaEllipsisH size={24} />
          </motion.div>
        ) : (
          <motion.blockquote
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="text-sm text-neutral-300 italic leading-relaxed"
          >
            "But only in their dreams can men be truly free. ‘Twas always thus, and always thus will be."
            <footer className="text-xs text-neutral-500 mt-2 not-italic">— John Keating</footer>
          </motion.blockquote>
        )}
      </div>
    </motion.div>
  );
};