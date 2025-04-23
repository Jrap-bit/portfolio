'use client';

import { useEffect } from "react";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Error({ error, reset }: { error: Error; reset: () => void }) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center px-6 py-20 text-center">
      <motion.h1
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="text-4xl font-bold bg-gradient-to-r from-indigo-300 via-blue-400 to-cyan-400 text-transparent bg-clip-text"
      >
        Something fractured in the flow
      </motion.h1>

      <p className="mt-6 max-w-xl text-white/70 text-lg">
        The thought you seek fractured in transit. Try again — or seek another star.
      </p>

      <div className="mt-8 flex gap-4">
        <button
          onClick={() => reset()}
          className="px-6 py-3 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 font-medium text-white hover:scale-105 hover:shadow-[0_0_10px_3px_rgba(99,102,241,0.6)] transition-all duration-300"
        >
          Retry
        </button>
        <Link
          href="/"
          className="px-6 py-3 rounded-full bg-white/10 border border-white/20 text-white hover:bg-white/20 transition-all duration-300"
        >
          ⭠ Return to Portal
        </Link>
      </div>
    </div>
  );
}
