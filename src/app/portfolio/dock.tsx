"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import {
  FaUser,
  FaCode,
  FaBriefcase,
  FaGraduationCap,
  FaGithub,
  FaLinkedin,
  FaFileAlt,
  FaCertificate,
  FaProjectDiagram
} from "react-icons/fa";

const sections = [
  { id: "Hero", icon: <FaUser />, label: "Home" },
  { id: "about", icon: <FaBriefcase />, label: "About" },
  { id: "tech", icon: <FaCode />, label: "Skills" },
  { id: "timeline", icon: <FaGraduationCap />, label: "Timeline" },
  { id: "certifications", icon: <FaCertificate />, label: "Certifications" },
  { id: "projects", label: "Projects", icon: <FaProjectDiagram /> },
];

const transitionProps = { type: "spring", stiffness: 300, damping: 20 };

export default function Dock() {
  const [activeSection, setActiveSection] = useState<string>("");

  // Track scroll position and update active section
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
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 space-y-4 hidden md:flex flex-col items-end bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-lg">
      {sections.map((section) => (
        <motion.a
          key={section.id}
          href={`#${section.id}`}
          className={`group relative flex items-center p-2 rounded-xl transition-all ${
            activeSection === section.id
              ? "bg-blue-500/80 text-white"
              : "text-white/70 hover:bg-white/10"
          }`}
        >
          <span className="absolute right-full mr-3 text-sm font-medium whitespace-nowrap bg-black/80 text-white px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
            {section.label}
          </span>
          <span className="text-lg">{section.icon}</span>
        </motion.a>
      ))}

      {/* Divider between section links and external links */}
      <div className="w-full border-t border-white/20 my-2" />

      {/* External Links */}
      <motion.a
        href="https://github.com/Jrap-bit"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center p-2 rounded-xl transition-all text-white/70 hover:bg-white/10"
      >
        <span className="absolute right-full mr-3 text-sm font-medium whitespace-nowrap bg-black/80 text-white px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          GitHub
        </span>
        <span className="text-lg"><FaGithub /></span>
      </motion.a>
      <motion.a
        href="https://linkedin.com/in/parjanyapandey"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center p-2 rounded-xl transition-all text-white/70 hover:bg-white/10"
      >
        <span className="absolute right-full mr-3 text-sm font-medium whitespace-nowrap bg-black/80 text-white px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          LinkedIn
        </span>
        <span className="text-lg"><FaLinkedin /></span>
      </motion.a>
      <motion.a
        href="/Resources/cv.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="group relative flex items-center p-2 rounded-xl transition-all text-white/70 hover:bg-white/10"
      >
        <span className="absolute right-full mr-3 text-sm font-medium whitespace-nowrap bg-black/80 text-white px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200">
          Resume
        </span>
        <span className="text-lg"><FaFileAlt /></span>
      </motion.a>
    </div>
  );
}