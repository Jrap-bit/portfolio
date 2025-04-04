"use client";

import { useEffect, useRef, useState } from "react";
import { motion, useAnimation, useInView } from "framer-motion";
import { HeroHighlight, Highlight } from "~/components/ui/hero-highlight";
import FancyText from "~/app/portfolio/Fancytext";
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
        <div className="h-6 md:h-10" /> 

{/* Back to Portal Button — Responsive */}
<a
  href="/"
  className="absolute top-6 left-6 z-50 hidden md:flex px-5 py-2 rounded-full text-white font-semibold text-sm md:text-base
             bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600
             shadow-[0_0_3px_1px_rgba(59,130,246,0.5)]
             hover:scale-105 hover:shadow-[0_0_10px_5px_rgba(59,130,246,0.7)]
             transition-all duration-300 ease-in-out"
>
  ⭠ Back to Portal
</a>

{/* Mobile: Minimal Icon Button */}
<a
  href="/"
  className="md:hidden absolute top-4 left-4 z-50 p-2 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600
             shadow-[0_0_3px_1px_rgba(59,130,246,0.5)]
             hover:scale-105 hover:shadow-[0_0_10px_5px_rgba(59,130,246,0.7)]
             transition-all duration-300 ease-in-out"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none"
       viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
  </svg>
</a>
        
        {/* Image Block */}
        <motion.div
  onMouseEnter={() => !isMobile && setIsHovered(true)}
  onMouseLeave={() => !isMobile && setIsHovered(false)}
  onClick={handleImageToggle}
  variants={{
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  }}
  className={`group -mt-20 md:mt-0 mx-10 md:mr-23 relative w-[280px] h-[400px] md:w-[420px] md:h-[600px] rounded-4xl overflow-hidden ${isHovered ? "shadow-[0px_0px_130px_#00b8dbcc]" :"shadow-[0px_0px_80px_#38bdf8aa]"} border border-white/20 transition-all duration-500 cursor-default`
  }>

    
  <motion.img
    src="/images/real.jpg"
    alt="Parjanya"
    className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-200 ${
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
        <div className="flex flex-col items-center md:items-start text-center md:text-left max-w-xl space-y-7">
        <motion.h1
  variants={{
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  }}
  className="text-center md:text-left text-5xl md:text-6xl font-bold leading-tight space-y-1"
>
  <span className="block text-xl md:text-3xl text-white/70 mb-1">
    Hey! I'm
  </span>
  <FancyText
    text="Parjanya Pandey"
    className="text-5xl md:text-6xl font-bold text-white"
  />
</motion.h1>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-base md:text-xl text-muted-foreground"
          >
            <Highlight className="text-black md:text-center mb-10 leading-loose dark:text-white text-center">
            Building secure digital experiences
            </Highlight>
            <br/>
            <Highlight className="text-black md:text-center leading-8 dark:text-white text-center">
            at the intersection of product and code
            </Highlight>
          </motion.p>

          <motion.p
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="text-sm md:text-base text-neutral-100"
          >
            I’m a developer turned product thinker, working across cybersecurity, software, and web development. I enjoy crafting intuitive systems — where user needs, clean code, and sharp design all come together.

          </motion.p>

          {isHovered && (
  <motion.div
    initial={{ opacity: 0, scale: 0.85, y: 10 }}
    animate={{ opacity: 1, scale: 1, y: 0 }}
    transition={{ type: "spring", stiffness: 200, damping: 18 }}
    className="
      relative inline-block mt-4 py-3 px-6 rounded-xl overflow-hidden
      bg-gradient-to-br from-cyan-500 via-blue-600 to-indigo-700
      shadow-[0_0_10px_#3b82f6aa] border border-blue-300/20
      text-white font-semibold text-base md:text-lg
      backdrop-blur-md select-none
    "
  >
    <span className="relative z-10 tracking-wide">
      ✦ Domain Expansion: Limitless Productivity ✦
    </span>

    {/* Animated Neon Overlay */}
    <motion.div
      initial={{ x: "-120%" }}
      animate={{ x: ["-120%", "120%"] }}
      transition={{ repeat: Infinity, duration: 1.3, ease: "easeInOut" }}
      className="
        absolute inset-0 bg-gradient-to-r
        from-transparent via-white/40 to-transparent
        opacity-90 blur-2xl
      "
    />
  </motion.div>
)}

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className={`flex flex-wrap gap-4 ${isHovered ? "pt-4 mt-3" : "pt-none"}`}
          >
            <Button className="px-6 py-2">Contact Me</Button>
            <a
              href="https://drive.google.com/file/d/1Ldv4SGamUgnLpv7WK74syVsKpBCW6u1I/view?usp=sharing"
              target="_blank"
              className="flex items-center justify-center"
              onClick={() => {
                // Handle the click event if needed
              }
              }
            >
            <Button variant="default" className="px-6 py-2">
              Download Resume
            </Button>
            </a>
          </motion.div>

          <motion.div
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            className="flex gap-6 pt-4 text-2xl text-white/80"
          >
            <a
              href="https://github.com/Jrap-bit"
              target="_blank"
              rel="noreferrer"
            >
              <FaGithub className="hover:text-white transition" />
            </a>
            <a
              href="https://linkedin.com/in/parjanyapandey"
              target="_blank"
              rel="noreferrer"
            >
              <FaLinkedin className="hover:text-white transition" />
            </a>
            
          </motion.div>
           {/* Scroll Down Button placed directly below the social icons */}
           {/* <div className="hidden md:flex pt-4">
            <a href="#about" className="group">
              <div className="px-6 py-3 rounded-2xl text-white font-medium text-base border border-white/30 bg-white/10 backdrop-blur-sm animate-pulse shadow-[0_0_5px_rgba(255,255,255,0.15)] hover:bg-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transition-all duration-300 ease-in-out">
                ↓ Explore Portfolio
              </div>
            </a>
          </div> */}
        </div>
        {/* Scroll Down Button */}
{/* Desktop: Centered scroll button */}
{/* <a
  href="#about"
  className="hidden md:flex absolute bottom-14 left-1/2 transform -translate-x-1/2 z-40 group"
>
  <div
    className="px-6 py-3 rounded-full text-white font-medium text-base
               border border-white/30 bg-white/10 backdrop-blur-sm
               animate-pulse shadow-[0_0_5px_rgba(255,255,255,0.15)]
               hover:bg-white/20 hover:shadow-[0_0_30px_rgba(255,255,255,0.3)]
               transition-all duration-300 ease-in-out"
  >
    ↓ Explore Portfolio
  </div>
</a> */}

{/* Mobile: Floating bottom-right scroll button */}
{/* <a
  href="#about"
  className="hidden md:hidden absolute bottom-20 right-6 z-40 p-3 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600
             shadow-[0_0_3px_1px_rgba(59,130,246,0.5)]
             hover:scale-105 hover:shadow-[0_0_10px_5px_rgba(59,130,246,0.7)]
             transition-all duration-300 ease-in-out"
>
  <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none"
       viewBox="0 0 24 24" stroke="currentColor">
    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 9l-7 7-7-7" />
  </svg>
</a> */}
      </motion.section>
    </>
  );
}