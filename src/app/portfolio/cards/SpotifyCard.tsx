import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import { FaCheckCircle, FaEllipsisH, FaSpotify, FaFilm, FaCompass, FaQuoteLeft } from "react-icons/fa";

export const SpotifyCard = () => {
    const [track, setTrack] = useState({
      name: "Placeholder Song",
      artist: "Artist Name",
      image: "/images/anime.png", // fallback
    });
  
    // Later: Replace this with Spotify API call
    useEffect(() => {
      // fetchSpotifyLastPlayed().then(setTrack);
    }, []);
  
    return (
      <motion.div
        className="col-span-1 row-span-2 rounded-2xl bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-6 backdrop-blur-md border border-white/10 shadow-lg text-white"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-cyan-300 text-sm font-semibold mb-3">🎧 Listening To</h3>
        <div className="w-full h-40 rounded-lg overflow-hidden mb-3">
          <Image
            src={track.image}
            alt="Cover Art"
            width={300}
            height={300}
            className="w-full h-full object-cover"
          />
        </div>
        <p className="text-sm font-medium">{track.name}</p>
        <p className="text-xs text-neutral-400">{track.artist}</p>
      </motion.div>
    );
  };