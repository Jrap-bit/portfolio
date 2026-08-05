"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaSpotify } from "react-icons/fa";

type NowPlaying = {
  isPlaying: boolean;
  title: string;
  artist: string;
  album: string;
  albumImageUrl: string | null;
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
        const nowPlaying = (await res.json()) as Partial<NowPlaying> & {
          error?: string;
        };

        if (res.ok && nowPlaying.title) {
          setData(nowPlaying as NowPlaying);
        } else {
          const fallbackRes = await fetch("/api/spotify/recently-played");
          const lastPlayed =
            (await fallbackRes.json()) as Partial<NowPlaying> & {
              error?: string;
            };

          if (!fallbackRes.ok || !lastPlayed.title) {
            throw new Error(
              lastPlayed.error ?? "No Spotify track is available",
            );
          }

          setData(lastPlayed as NowPlaying);
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
      className="group relative col-span-1 row-span-2 overflow-hidden rounded-2xl border border-white/10 bg-black/60 p-5 text-white shadow-inner backdrop-blur-md transition-all duration-300"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ scale: 1.03 }}
      transition={{ duration: 0.01 }}
    >
      {/* Hover Glow */}
      <div className="pointer-events-none absolute inset-0 z-0 opacity-0 blur-2xl transition duration-300 group-hover:opacity-100">
        <div className="absolute -top-6 -left-8 h-40 w-40 rounded-full bg-green-400/20" />
        <div className="absolute -right-10 bottom-2 h-40 w-40 rounded-full bg-green-400/10" />
      </div>

      {/* Heading */}
      <h3 className="relative z-10 mb-3 flex items-center gap-2 bg-gradient-to-r from-green-400 to-emerald-300 bg-clip-text text-lg font-bold text-transparent">
        <FaSpotify className="text-green-400" />
        Currently Listening
      </h3>

      {loading ? (
        <p className="relative z-10 text-xs text-neutral-400">
          Loading track...
        </p>
      ) : !data ? (
        <p className="relative z-10 text-xs text-neutral-400">
          No track available
        </p>
      ) : (
        <a
          href={data.songUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="relative z-10 flex h-full w-full flex-col items-center justify-between gap-4 text-center"
        >
          {/* Track Info */}
          <div>
            <h4 className="text-base font-medium text-white">{data.title}</h4>
            <p className="text-sm text-gray-300">{data.artist}</p>
            <p className="mt-1 text-xs text-gray-500">{data.album}</p>
          </div>

          {/* Album Art with Pulse Ring if Playing */}
          <div className="relative">
            {data.isPlaying && (
              <motion.div
                className="absolute inset-0 h-36 w-36 rounded-full border-2 border-green-400 opacity-50"
                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.2, 0.5] }}
                transition={{ duration: 1.5, repeat: Infinity }}
              />
            )}

            {data.albumImageUrl ? (
              <img
                src={data.albumImageUrl}
                alt={`${data.album} album cover`}
                className="relative z-10 h-32 w-32 rounded-xl object-cover shadow-md"
              />
            ) : (
              <div className="relative z-10 flex h-32 w-32 items-center justify-center rounded-xl bg-white/5 text-green-400">
                <FaSpotify size={48} />
              </div>
            )}

            {/* Spotify Logo Overlay */}
            <div className="absolute top-1 left-1 z-20 rounded-full bg-black/70 p-[2px]">
              <FaSpotify size={16} className="text-green-500" />
            </div>
          </div>

          {/* Status Label */}
          <p className="text-[11px] tracking-wide text-gray-400 uppercase">
            {data.isPlaying ? "Now Playing" : "Last Played"}
          </p>
        </a>
      )}
    </motion.div>
  );
}
