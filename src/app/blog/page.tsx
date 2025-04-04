"use client";

import { useRouter } from "next/navigation";
import { TypewriterEffectSmooth } from "~/components/ui/typewriter-effect";

export default function BlogPage() {
  const router = useRouter();
  const words = [
    { text: "The" },
    { text: "Blog" },
    { text: "Is" },
    { text: "In" },
    {
      text: "Progress.",
      className: "text-blue-500 dark:text-blue-500",
    },
  ];

  return (
    <div className="flex flex-col items-center justify-center h-[40rem]">

<a
          href="/"
          className="absolute top-6 left-6 z-50 px-5 py-2 rounded-full text-white font-semibold text-sm md:text-base
                     bg-gradient-to-br from-purple-700 to-indigo-600
                     shadow-[0_0_20px_4px_rgba(139,92,246,0.6)]
                     hover:scale-105 hover:shadow-[0_0_25px_6px_rgba(139,92,246,0.8)]
                     transition-all duration-300 ease-in-out"
        >
          ⭠ Back to Portal
        </a>
    
      <TypewriterEffectSmooth words={words} />
      <div className="flex flex-col md:flex-row space-y-4 md:space-y-0 space-x-0 md:space-x-4">

      </div>
    </div>
  );
}