"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export const LatestBlogCard = () => {
  const [latestPost, setLatestPost] = useState<{
    title: string;
    link: string;
    pubDate: string;
  } | null>(null);

  useEffect(() => {
    const fetchPost = async () => {
      const res = await fetch("/api/latest-blog");
      const data = await res.json();
      setLatestPost(data);
    };

    fetchPost();
  }, []);

  return (
    <motion.div
      className="col-span-1 row-span-1 rounded-2xl p-5 bg-black/60 backdrop-blur-md border border-white/10 shadow-inner text-white relative overflow-hidden group transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.01 }}
    >
      {/* Hover Blur */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition duration-300 blur-2xl">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-400/20 rounded-full" />
      </div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-amber-400/10 rounded-full blur-2xl" />

      <h3 className="text-cyan-300 text-sm font-semibold mb-3 relative z-10">
        ✍️ Latest Blog
      </h3>

      {latestPost ? (
        <>
          <h4 className="text-sm font-medium relative z-10">{latestPost.title}</h4>
          <p className="text-xs text-neutral-400 relative z-10">
            {new Date(latestPost.pubDate).toLocaleDateString()}
          </p>
          <a
            href={latestPost.link}
            target="_blank"
            rel="noopener noreferrer"
            className="text-xs text-amber-400 hover:text-amber-300 mt-2 inline-block relative z-10"
          >
            Read Now →
          </a>
        </>
      ) : (
        <p className="text-xs text-neutral-400 relative z-10">Loading latest post...</p>
      )}
    </motion.div>
  );
};