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
      className="col-span-2 rounded-2xl p-5 backdrop-blur-md bg-black/50 border border-white/10 shadow-inner text-white transition-all duration-300 relative group overflow-hidden"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
    >
      {/* Hover Glow – Green Blur only on Hover */}
      <div className="absolute inset-0 z-0 pointer-events-none group-hover:opacity-100 opacity-0 transition-opacity duration-300">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80%] h-[60%] bg-emerald-400/10 blur-3xl rounded-full" />
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-emerald-500/30 blur-2xl rounded-full" />
        </div>
        <div className="absolute bottom-0 right-0 w-40 h-40 bg-pink-500/10 blur-2xl rounded-full" />

      {/* Border Glow Lines */}
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
      <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />
      <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent" />

      {/* Label */}
      <h3 className="text-sm font-semibold text-neutral-300 tracking-wide mb-3 relative z-10">
        π Pi Stream
      </h3>

      {/* Stream Display */}
      <div
        ref={containerRef}
        className="h-40 overflow-y-auto px-1 scrollbar-thin scrollbar-thumb-white/10 hover:scrollbar-thumb-white/20 relative z-10"
      >
        <div
          ref={contentRef}
          className="font-mono text-sm leading-snug text-green-400 whitespace-normal break-words"
        >
          <AnimatedDigits text={visibleDigits} />
        </div>
      </div>
    </motion.div>
  );
};

// Optional fade animation for digits
const AnimatedDigits = ({ text }: { text: string }) => {
  return (
    <>
      {text.split("").map((char, idx) => (
        <motion.span
          key={idx}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.3, delay: idx * 0.001 }}
        >
          {char}
        </motion.span>
      ))}
    </>
  );
};