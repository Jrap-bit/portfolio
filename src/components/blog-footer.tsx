"use client";

import Link from "next/link";
import { motion } from "framer-motion";

import { useEffect, useState } from "react";

interface FooterProps {
  wordCount: number;
}

export default function Footer({ wordCount }: FooterProps) {
  const [quote, setQuote] = useState("");

  const quotes = [
    "This blog drifts like stardust — ephemeral, luminous, gone.",
    "Thoughts archived in ether, not ink.",
    "Each post, a fallen feather from the cosmos.",
    "Some memories stay warm only when read.",
    "Between silence and starlight, words linger."
  ];

  useEffect(() => {
    const random = quotes[Math.floor(Math.random() * quotes.length)];
    setQuote(random ?? "");
  }, []);

  const currentYear = new Date().getFullYear();

  return (
    <footer className="mt-15 border-t border-white/10 pt-10 text-sm text-white/70 px-4 md:px-8">
      <div className="max-w-6xl mx-auto flex flex-col items-center gap-4 text-center">
      <motion.div
  initial={{ opacity: 0, y: 20 }}
  animate={{ opacity: 1, y: 0 }}
  transition={{ duration: 1, ease: "easeOut" }}
  className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 via-blue-400 to-indigo-300 text-2xl sm:text-3xl font-semibold tracking-tight text-center drop-shadow-sm"
>
  Ephemeris — from the edges of memory and thought
</motion.div>

<motion.div
  initial={{ opacity: 0 }}
  animate={{ opacity: 1 }}
  transition={{ delay: 0.3, duration: 1 }}
  className="italic text-white/90 max-w-xl text-center mt-2 text-sm sm:text-base px-4 drop-shadow-[0_0_8px_rgba(255,255,255,0.2)]"
>
  {quote}
</motion.div>

        <div className="flex flex-wrap items-center justify-center gap-6 text-white/80 mt-4 drop-shadow-[0_0_4px_rgba(255,255,255,0.15)]">
          <Link
            href="/feed.xml"
            className="hover:text-white transition"
          >
            RSS Feed
          </Link>
          <span>
            {wordCount.toLocaleString()} words written
          </span>
          <span>
            © {currentYear} Parjanya. All rights reserved.
          </span>
        </div>
      </div>
    </footer>
  );
}
