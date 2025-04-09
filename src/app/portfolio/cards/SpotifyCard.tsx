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
  fallback?: boolean;
};

export default function SpotifyCard() {
  const [data, setData] = useState<NowPlaying | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrack = async () => {
      try {
        const res = await fetch("/api/spotify/now-playing");
        const nowPlaying = await res.json();

        if (nowPlaying && !nowPlaying.fallback && nowPlaying.title) {
          setData(nowPlaying);
        } else {
          const fallbackRes = await fetch("/api/spotify/recently-played");
          const lastPlayed = await fallbackRes.json();
          setData(lastPlayed);
        }
      } catch (err) {
        console.error("Spotify API failed:", err);
        setData(null);
      } finally {
        setLoading(false);
      }
    };

    fetchTrack();
    const interval = setInterval(fetchTrack, 30000);
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
      {/* Hover Glow */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-0 group-hover:opacity-100 transition duration-300 blur-2xl">
        <div className="absolute -top-6 -left-8 w-40 h-40 bg-green-400/20 rounded-full" />
        <div className="absolute bottom-2 -right-10 w-40 h-40 bg-green-400/10 rounded-full" />
      </div>

      {/* Heading */}
      <h3 className="bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-transparent text-lg font-bold mb-3 relative z-10 flex items-center gap-2">
        <FaSpotify className="text-green-400" />
        Currently Listening
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
          {/* Track Info */}
          <div>
            <h4 className="text-white text-base font-medium">{data.title}</h4>
            <p className="text-sm text-gray-300">{data.artist}</p>
            <p className="text-xs text-gray-500 mt-1">{data.album}</p>
          </div>

          {/* Album Art with Pulse Ring if Playing */}
          <div className="relative">
            {data.isPlaying && (
              <motion.div
                className="absolute inset-0 w-36 h-36 rounded-full border-2 border-green-400 opacity-50"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}

            <img
              src={data.albumImageUrl}
              alt="Album cover"
              className="w-32 h-32 rounded-xl shadow-md object-cover relative z-10"
            />

            {/* Spotify Logo Overlay */}
            <div className="absolute top-1 left-1 bg-black/70 rounded-full p-[2px] z-20">
              <FaSpotify size={16} className="text-green-500" />
            </div>
          </div>

          {/* Status Label */}
          <p className="text-[11px] text-gray-400 tracking-wide uppercase">
            {data.isPlaying ? "Now Playing" : "Last Played"}
          </p>
        </a>
      )}
    </motion.div>
  );
}