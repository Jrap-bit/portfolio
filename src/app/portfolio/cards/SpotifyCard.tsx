"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSpotify } from "react-icons/fa";

type NowPlaying = {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string;
  songUrl: string;
};

export default function SpotifyCard() {
  const [data, setData] = useState<NowPlaying | null>(null);
  const [loading, setLoading] = useState(true);

  // Auto-refresh every 30 seconds
  useEffect(() => {
    const fetchData = async () => {
      const res = await fetch("/api/spotify/now-playing");
      const json = await res.json();
      if (!json || json.error || res.status !== 200) {
        setData(null);
      } else {
        setData(json);
      }
      setLoading(false);
    };

    fetchData();
    const interval = setInterval(fetchData, 30000); // refresh every 30s
    return () => clearInterval(interval);
  }, []);

  return (
    <motion.div
      className="col-span-1 row-span-2 rounded-2xl p-5 bg-black/60 backdrop-blur-md border border-white/10 shadow-inner text-white relative overflow-hidden group transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.01 }}
    >
      {/* Glow hover */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition duration-300 blur-2xl">
        <div className="absolute top-1 left-3 -translate-x-3 -translate-y-3 w-48 h-48 bg-green-400/20 rounded-full" />
        <div className="absolute bottom-1 right-2 -translate-x-3 -translate-y-3 w-48 h-48 bg-green-400/20 rounded-full" />
      </div>
      <div className="absolute top-1 left-3 -translate-x-3 -translate-y-3 w-48 h-48 bg-green-400/10 rounded-full blur-2xl" />
      <div className="absolute bottom-1 right-0 -translate-x-4 -translate-y-3 w-48 h-48 bg-green-400/10 rounded-full blur-2xl" />
      {/* Header */}
      <h3 className="text-green-300 text-sm font-semibold mb-3 relative z-10">
        🎧 Currently Listening
      </h3>

      {loading ? (
        <p className="text-xs text-neutral-400 relative z-10">Loading track...</p>
      ) : !data ? (
        <p className="text-xs text-neutral-400 relative z-10">No track available</p>
      ) : (
        <a
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full h-full flex flex-col items-center justify-between gap-4 text-center relative z-10"
        >
          {/* Title + Artist */}
          <div>
            <h4 className="text-white text-base font-medium">{data.title}</h4>
            <p className="text-sm text-gray-300">{data.artist}</p>
            <p className="text-xs text-gray-500 mt-1">{data.album}</p>
          </div>

          {/* Album Cover + Animation + Spotify Logo */}
          <div className="relative">
          

            <img
              src={data.albumImageUrl}
              alt="Album cover"
              className="w-32 h-32 rounded-xl shadow-md object-cover z-10 relative"
            />

            {/* Spotify Logo */}

          </div>

          {/* Footer Label */}
          <p className="text-[11px] text-gray-400 tracking-wide uppercase">
            {data.isPlaying ? "Now Playing" : "Last Played"}
          </p>
        </a>
      )}
    </motion.div>
  );
}