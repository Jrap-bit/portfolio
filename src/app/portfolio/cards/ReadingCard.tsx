"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const CurrentlyReadingCard = () => {
  const [isMobile, setIsMobile] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);

  const handleInteraction = () => {
    if (isMobile) {
      setIsFlipped(!isFlipped);
    }
  };

  const handleHoverStart = () => {
    if (!isMobile) {
      setIsFlipped(true);
    }
  };

  const handleHoverEnd = () => {
    if (!isMobile) {
      setIsFlipped(false);
    }
  };

  return (
    <motion.div
      className="relative col-span-1 row-span-2 rounded-2xl p-5 bg-black/60 backdrop-blur-md border border-white/10 shadow-inner text-white group overflow-hidden transition-all duration-300"
      onClick={handleInteraction}
      onHoverStart={handleHoverStart}
      onHoverEnd={handleHoverEnd}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.01 }}
    >
      {/* Subtle Hover Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition duration-300 blur-2xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-indigo-400/10 rounded-full" />
        <div className="absolute bottom-0 right-0 w-24 h-24 bg-violet-500/30 rounded-full" />
        <div className="absolute top-0 left-0 w-24 h-24 bg-violet-500/30 rounded-full" />
      </div>
      <div className="absolute bottom-0 right-0 w-24 h-24 bg-violet-500/20 rounded-full blur-2xl" />
      <div className="absolute top-0 left-0 w-24 h-24 bg-violet-500/20 rounded-full blur-2xl" />

      <h3 className="bg-gradient-to-r from-violet-500 to-violet-200 bg-clip-text text-transparent text-lg font-bold mb-3 relative z-10">
        📚 Currently Reading
      </h3>

      <div className="relative w-full h-56 preserve-3d z-10">
        <AnimatePresence initial={false}>
          {!isFlipped ? (
            <motion.div
              key="front"
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -180, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0"
            >
              <Image
                src="/images/currently_reading.jpg"
                alt="Book Cover"
                width={500}
                height={300}
                className="w-full h-40 rounded-lg object-cover mb-3"
              />
              <h4 className="text-sm font-medium">Nani Palkhivala The Courtroom Genius</h4>
              <p className="text-xs text-neutral-400">
              by Soli Sorabjee, Arvind Datar
              </p>
              <p className="text-xs text-neutral-500 mt-2 italic">
                {isMobile ? "Tap to flip" : "Hover to flip"}
              </p>
            </motion.div>
          ) : (
            <motion.div
              key="back"
              initial={{ rotateY: 180, opacity: 0 }}
              animate={{ rotateY: 0, opacity: 1 }}
              exit={{ rotateY: -180, opacity: 0 }}
              transition={{ duration: 0.6, ease: "easeInOut" }}
              className="absolute inset-0 p-3 bg-black/70 rounded-xl"
            >
              <h4 className="text-sm font-semibold mb-2 bg-gradient-to-l bg-clip-text text-transparent from-violet-500 to-violet-200">
                Why I Picked This
              </h4>
              <p className="text-xs text-neutral-300 leading-relaxed">
              I knew the headlines — Kesavananda, the Basic Structure doctrine — cases that shaped India’s constitutional history.  I picked this book to go beyond the headlines and understand the mind behind those moments.
              </p>
              <p className="text-xs text-neutral-500 mt-2 italic">
                {isMobile ? "Tap to flip back" : ""}
              </p>
            </motion.div>
          )}  
        </AnimatePresence>
      </div>
    </motion.div>
  );
};