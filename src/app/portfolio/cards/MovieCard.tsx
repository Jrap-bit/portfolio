import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaCheckCircle, FaEllipsisH, FaSpotify, FaFilm, FaCompass, FaQuoteLeft } from "react-icons/fa";

export const MovieShelfCard = () => {
    const [expanded, setExpanded] = useState(false);
  
    return (
      <motion.div
        className="col-span-2 row-span-1 rounded-2xl bg-gradient-to-br from-purple-900/30 to-indigo-900/30 p-6 backdrop-blur-md border border-white/10 shadow-lg text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-cyan-300 text-sm font-semibold">🎬 Movie That Shaped Me</h3>
          <button
            className="text-xs text-purple-400 hover:text-purple-300"
            onClick={() => setExpanded((prev) => !prev)}
          >
            {expanded ? "Show Less" : "Show More"}
          </button>
        </div>
  
        <div className="flex gap-4 items-start">
          <Image
            src="/images/anime.png"
            alt="Movie"
            width={100}
            height={160}
            className="rounded-md object-cover"
          />
          <div>
            <p className="text-sm font-medium">"Her" (2013)</p>
            <p className="text-xs text-neutral-400">Directed by Spike Jonze</p>
            <p className="text-xs text-neutral-300 mt-1">
              Made me rethink tech, love, and voice interfaces forever.
            </p>
          </div>
        </div>
  
        {expanded && (
          <motion.div
            className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-2"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          >
            <div className="bg-white/5 p-3 rounded-lg text-xs">
              <p className="text-neutral-400">Shaped Me</p>
              <p>"Her" – AI relationships</p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg text-xs">
              <p className="text-neutral-400">Inspired Me</p>
              <p>"Inception" – Dreams vs. Reality</p>
            </div>
            <div className="bg-white/5 p-3 rounded-lg text-xs">
              <p className="text-neutral-400">Comfort Movie</p>
              <p>"The Grand Budapest Hotel"</p>
            </div>
          </motion.div>
        )}
      </motion.div>
    );
  };
  