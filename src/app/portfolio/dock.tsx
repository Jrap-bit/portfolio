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
  FaProjectDiagram,
  FaEnvelope
} from "react-icons/fa";

const sections = [
  { id: "Hero", icon: <FaUser />, label: "Home" },
  { id: "timeline", icon: <FaGraduationCap />, label: "Experience" },
  { id: "tech", icon: <FaCode />, label: "Skills" },
  { id: "certifications", icon: <FaCertificate />, label: "Certifications" },
  { id: "projects", icon: <FaProjectDiagram />, label: "Projects" },
  { id: "about", icon: <FaBriefcase />, label: "About" },
  { id: "contact", icon: <FaEnvelope />, label: "Contact" },
];

export default function Dock() {
  const [activeSection, setActiveSection] = useState<string>("");

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

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const linkStyle =
    "group relative flex items-center justify-center p-3 rounded-full transition-all duration-10 hover:scale-[1] hover:shadow-[0_0_10px_rgba(59,130,246,0.6)]";

  const tooltipStyle =
    "absolute right-full mr-3 text-sm font-medium whitespace-nowrap bg-black/80 text-white px-3 py-1 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-200";

  return (
    <div className="fixed right-4 top-1/2 transform -translate-y-1/2 z-50 hidden md:flex flex-col items-end space-y-3 bg-white/5 backdrop-blur-md p-3 rounded-2xl border border-white/10 shadow-lg">
      {sections.map((section) => (
        <motion.a
          key={section.id}
          href={`#${section.id}`}
          className={`${linkStyle} ${
            activeSection === section.id ? "bg-blue-500/80 text-white" : "text-white/70 hover:bg-white/10"
          }`}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className={tooltipStyle}>{section.label}</span>
          <span className="text-xl">{section.icon}</span>
        </motion.a>
      ))}

      <div className="w-full border-t border-white/20 my-2" />

      {[{
        href: "https://github.com/Jrap-bit",
        icon: <FaGithub />,
        label: "GitHub",
      }, {
        href: "https://linkedin.com/in/parjanyapandey",
        icon: <FaLinkedin />,
        label: "LinkedIn",
      }, {
        href: "/Resources/cv.pdf",
        icon: <FaFileAlt />,
        label: "Resume",
      }].map((link) => (
        <motion.a
          key={link.href}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`${linkStyle} text-white/70 hover:bg-white/10`}
          whileHover={{ scale: 1.3 }}
          whileTap={{ scale: 0.95 }}
        >
          <span className={tooltipStyle}>{link.label}</span>
          <span className="text-xl">{link.icon}</span>
        </motion.a>
      ))}
    </div>
  );
}
