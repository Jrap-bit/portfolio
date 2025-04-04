"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { FaUser, FaCode, FaBriefcase, FaGraduationCap } from "react-icons/fa";

const sections = [
  { id: "Hero", icon: <FaUser />, label: "Home" },
  { id: "about", icon: <FaBriefcase />, label: "About" },
  { id: "tech", icon: <FaCode />, label: "Skills" },
  { id: "timeline", icon: <FaGraduationCap />, label: "Timeline" },
];

export default function Dock() {
  const [activeSection, setActiveSection] = useState<string>("");

  // Track scroll position and update active
  useEffect(() => {
    const handleScroll = () => {
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          if (rect.top <= window.innerHeight / 2 && rect.bottom >= window.innerHeight / 2) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };

    handleScroll(); // on load
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 space-y-4 hidden md:flex flex-col items-center bg-white/5 backdrop-blur-md p-2 rounded-2xl border border-white/10 shadow-lg">
      {sections.map((section) => (
        <a
          key={section.id}
          href={`#${section.id}`}
          className={`group relative p-3 rounded-full transition-all ${
            activeSection === section.id
              ? "bg-blue-500 text-white"
              : "text-white/70 hover:bg-white/10"
          }`}
        >
          {section.icon}
          <span className="absolute right-full mr-3 opacity-0 group-hover:opacity-100 transition text-xs whitespace-nowrap bg-black text-white rounded px-2 py-1">
            {section.label}
          </span>
        </a>
      ))}
    </div>
  );
}