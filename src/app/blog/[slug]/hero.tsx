"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import Image from "next/image";
import { format } from "date-fns";
import { FiClock, FiCalendar, FiChevronDown } from "react-icons/fi";
import { useRef, useState, useEffect } from "react";

interface BlogHeroProps {
  title: string;
  date: string | null;
  excerpt: string;
  coverImage: string | null;
  readTime: number;
  wordCount: number;
}

export default function BlogHero({
  title,
  date,
  excerpt,
  coverImage,
  readTime,
  wordCount,
}: BlogHeroProps) {
  const formattedDate = date
    ? format(new Date(date), "MMMM d, yyyy")
    : "No date available";
    
  const contentRef = useRef<HTMLDivElement>(null);
  const heroRef = useRef<HTMLDivElement>(null);
  const [parallaxValues, setParallaxValues] = useState({ x: 0, y: 0 });
  
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 500], [0, 150]);
  const opacity = useTransform(scrollY, [0, 300], [1, 0]);
  
  const scrollToContent = () => {
    if (contentRef.current) {
      contentRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <div className="relative w-full" ref={heroRef}>
      <div className="relative">
        {/* Cover Image with Parallax */}
        <motion.div 
          className="relative w-full h-[70vh] md:h-[80vh] overflow-hidden"
          style={{ y }}
        >
          {coverImage ? (
            <div className="relative w-full h-full">
              <motion.div
                className="absolute inset-0"
                style={{ 
                  x: parallaxValues.x * 2,
                  y: parallaxValues.y * 2,
                  scale: 1.1
                }}
              >
                <Image
                  src={coverImage}
                  alt={title}
                  fill
                  priority
                  className="object-cover transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 80vw, 70vw"
                />
              </motion.div>
              {/* Dark overlay with gradient */}
              <div className="absolute inset-0 bg-gradient-to-b from-black/100 via-black/1000 to-black/100" />
              {/* Color accents */}
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.2)_0%,transparent_90%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.2)_0%,transparent_90%)]" />
            </div>
          ) : (
            <div className="w-full h-full bg-gradient-to-br from-black-500 to-black">
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.2)_0%,transparent_90%)]" />
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(0,0,0,0.2)_0%,transparent_90%)]" />
            </div>
          )}

          {/* Content */}
          <motion.div 
            className="absolute inset-0 flex items-end justify-center"
            style={{ opacity }}
          >
            <div className="max-w-3xl mx-auto px-4 pb-16 text-center">
              <motion.div
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
                className="mb-8"
              >
                <a
                  href="/blog"
                  className="inline-block text-sm uppercase tracking-widest text-white transition-colors group"
                >
                  <motion.span
                    className="font-semibold italic inline-block"
                    animate={{
                      textShadow: [
                        "0 0 0px rgba(255,255,255,0)",
                        "0 0 12px rgba(255,255,255,0.7)",
                        "0 0 0px rgba(255,255,255,0)"
                      ],
                      scale: [1, 1, 1],
                      color: ["#ffffff", "#ffffff", "#ffffff"]
                    }}
                    transition={{
                      duration: 4,
                      repeat: Infinity,
                      repeatType: "reverse",
                      ease: "easeInOut"
                    }}
                    whileHover={{
                      scale: 1.15,
                      textShadow: "0 0 15px rgba(255,255,255,0.8)",
                      transition: {
                        duration: 0.2,
                        ease: "easeOut"
                      }
                    }}
                    whileTap={{ scale: 0.95 }}
                  >
                    From the Ephemeris
                  </motion.span>
                </a>
              </motion.div>

              <motion.h1 
                className="text-3xl md:text-6xl font-bold mb-4 bg-gradient-to-b from-white to-gray-300 bg-clip-text text-transparent"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5 }}
              >
                {title}
              </motion.h1>
              
              <motion.div 
                className="flex items-center justify-center space-x-4 mb-6 text-neutral-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <div className="flex items-center">
                  <span>{wordCount} words</span>
                </div>
                <div className="h-4 w-4 bg-white rounded-full" />
                <div className="flex items-center">
                  <FiClock className="mr-2" />
                  <span>{readTime} min read</span>
                </div>
              </motion.div>

              <motion.div 
                className="flex items-center justify-center space-x-4 mb-6 text-neutral-100"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <FiCalendar className="mr-2" />
                {formattedDate}
              </motion.div>
              
              <motion.p 
                className="text-lg text-neutral-100 max-w-2xl mx-auto"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                {excerpt}
              </motion.p>
            </div>
          </motion.div>
        </motion.div>

        {/* Scroll to read button in a separate section */}
        <div className="bg-black">
          <motion.div 
            className="text-center py-8"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5, delay: 0.5 }}
          >
            <button 
              onClick={scrollToContent}
              className="inline-flex flex-col items-center text-neutral-400 hover:text-white transition-colors"
            >
              <span className="mb-2">Scroll to read</span>
              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ repeat: Infinity, duration: 1.5 }}
              >
                <FiChevronDown size={24} />
              </motion.div>
            </button>
          </motion.div>
        </div>
      </div>

      {/* Scroll indicator */}
      <div ref={contentRef} className="h-0" />
    </div>
  );
}
