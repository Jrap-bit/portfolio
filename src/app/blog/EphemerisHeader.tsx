// components/EphemerisHeader.tsx
"use client";

import { useScroll, useTransform, motion } from "framer-motion";
import { useRef } from "react";

export default function EphemerisHeader() {
  const ref = useRef(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });

  const y = useTransform(scrollYProgress, [0, 1], [0, -80]);
  const opacity = useTransform(scrollYProgress, [0, 0.2, 1], [1, 0.7, 0]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 0.85]);

  return (
    <div ref={ref} className="relative mb-16">
      <motion.h1
        style={{ y, opacity, scale }}
        className="text-center text-6xl sm:text-7xl font-bold tracking-wide bg-gradient-to-r from-cyan-300 via-indigo-300 to-purple-300 bg-clip-text text-transparent drop-shadow-lg"
      >
        Ephemeris
      </motion.h1>

      <motion.p
        style={{ opacity }}
        className="mt-3 text-sm sm:text-base text-center italic text-white/70"
      >
        from the edges of memory and thought
      </motion.p>

      {/* Subtle starlight backdrop */}
      <div className="absolute inset-0 -z-10 flex items-center justify-center">
        <div className="w-[320px] h-[320px] bg-gradient-to-tr from-indigo-500 via-cyan-500 to-purple-500 opacity-20 blur-3xl rounded-full animate-pulse" />
      </div>
    </div>
  );
}
