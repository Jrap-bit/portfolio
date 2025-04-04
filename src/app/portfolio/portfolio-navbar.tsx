"use client";

import { useEffect, useRef, useState } from "react";

export default function PortfolioNavbar() {
  const [showNav, setShowNav] = useState(false);
  const heroRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    const hero = document.querySelector("section.snap-start");
    if (hero) {
      heroRef.current = hero as HTMLElement;

      const observer = new IntersectionObserver(
        ([entry]) => {
          setShowNav(!entry?.isIntersecting);
        },
        {
          threshold: 0.5,
        }
      );

      observer.observe(heroRef.current);

      return () => {
        if (heroRef.current) observer.unobserve(heroRef.current);
      };
    }
  }, []);

  return (
    <div
      className={`md:hidden fixed top-0 left-0 w-full z-50 px-6 md:px-12 py-4 transition-all duration-500 flex items-center justify-between ${
        showNav
          ? "opacity-100 backdrop-blur-md bg-black/70 border-b border-white/10"
          : "opacity-0 pointer-events-none"
      }`}
    >
      {/* Left - Avatar + Name */}
      <a href="#Hero" rel="noreferrer">
      <div className="flex items-center gap-4">
        <img
          src="/images/real.jpg"
          alt="Parjanya"
          className="w-10 h-10 rounded-full object-cover"
        />
        <span className="text-white font-semibold text-lg">
          Parjanya Pandey
        </span>
      </div>
      </a>

      {/* Right - Buttons */}
      <div className="flex gap-4 text-sm text-white">
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
  );
}