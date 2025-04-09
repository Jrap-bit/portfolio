"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import {
  FaQuoteLeft,
  FaSpotify,
  FaBookOpen,
  FaBrain,
  FaFilm,
  FaChartLine,
} from "react-icons/fa";

export default function AboutMeSection() {
  const [piDigits, setPiDigits] = useState("3.1415926535");

  useEffect(() => {
    const fullPi =
      "3.141592653589793238462643383279502884197169399375105820974944592307816406286208";
    let index = 0;
    const interval = setInterval(() => {
      setPiDigits((prev) =>
        prev.length > 80 ? fullPi.slice(index, index + 80) : prev + fullPi[index % fullPi.length]
      );
      index++;
    }, 100);
    return () => clearInterval(interval);
  }, []);

  const rotatingThoughts = [
    "Why product intuition is fast pattern recognition.",
    "Design is just thoughtful reduction.",
    "Your mind is a garden. What are you growing?",
  ];
  const [thought, setThought] = useState(rotatingThoughts[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      setThought(
        rotatingThoughts[Math.floor(Math.random() * rotatingThoughts.length)]
      );
    }, 7000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="about"
      className="w-full min-h-screen px-4 py-20 bg-black text-white flex flex-col items-center"
    >
      <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-12">
        About Me
      </h2>

      {/* Status + Pi Row */}
      <div className="grid md:grid-cols-3 gap-6 w-full max-w-6xl mb-12">
        <motion.div className="col-span-1 bg-white/5 backdrop-blur p-4 rounded-xl shadow border border-white/10">
          <p className="text-sm text-neutral-400">Current Mood:</p>
          <p className="text-lg">Creative Flow 🌊</p>
          <p className="text-sm text-neutral-400 mt-2">Energy Level:</p>
          <p className="text-lg">74%</p>
          <p className="text-sm text-neutral-400 mt-2">Thinking About:</p>
          <p className="text-lg">AI as a mirror</p>
        </motion.div>

        <motion.div className="col-span-2 bg-black/30 rounded-xl px-4 py-3 border border-white/10 overflow-hidden relative">
          <div className="absolute top-0 left-0 h-full w-full bg-gradient-to-r from-cyan-400/10 to-blue-500/10 animate-pulse blur-md" />
          <p className="text-green-400 font-mono whitespace-nowrap text-sm z-10 relative">
            {piDigits}
          </p>
        </motion.div>
      </div>

      {/* Bento Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-6xl">
        {/* 1. What I'm Thinking */}
        <motion.div className="p-5 rounded-2xl bg-gradient-to-br from-blue-500/10 to-cyan-500/10 border border-white/10 shadow-lg">
          <div className="flex items-center gap-2 mb-2 text-cyan-300">
            <FaBrain /> <span className="text-sm font-semibold">What I'm Thinking</span>
          </div>
          <p className="text-white text-lg italic">“{thought}”</p>
        </motion.div>

        {/* 2. Currently Reading */}
        <motion.div whileHover={{ rotateY: 180 }} className="relative h-52 rounded-2xl bg-white/5 border border-white/10 overflow-hidden">
          <div className="absolute inset-0 p-4 flex flex-col items-center justify-center">
            <FaBookOpen className="text-blue-300 mb-2" size={24} />
            <p className="text-white font-semibold">Hooked by Nir Eyal</p>
            <p className="text-sm text-neutral-400">“Build habits, not hacks.”</p>
          </div>
        </motion.div>

        {/* 3. Listening To */}
        <motion.div className="p-5 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 mb-2 text-green-300">
            <FaSpotify /> <span className="text-sm font-semibold">Currently Listening</span>
          </div>
          <div className="flex items-center gap-3">
            <Image src="/images/cover-placeholder.jpg" alt="Track Cover" width={50} height={50} className="rounded" />
            <div>
              <p className="text-white font-semibold text-sm">Track Title</p>
              <p className="text-neutral-400 text-xs">Artist</p>
            </div>
          </div>
        </motion.div>

        {/* 4. Latest Blog */}
        <motion.div className="p-5 rounded-2xl bg-black border border-cyan-400/20 animate-pulse cursor-pointer">
          <p className="text-sm font-semibold text-blue-300">Latest Blog</p>
          <p className="text-white mt-2">How to Build for Flow: Lessons from Game UX</p>
          <p className="text-neutral-400 text-sm mt-1">5 min read • Read Now</p>
        </motion.div>

        {/* 5. Life Quote */}
        <motion.div className="p-5 rounded-2xl bg-gradient-to-br from-white/5 to-white/10 border border-white/10">
          <div className="text-white/50 flex items-center gap-2 mb-2">
            <FaQuoteLeft /> <span className="text-sm">Life Quote</span>
          </div>
          <p className="text-neutral-400 italic animate-pulse">“…”</p>
        </motion.div>

        {/* 6. North Star Metric */}
        <motion.div className="p-5 rounded-2xl bg-white/5 border border-white/10">
          <div className="flex items-center gap-2 text-cyan-300 mb-2">
            <FaChartLine /> <span className="text-sm font-semibold">North Star Metric</span>
          </div>
          <p className="text-white text-lg">My 2025 Theme: Simplicity</p>
        </motion.div>

        {/* 7. Movie That Shaped Me */}
        <motion.div className="p-5 rounded-2xl bg-white/5 border border-white/10 flex items-center gap-4">
          <Image src="/images/inception.jpg" alt="Movie Poster" width={60} height={90} className="rounded-md" />
          <div>
            <p className="text-white font-semibold">Inception</p>
            <p className="text-sm text-neutral-400">“Taught me to question reality.”</p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
