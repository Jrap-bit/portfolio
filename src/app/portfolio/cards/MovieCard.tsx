"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";

export const MovieShelfCard = () => {
  const [expanded, setExpanded] = useState(true); // open by default

  return (
    <motion.div
      className="col-span-2 row-span-1 rounded-2xl p-6 bg-black/60 backdrop-blur-md border border-white/10 shadow-inner text-white relative overflow-hidden group transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.01 }}
      transition={{ duration: 0.3 }}
    >
      {/* Ambient hover glow */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition duration-300 blur-2xl">
        <div className="absolute -top-4 -left-6 w-40 h-40 bg-orange-500/20 rounded-full" />
        <div className="absolute -bottom-6 -right-10 w-44 h-44 bg-orange-300/20 rounded-full" />
      </div>
      <div className="absolute top-8 right-4 w-24 h-24 bg-orange-500/10 rounded-full blur-2xl z-0" />

      {/* Heading + Toggle */}
      <div className="flex justify-between items-center mb-4 relative z-10">
        <h3 className="bg-gradient-to-l from-pink-200 via-orange-300 to-orange-400 bg-clip-text text-transparent text-lg font-bold">🎬 Movie That Shaped Me</h3>
        <button
          onClick={() => setExpanded((prev) => !prev)}
          className="text-xs text-orange-400 hover:text-orange-300"
        >
          {expanded ? "Show Less" : "Show More"}
        </button>
      </div>

      {/* Main content grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 relative z-10">
        {/* Poster + Description */}
        <div className="flex gap-4 col-span-2 md:col-span-1">
          <Image
            src="/images/movie.jpg"
            alt="Movie Poster"
            width={100}
            height={160}
            className="rounded-md object-cover"
          />
          <div className="flex flex-col justify-between">
            <div>
              <p className="text-sm font-medium">Dead Poets Society (1989)</p>
              <p className="text-xs text-neutral-400">Directed by Peter Weir</p>
              <p className="text-xs text-neutral-300 mt-1">
              Taught me the weight of words, and the risk of not using them. Words and ideas can change the world.
              </p>
            </div>
          </div>
        </div>

        {/* Expandable Details */}
        {expanded && (
          <motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  className="md:col-span-2 grid grid-cols-2 gap-x-6"
>
  <div className="bg-white/10 p-2.5 rounded-lg text-sm">
    <p className="text-neutral-400 mb-1 font-semibold">Inspired Me</p>
    <p className="text-neutral-300 mb-2">The Secret Life of Walter Mitty</p>
    <p className="text-xs text-neutral-300">A reminder to embrace the unknown, finding the extraordinary in the ordinary
    and seek adventure.</p>
  </div>
  <div className="bg-white/10 p-2.5 rounded-lg text-sm">
    <p className="text-neutral-400 mb-1 font-semibold">Comfort Movie</p>
    <p className="text-neutral-200 mb-2">Rockstar</p>
    <p className="text-xs text-neutral-300">A raw, chaotic reminder that love, art, and pain often speak the same language.</p>
  </div>
</motion.div>
        )}
      </div>
    </motion.div>
  );
};