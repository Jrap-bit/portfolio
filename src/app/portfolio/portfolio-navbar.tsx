"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaGithub, FaLinkedin, FaFileAlt, FaBars } from "react-icons/fa";

const sections = [
  { id: "Hero", label: "Home" },
  { id: "about", label: "About" },
  { id: "tech", label: "Skills" },
  { id: "timeline", label: "Timeline" },
  { id: "certifications", label: "Certifications" },
  { id: "projects", label: "Projects" },
  { id: "contact", label: "Contact" },
];

export default function PortfolioNavbar() {
  const [showNav, setShowNav] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const hero = document.getElementById("Hero");
    if (hero) {
      heroRef.current = hero;
      const observer = new IntersectionObserver(
        ([entry]) => setShowNav(!entry?.isIntersecting),
        { threshold: 0.5 }
      );
      observer.observe(heroRef.current);
      return () => {
        if (heroRef.current) observer.unobserve(heroRef.current);
      };
    }
  }, []);

  // Function to handle navigation to a section
  const navigateToSection = (sectionId: string) => {
    // Close the menu first
    setMenuOpen(false);
    
    // Use setTimeout to ensure the menu is closed before scrolling
    setTimeout(() => {
      const section = document.getElementById(sectionId);
      if (section) {
        // Get the section's position
        const rect = section.getBoundingClientRect();
        const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
        const targetPosition = rect.top + scrollTop;
        
        // Scroll to the section
        window.scrollTo({
          top: targetPosition,
          behavior: 'smooth'
        });
      }
    }, 100);
  };

  return (
    <AnimatePresence>
      {showNav && (
        <motion.div
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -50, opacity: 0 }}
          transition={{ duration: 0.35 }}
          className="md:hidden fixed top-0 left-0 w-full z-50 px-6 py-4 bg-black/70 backdrop-blur-md border-b border-white/10 flex items-center justify-between"
        >
          {/* Hamburger Menu */}
          <button
            onClick={() => setMenuOpen((prev) => !prev)}
            aria-label="Menu"
            className="text-white text-xl active:scale-95 transition"
          >
            <FaBars />
          </button>

          {/* Right icons only */}
          <div className="flex items-center gap-5 text-white text-[1.25rem]">
            <a
              href="https://github.com/Jrap-bit"
              target="_blank"
              aria-label="GitHub"
              className="hover:text-blue-400 transition active:scale-95"
            >
              <FaGithub />
            </a>
            <a
              href="https://linkedin.com/in/parjanya"
              target="_blank"
              aria-label="LinkedIn"
              className="hover:text-blue-400 transition active:scale-95"
            >
              <FaLinkedin />
            </a>
            <a
              href="/Resources/cv.pdf"
              target="_blank"
              aria-label="Resume"
              className="hover:text-blue-400 transition active:scale-95"
            >
              <FaFileAlt />
            </a>
          </div>

          {/* Slide-down menu */}
          <AnimatePresence>
            {menuOpen && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: "auto", opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="absolute top-full left-0 w-full bg-black/80 backdrop-blur-md text-white text-sm font-medium border-t border-white/10"
              >
                <ul className="flex flex-col divide-y divide-white/10">
                  {sections.map((s) => (
                    <li key={s.id}>
                      <button
                        onClick={() => navigateToSection(s.id)}
                        className="block w-full px-6 py-4 hover:bg-white/10 transition text-left"
                      >
                        {s.label}
                      </button>
                    </li>
                  ))}
                </ul>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </AnimatePresence>
  );
}