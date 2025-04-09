import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaCheckCircle, FaEllipsisH, FaSpotify, FaFilm, FaCompass, FaQuoteLeft } from "react-icons/fa";

export const OneLiner = () => (
    <motion.p
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="text-lg md:text-lg text-neutral-100 font-medium"
    >
      "Half developer, half storyteller — but this site? Fully me. Welcome to the overlap between engineering precision and creative intuition."
    </motion.p>
  );