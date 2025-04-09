"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { PI_DIGITS } from "~/lib/constants/pi";

export const PiStreamCard = () => {
  const fullDigits = PI_DIGITS;
  const [visibleDigits, setVisibleDigits] = useState("");
  const containerRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const iRef = useRef(0);
  const [isHovered, setIsHovered] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      const char = fullDigits[iRef.current] ?? "";
      iRef.current = (iRef.current + 1) % fullDigits.length;

      setVisibleDigits((prev) => {
        let nextVisible = prev + char;

        const contentEl = contentRef.current;
        const containerEl = containerRef.current;

        if (contentEl && containerEl) {
          const contentHeight = contentEl.offsetHeight;
          const containerHeight = containerEl.offsetHeight;

          if (contentHeight >= containerHeight) {
            nextVisible = char;
          }
        }

        return nextVisible;
      });
    }, 50);

    return () => clearInterval(interval);
  }, [fullDigits]);

  return (
    <motion.div
      className="col-span-2 rounded-2xl p-5 backdrop-blur-md bg-black/50 border border-white/10 shadow-inner text-white transition-all duration-300 relative group overflow-hidden card-gradient-border"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      onHoverStart={() => setIsHovered(true)}
      onHoverEnd={() => setIsHovered(false)}
      style={
        {
          "--border-from": "#3b82f6", // Tailwind blue-500
          "--border-to": "#a78bfa",   // Tailwind purple-400
        } as React.CSSProperties
      }
    >
      {/* Hover Glow – Green Blur only on Hover */}
      <div className="absolute inset-0 z-0 pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-300">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-pink-400/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-500/30 blur-2xl rounded-full" />
      </div>
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-pink-400/10 rounded-full blur-2xl" />
      <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-500/10 blur-2xl rounded-full" />

      {/* Label */}
      <h3 className="text-lg font-bold bg-gradient-to-r from-red-400 to-pink-600 bg-clip-text text-transparent tracking-wide mb-3 relative">
        π Stream
      </h3>

      {/* Stream Display */}
      <div
        ref={containerRef}
        className="h-60 overflow-y-auto px-1 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 relative z-10"
      >
        <div
          ref={contentRef}
          className="font-mono text-lg leading-snug text-red-200 whitespace-normal break-words"
        >
          <OptimizedDigits text={visibleDigits} isHovered={isHovered} />
        </div>
      </div>
    </motion.div>
  );
};

// Optimized version that doesn't create a span for every digit
const OptimizedDigits = ({ text, isHovered }: { text: string; isHovered: boolean }) => {
  // Only animate the last 20 characters for better performance
  const lastChars = text.slice(-20);
  const previousChars = text.slice(0, -20);
  
  return (
    <>
      <span className="opacity-100">{previousChars}</span>
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {lastChars}
      </motion.span>
    </>
  );
};