"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function NotFound() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-5xl font-bold bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-400 text-transparent bg-clip-text"
      >
        404 — Lost in the Aether
      </motion.h1>

      <p className="mt-6 max-w-xl text-white/70 text-lg">
        You’ve drifted off the map. Nothing waits here — not even silence.
      </p>

      <Link
        href="/"
        className="mt-8 inline-block px-6 py-3 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 font-medium text-white hover:scale-105 hover:shadow-[0_0_10px_3px_rgba(99,102,241,0.6)] transition-all duration-300"
      >
        ⭠ Return to Portal
      </Link>
    </div>
  );
}