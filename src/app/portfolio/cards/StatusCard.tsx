"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// Mood messages to rotate
const moods = [
  "Creative Flow 🌊",
  "Focused Mode 🔍",
  "Dreaming in Code 🧠",
  "Smooth Like Butter 🧈",
];

export default function StatusCard() {
  const [moodIndex, setMoodIndex] = useState(0);

  // Rotate mood every 6 seconds
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
      whileTap={{ scale: 0.985 }}
      transition={{ duration: 0.01 }}
      className="relative rounded-2xl bg-black/60 p-5 backdrop-blur-md border border-white/10 shadow-inner overflow-hidden group transition-all duration-300"
    >
      {/* Border glow */}
      <div className="absolute top-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
      <div className="absolute bottom-0 left-0 h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
      <div className="absolute left-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />
      <div className="absolute right-0 top-0 w-px h-full bg-gradient-to-b from-transparent via-white/10 to-transparent opacity-0 group-hover:opacity-100 transition duration-300" />

      {/* Label */}
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-sm font-semibold text-cyan-300 tracking-wide">
          Status
        </h3>
        <span className="text-[10px] uppercase font-medium tracking-wide text-green-300 bg-green-500/10 px-2 py-0.5 rounded-full">
          Online
        </span>
      </div>

      {/* Mood */}
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

      {/* Energy */}
      <div className="space-y-1 mt-4">
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
    </motion.div>
  );
}