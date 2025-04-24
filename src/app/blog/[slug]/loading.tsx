"use client";

import { useMemo } from "react";

export default function Loading() {
  const messages = [
    "Even neurons need time to dream.",
    "Rendering thoughts into light...",
    "Tuning the frequencies of reason.",
    "Humming in the background of your mind.",
    "Awaiting a spark of inference...",
    "Polishing the pixels of perception.",
    "Rewiring short-term memory...",
    "Inhaling context, exhaling clarity.",
    "Shaping abstract into substance.",
    "Reactivating dormant synapses...",
    "Holding still until meaning forms."
  ];

  const quote = useMemo(() => {
    return messages[Math.floor(Math.random() * messages.length)];
  }, []);

  return (
    <div className="relative flex items-center justify-center min-h-screen overflow-hidden bg-black text-white">
      {/* GRID BACKGROUND */}
      <div className="absolute inset-0 z-0 opacity-5 bg-[linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:30px_30px]" />

      {/* FLICKERING GLOW BLOB */}
      <div className="absolute w-[600px] h-[600px] bg-gradient-to-tr from-cyan-500 via-blue-500 to-indigo-500 rounded-full blur-3xl opacity-20 animate-pulse" />

      {/* SYNAPSE PULSES */}
      <div className="absolute top-1/3 left-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-50" />
      <div className="absolute bottom-1/4 right-1/3 w-2 h-2 bg-blue-500 rounded-full animate-ping opacity-50" />
      <div className="absolute top-1/2 right-[20%] w-2 h-2 bg-indigo-400 rounded-full animate-ping opacity-50" />

      <div className="absolute bottom-1/3 right-1/4 w-2 h-2 bg-cyan-400 rounded-full animate-ping opacity-50" />
      <div className="absolute top-1/4 left-1/3 w-2 h-2 bg-blue-500 rounded-full animate-ping opacity-50" />
      <div className="absolute bottom-1/2 left-[20%] w-2 h-2 bg-indigo-400 rounded-full animate-ping opacity-50" />

      {/* CONTENT */}
      <div className="z-10 text-center space-y-6 px-6">
        <h2 className="text-3xl sm:text-4xl font-bold bg-black/70 bg-clip-text text-transparent bg-gradient-to-r from-cyan-300 to-indigo-500">
          {quote}
        </h2>
      </div>
    </div>
  );
}