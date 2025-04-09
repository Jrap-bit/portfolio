import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaCheckCircle, FaEllipsisH, FaSpotify, FaFilm, FaCompass, FaQuoteLeft } from "react-icons/fa";

export const QuoteCard = () => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
      const timeout = setTimeout(() => setIsLoading(false), 2000);
      return () => clearTimeout(timeout);
    }, []);
  
    return (
      <motion.div
        className="col-span-1 row-span-1 rounded-2xl bg-gradient-to-br from-pink-900/30 to-rose-900/30 p-6 backdrop-blur-md border border-white/10 shadow-lg text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-cyan-300 text-sm font-semibold mb-3">💬 Life Quote</h3>
        <div className="h-20 flex items-center justify-center">
          {isLoading ? (
            <motion.div
              animate={{ opacity: [0.2, 0.7, 0.2] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="text-neutral-500"
            >
              <FaEllipsisH size={24} />
            </motion.div>
          ) : (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="text-sm text-neutral-300 italic text-center"
            >
              "The only way to do great work is to love what you do."
            </motion.p>
          )}
        </div>
      </motion.div>
    );
  };