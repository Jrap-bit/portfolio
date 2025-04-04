"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { HeroHighlight, Highlight } from "~/components/ui/hero-highlight";
import { Button } from "~/components/ui/button";
import { FaGithub, FaLinkedin } from "react-icons/fa";

function useSupportsHover() {
  const [supportsHover, setSupportsHover] = useState(false);

  useEffect(() => {
    const mql = window.matchMedia("(hover: hover)");
    setSupportsHover(mql.matches);

    function handleChange(e: MediaQueryListEvent) {
      setSupportsHover(e.matches);
    }

    // Newer browsers: addEventListener; older might need addListener
    mql.addEventListener("change", handleChange);
    return () => {
      mql.removeEventListener("change", handleChange);
    };
  }, []);

  return supportsHover;
}

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
  const supportsHover = useSupportsHover();
  const [isMobile, setIsMobile] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => window.removeEventListener("resize", checkMobile);
  }, []);
  
  const handleImageToggle = () => {
    if (isMobile) {
      setIsHovered((prev) => !prev);
    }
  };

  const heroRef = useRef(null);
  const controls = useAnimation();
  const isInView = useInView(heroRef, { amount: 0.4 });

  // Track scroll state for header transition
  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY > 120) {
        setScrolled(true);
      } else {
        setScrolled(false);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Trigger animations on in-view
  useEffect(() => {
    if (isInView) controls.start("visible");
  }, [isInView, controls]);

  const handleMouseEnter = supportsHover ? () => setIsHovered(true) : undefined;
  const handleMouseLeave = supportsHover ? () => setIsHovered(false) : undefined;
  const handleClick = () => setIsHovered((prev) => !prev);

  return (
    <>
      {/* Sticky Mini Header */}
      <motion.div
        className={`fixed top-0 left-0 w-full px-6 md:px-12 py-4 z-50 transition-all duration-500 ${
          scrolled ? "backdrop-blur-sm bg-black/60 border-b border-white/10" : "pointer-events-none"
        }`}
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: scrolled ? 1 : 0, y: scrolled ? 0 : -20 }}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto">
          {/* Avatar + Name */}
          <div className="flex items-center gap-4">
            <img
              src="/images/real.jpg"
              alt="Parjanya"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-white font-semibold text-lg">Parjanya Pandey</span>
          </div>

          {/* Buttons */}
          <div className="flex gap-4 text-white text-sm">
            <a
              href="https://github.com/parjanya"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              GitHub
            </a>
            <a
              href="https://linkedin.com/in/parjanya"
              target="_blank"
              rel="noreferrer"
              className="hover:underline"
            >
              LinkedIn
            </a>
            <a href="/resume.pdf" target="_blank" className="hover:underline">
              Resume
            </a>
          </div>
        </div>
      </motion.div>

      {/* Back to Portal Button — Desktop */}
      <a
          href="/"
          className="absolute top-8 left-6 z-50 hidden md:flex px-5 py-2 rounded-full text-white font-semibold text-sm md:text-base
                     bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600
                     shadow-[0_0_3px_1px_rgba(59,130,246,0.5)]
                     hover:scale-105 hover:shadow-[0_0_10px_5px_rgba(59,130,246,0.7)]
                     transition-all duration-300 ease-in-out"
        >
          ⭠ Back to Portal
        </a>

        {/* Back to Portal Button — Mobile (Minimal Icon) */}
        <a
          href="/"
          className="md:hidden absolute top-6 left-4 z-50 p-2 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600
                     shadow-[0_0_3px_1px_rgba(59,130,246,0.5)]
                     hover:scale-105 hover:shadow-[0_0_10px_5px_rgba(59,130,246,0.7)]
                     transition-all duration-300 ease-in-out"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
          </svg>
        </a>

      {/* Full Hero Section */}
      <motion.section
        ref={heroRef}
        initial="hidden"
        animate={controls}
        variants={{
          hidden: {},
          visible: {
            transition: { staggerChildren: 0.15 },
          },
        }}
        className="w-full min-h-screen flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-12 py-10 relative"
      >
  {/* Image Block */}
  <motion.div
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
            onClick={handleClick}
            variants={{
              hidden: { opacity: 0, y: 30 },
              visible: { opacity: 1, y: 0 },
            }}
            className={`group relative w-[280px] h-[400px] md:w-[320px] md:h-[450px] 
                        rounded-3xl md:rounded-4xl overflow-hidden border border-white/20 
                        transition-all duration-500 cursor-pointer
                        ${isHovered ? "shadow-[0px_0px_130px_#00b8dbcc]" : "shadow-[0px_0px_80px_#38bdf8aa]"} 
                        mx-auto md:mx-0 shrink-0`}
          >
            {/* "real" image */}
            <motion.img
              src="/images/real.jpg"
              alt="Parjanya"
              className={`absolute inset-0 w-full h-full object-cover object-center 
                          transition-opacity duration-200 
                          ${isHovered ? "opacity-0" : "opacity-100"}`}
            />
            {/* "anime" image */}
            <motion.img
              src="/images/anime.png"
              alt="Anime Parjanya"
              className={`absolute inset-0 w-full h-full object-cover object-center 
                          transition-opacity duration-500 
                          ${isHovered ? "opacity-100" : "opacity-0"}`}
            />
          </motion.div>

        {/* Text Side */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl space-y-4">
          <motion.h1
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-5xl md:text-6xl font-bold"
          >
            Parjanya Pandey
          </motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-lg md:text-xl text-muted-foreground"
          >
            <Highlight className="text-black dark:text-white">
            Product Manager | Engineer | Systems Thinker
            </Highlight>
          </motion.p>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-sm md:text-base text-muted-foreground"
          >
            I’m a builder at heart, curious about how systems interact — from
            products and platforms to people and pixels. I enjoy working on
            meaningful, user-centric ideas and exploring creative tech
            intersections.
          </motion.p>

          {isHovered && (
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="text-sm mt-2 rounded-lg px-4 py-2 bg-white/10 text-white backdrop-blur-sm border border-white/20 w-fit"
            >
              In another universe, I might just be a shonen protagonist.
            </motion.div>
          )}

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex flex-wrap gap-4 pt-4"
          >
            <Button className="px-6 py-2">View Projects</Button>
            <Button variant="secondary" className="px-6 py-2">
              Download Resume
            </Button>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex gap-6 pt-4 text-2xl text-white/80"
          >
            <a
              href="https://github.com/parjanya"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="hover:text-white transition" />
            </a>
            <a
              href="https://linkedin.com/in/parjanya"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className="hover:text-white transition" />
            </a>
          </motion.div>
        </div>
      </motion.section>
    </>
  );
}