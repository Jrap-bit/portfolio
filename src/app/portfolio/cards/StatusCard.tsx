"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const moods = [
  "Creative Flow 🌊",
  "Focused Mode 🔍",
  "Dreaming in Code 🧠",
  "Smooth Like Butter 🧈",
];

export default function StatusCard() {
  const [moodIndex, setMoodIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setMoodIndex((prev) => (prev + 1) % moods.length);
    }, 6000);
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.015 }}
      transition={{ duration: 0.01 }}
      className="relative rounded-2xl p-5 bg-black/60 backdrop-blur-md border border-white/10 shadow-inner text-white overflow-hidden group transition-all duration-300"
    >
      {/* Soft Blur Glow on Hover */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition duration-300 blur-2xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-500/10 rounded-full" />
        <div className="absolute top-0 right-80 w-24 h-24 bg-blue-400/20 rounded-full" />
      </div>
        <div className="absolute top-0 left-1 w-24 h-24 bg-blue-600/30 rounded-full blur-2xl" />

      {/* Content */}
      <div className="relative z-10 flex flex-col gap-5">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-semibold text-cyan-300 tracking-wide">
            Status
          </h3>
          <span className="text-[10px] uppercase font-medium tracking-wide text-green-300 bg-green-500/10 px-2 py-0.5 rounded-full">
            Online
          </span>
        </div>

        <div className="space-y-1">
          <p className="text-[11px] text-neutral-500 uppercase">Mood</p>
          <motion.p
            key={moodIndex}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-sm font-medium text-white/90"
          >
            {moods[moodIndex]}
          </motion.p>
        </div>

        <div className="space-y-1 mt-2">
          <p className="text-[11px] text-neutral-500 uppercase">Energy Level</p>
          <div className="flex items-center gap-2">
            <div className="relative w-full h-2 bg-white/10 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "74%" }}
                whileHover={{ width: "80%" }}
                transition={{ duration: 1 }}
                className="absolute h-full bg-gradient-to-r from-blue-400 via-cyan-300 to-emerald-300 rounded-full"
              />
            </div>
            <span className="text-xs text-white/70 font-semibold">74%</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}