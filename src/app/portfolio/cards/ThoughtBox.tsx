import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const WhatImThinkingCard = () => {
    const thoughts = [
      "Why product intuition is just fast pattern recognition.",
      "Design + engineering = interface magic.",
      "Invisible interfaces are the future.",
    ];
    const [index, setIndex] = useState(0);
  
    useEffect(() => {
      const timer = setInterval(() => setIndex((i) => (i + 1) % thoughts.length), 5000);
      return () => clearInterval(timer);
    }, []);
  
    return (
      <motion.div
        className="col-span-1 row-span-1 rounded-2xl bg-gradient-to-br from-blue-900/30 to-indigo-900/30 p-6 backdrop-blur-md border border-white/10 shadow-lg text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-cyan-300 text-sm font-semibold mb-3">🧠 What I’m Thinking</h3>
        <AnimatePresence mode="wait">
          <motion.p
            key={index}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            transition={{ duration: 0.4 }}
            className="text-sm text-neutral-300"
          >
            {thoughts[index]}
          </motion.p>
        </AnimatePresence>
      </motion.div>
    );
  };