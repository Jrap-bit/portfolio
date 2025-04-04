"use client";

import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import dynamic from "next/dynamic";

const VantaNetBackground = dynamic(() => import("~/app/_components/VantaNetBackground"), {
  ssr: false,
});
const VantaFogBackground = dynamic(() => import("~/app/_components/VantaFogBackground"), {
  ssr: false,
});

export default function Home() {
  const router = useRouter();

  return (
    <main className="flex h-screen w-screen font-semibold text-white overflow-hidden">
      {/* Left - Portfolio */}
      <motion.div
        className="group relative flex items-center justify-center w-1/2 h-full overflow-hidden hover:w-[62.5%] transition-all duration-500 ease-in-out cursor-pointer"
        onClick={() => router.push("/portfolio")}
      >
        {/* Vanta background */}
        <div className="absolute inset-0 z-0">
          <VantaNetBackground />
        </div>

        {/* Gradient overlay above Vanta */}
        <div className="absolute inset-0 z-10 bg-gradient-to-br from-[#0f172a] via-[#1e3a8a] to-[#3b82f6] opacity-80" />

        {/* Hover overlay */}
        <div className="absolute inset-0 z-20 bg-black/20 group-hover:bg-black/10 transition duration-500" />

        {/* Text content */}
        <div className="relative z-30 text-center px-4">
          <h1 className="text-3xl md:text-6xl mb-4 tracking-tight group-hover:tracking-normal transition-all duration-500">
            What I’ve Been Up To
          </h1>
          <p className="text-xs md:text-lg opacity-90">
            A portfolio grounded in curiosity, precision, and intent.
          </p>
        </div>
      </motion.div>

      {/* Divider */}
      <div className="w-[2px] bg-white/100 blur-8px opacity-100 backdrop-blur-md z-20 pointer-events-none rounded-full" />

      {/* Right - Blog */}
      <motion.div
        className="group relative flex items-center justify-center w-1/2 h-full overflow-hidden hover:w-[62.5%] transition-all duration-500 ease-in-out cursor-pointer"
        onClick={() => router.push("/blog")}
      >
        {/* Vanta background */}
        <div className="absolute inset-0 z-0">
          <VantaFogBackground />
        </div>

        {/* Gradient overlay above Vanta */}
        <div className="absolute inset-0 z-10 bg-gradient-to-bl from-[#350a5c] via-[#9958da] to-[#ff61b3] opacity-70" />

        {/* Hover overlay */}
        <div className="absolute inset-0 z-20 bg-black/20 group-hover:bg-black/5 transition duration-500" />

        {/* Text content */}
        <div className="relative z-100 text-center px-4 text-white">
          <h1 className="text-3xl md:text-6xl mb-4 tracking-tight group-hover:tracking-normal transition-all duration-500">
            Thoughts That Don’t Sit Still
          </h1>
          <p className="text-xs md:text-lg opacity-90">
            Not everything needs a deadline
          </p>
        </div>
      </motion.div>
    </main>
  );
}