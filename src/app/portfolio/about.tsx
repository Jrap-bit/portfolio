"use client";

import React from "react";
import StatusCard from "./cards/StatusCard";
import { PiStreamCard } from "./cards/PiStream";
import { WhatImThinkingCard } from "./cards/ThoughtBox";
import { CurrentlyReadingCard } from "./cards/ReadingCard";
import {SpotifyCard} from "./cards/SpotifyCard";
import { LatestBlogCard } from "./cards/BlogCard";
import { QuoteCard } from "./cards/QuoteCard";
import { NorthStarCard } from "./cards/MetricCard";
import { MovieShelfCard } from "./cards/MovieCard";
import { OneLiner } from "./cards/OneLiner";

import { motion } from "framer-motion";
import { AnimatedBorderWrapper } from "~/components/ui/BorderTracer";

export default function AboutMe() {
  return (
    <section id="about" className="w-full min-h-screen px-4 md:px-12 py-20 bg-black text-white">
      <div className="max-w-7xl mx-auto flex flex-col items-start gap-10">

        {/* Heading + One Liner */}
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300"
        >
          Layers of Me 🧩
        </motion.h2>

        <OneLiner />

        {/* Bento Grid Layout */}
        <div className="grid grid-cols-1 md:grid-cols-3 auto-rows-[minmax(100px,_auto)] gap-4 md:gap-6 w-full">
  {/* Row 1 */}
  <div className="w-full min-w-0">
    <StatusCard />
    <WhatImThinkingCard />
  </div>
  <div className="w-full min-w-0 md:col-span-2">
    <PiStreamCard />

  </div>

  {/* Row 2 & 3 */}
  <div className="w-full min-w-0">
    <CurrentlyReadingCard />
  </div>
  <div className="w-full min-w-0">
    <NorthStarCard />
    <LatestBlogCard />
  </div>
  <div className="w-full min-w-0">
    <SpotifyCard />
  </div>

  {/* Row 4 */}
  <div className="w-full min-w-0 md:col-span-2">
    <MovieShelfCard />
  </div>
  <div className="w-full min-w-0">
    <QuoteCard />
  </div>
</div>
      </div>
    </section>
  );
}
