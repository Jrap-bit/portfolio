// components/ui/AnimatedBorderWrapper.tsx
"use client";

import { motion } from "framer-motion";
import React from "react";

interface AnimatedBorderWrapperProps {
  children: React.ReactNode;
  fromColor: string;
  viaColor: string;
  toColor: string;
}

export const AnimatedBorderWrapper = ({
  children,
  fromColor,
  viaColor,
  toColor,
}: AnimatedBorderWrapperProps) => {
  return (
    <motion.div
      className="relative rounded-2xl p-[2px] overflow-hidden group"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      {/* Animated Border */}
      <motion.div
        className="absolute inset-0 z-0 rounded-2xl transition-all duration-300"
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 10, ease: "linear" }}
        style={{
          background: `conic-gradient(at top left, ${fromColor}, ${viaColor}, ${toColor}, ${fromColor})`,
          filter: "blur(0px)",
        }}
      />

      {/* Glow on Hover */}
      <div className="absolute inset-0 z-0 rounded-2xl opacity-0 group-hover:opacity-100 transition duration-300 blur-md pointer-events-none"
        style={{
          background: `conic-gradient(at top left, ${fromColor}, ${viaColor}, ${toColor}, ${fromColor})`,
        }}
      />

      {/* Inner Card Content */}
      <div className="relative z-10 bg-black/90 backdrop-blur-md rounded-2xl border border-white/10">
        {children}
      </div>
    </motion.div>
  );
};