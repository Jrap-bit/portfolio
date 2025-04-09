import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaCheckCircle, FaEllipsisH, FaSpotify, FaFilm, FaCompass, FaQuoteLeft } from "react-icons/fa";

export const NorthStarCard = () => {
    const [score, setScore] = useState(0);
    useEffect(() => {
      const timer = setTimeout(() => setScore(87), 400);
      return () => clearTimeout(timer);
    }, []);
  
    return (
      <motion.div
        className="col-span-1 row-span-1 rounded-2xl bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-6 backdrop-blur-md border border-white/10 shadow-lg text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-cyan-300 text-sm font-semibold mb-3">📊 North Star Metric</h3>
        <div className="text-sm flex justify-between items-center mb-2">
          <span>Fulfillment Score</span>
          <span>{score}% 📈</span>
        </div>
        <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
            animate={{ width: `${score}%` }}
            transition={{ duration: 1 }}
          />
        </div>
        <p className="text-xs text-neutral-400 mt-2">2025 Theme: Simplicity</p>
      </motion.div>
    );
  };