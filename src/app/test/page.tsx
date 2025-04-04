"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { HeroHighlight, Highlight } from "~/components/ui/hero-highlight";
import { Button } from "~/components/ui/button";
import { FaGithub, FaLinkedin } from "react-icons/fa";

export default function Hero() {
  const [isHovered, setIsHovered] = useState(false);
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
  onMouseEnter={() => !isMobile && setIsHovered(true)}
  onMouseLeave={() => !isMobile && setIsHovered(false)}
  onClick={handleImageToggle}
  variants={{
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }}
  className="group relative w-[280px] h-[400px] rounded-3xl overflow-hidden shadow-[0_0_50px_#38bdf8aa] border border-white/10 transition-all duration-500 cursor-pointer"
>
  <motion.img
    src="/images/real.jpg"
    alt="Parjanya"
    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
      isHovered ? "opacity-0" : "opacity-100"
    }`}
  />
  <motion.img
    src="/images/anime.png"
    alt="Anime Parjanya"
    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-500 ${
      isHovered ? "opacity-100" : "opacity-0"
    }`}
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