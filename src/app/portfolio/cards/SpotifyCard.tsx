"use client";

import { useEffect, useState } from "react";

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

  useEffect(() => {
    fetch("/api/spotify/now-playing")
      .then((res) => res.json())
      .then((json) => {
        setData(json);
        setLoading(false);
      });
  }, []);

  if (loading) {
    return (
      <div className="rounded-xl p-4 bg-black/30 text-white text-sm animate-pulse">
        Loading Spotify...
      </div>
    );
  }

  if (!data || !data.isPlaying) {
    return (
      <div className="rounded-xl p-4 bg-black/30 text-white text-sm">
        Not playing anything right now.
      </div>
    );
  }

  return (
    <a
      href={data.songUrl}
      target="_blank"
      rel="noopener noreferrer"
      className="flex items-center gap-4 p-4 rounded-xl bg-gradient-to-br from-[#1DB954]/30 to-black/30 backdrop-blur-md transition hover:scale-[1.02]"
    >
      <img
        src={data.albumImageUrl}
        alt="Album cover"
        className="w-16 h-16 rounded-lg shadow-lg"
      />
      <div className="flex flex-col overflow-hidden">
        <p className="text-white font-semibold truncate">{data.title}</p>
        <p className="text-gray-300 text-sm truncate">{data.artist}</p>
        <p className="text-gray-500 text-xs truncate">{data.album}</p>
      </div>
    </a>
  );
}