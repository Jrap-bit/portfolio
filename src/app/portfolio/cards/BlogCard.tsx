import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

export const LatestBlogCard = () => {
    return (
      <motion.div
        className="col-span-1 row-span-1 rounded-2xl bg-gradient-to-br from-amber-900/30 to-orange-900/30 p-6 backdrop-blur-md border border-white/10 shadow-lg text-white relative"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-cyan-300 text-sm font-semibold mb-3">✍️ Latest Blog</h3>
        <h4 className="text-sm font-medium">"How I think about product design as an engineer"</h4>
        <p className="text-xs text-neutral-400">5 min read</p>
        <a href="#" className="text-xs text-orange-400 hover:text-orange-300 mt-2 inline-block">Read Now →</a>
  
        <motion.div
          className="absolute bottom-0 left-0 h-0.5 bg-gradient-to-r from-orange-400 to-yellow-300"
          animate={{ width: ["0%", "100%", "0%"], left: ["0%", "0%", "100%"] }}
          transition={{ duration: 4, repeat: Infinity }}
        />
      </motion.div>
    );
    }