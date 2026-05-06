"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";

const certifications = [
  {
    title: "Product Management Basics Certification",
    org: "Pendo.io",
    logo: "/images/certs/pendo.jpg",
    description:
      "Fundamentals of the product manager role, including best practices through the lens of the Product Management Life Cycle.",
    link: "https://www.credly.com/badges/4487f8f5-5dbc-4b53-a796-bf20b2a921c6/public_url",
  },
  {
    title: "Introduction to Cybersecurity",
    org: "Cisco Networking Academy",
    logo: "/images/certs/cisco.png",
    description:
      "Foundational course covering cybersecurity principles, confidentiality, integrity, threat types, and network defense.",
    link: "https://drive.google.com/file/d/1yc78Pu6DBOciSIdtRf6MM5mVyfneYhQS/view?usp=drive_link",
  },
  {
    title: "Ethical Hacker",
    org: "Cisco Networking Academy",
    logo: "/images/certs/cisco.png",
    description:
      "Basics of ethical hacking practices including footprinting, scanning, enumeration, and vulnerabilities.",
    link: "https://drive.google.com/file/d/10C6TIxnw5FMi_0pqVfJQh2vctoMOrnH4/view?usp=sharing",
  },
  {
    title: "Cybersecurity Essentials",
    org: "Cisco Networking Academy",
    logo: "/images/certs/cisco.png",
    description:
      "Intermediate course focusing on access control, firewalls, cryptography, risk management, and endpoint security.",
    link: "https://drive.google.com/file/d/1gUndmMjqSytNO-K12F0Qi8FI-pubUI49/view?usp=drive_link",
  },
  {
    title: "IBM Xlence Advocate",
    org: "IBM",
    logo: "/images/certs/ibm.png",
    description:
      "Internal recognition for cross-team collaboration, technical leadership, and advocacy within IBM's X-Force and SIEM divisions.",
    link: "https://www.credly.com/badges/7b413a86-fb75-4254-aa15-7501b0299136",
  },
  {
    title: "IBM Agile Explorer",
    org: "IBM",
    logo: "/images/certs/ibm.png",
    description:
      "Covers agile values, ceremonies, artifacts, and mindset with IBM's real-world project application.",
    link: "https://www.credly.com/badges/c1e1cf63-3056-4cac-bd25-7d45d8cd6a57",
  },
  {
    title: "Responsive Web Design",
    org: "FreeCodeCamp",
    logo: "/images/certs/freecodecamp.png",
    description:
      "Comprehensive HTML, CSS, Flexbox, and Grid projects demonstrating mobile-first, responsive design.",
    link: "https://www.freecodecamp.org/certification/jrap-bit/responsive-web-design",
  },
  {
    title: "JavaScript Algorithms and Data Structures",
    org: "FreeCodeCamp",
    logo: "/images/certs/freecodecamp.png",
    description:
      "JS fundamentals, ES6+, recursion, regex, and multiple algorithm challenges + projects.",
    link: "https://www.freecodecamp.org/certification/jrap-bit/javascript-algorithms-and-data-structures",
  },
  {
    title: "Network Support and Security",
    org: "Cisco Networking Academy",
    logo: "/images/certs/cisco.png",
    description:
      "Network topologies, troubleshooting, device configuration, and security enforcement best practices.",
    link: "https://drive.google.com/file/d/1UDPR8CgZCJK9B3upXUcwC30lzYp9FXiY/view?usp=drive_link",
  },
];

function CertCard({
  title,
  org,
  logo,
  description,
  link,
}: (typeof certifications)[number]) {
  // On mobile, cards are tap-to-reveal. On desktop, hover is used via CSS.
  const [tapped, setTapped] = useState(false);

  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      // Stop the tap toggle from immediately navigating; only navigate on second tap / direct click
      onClick={(e) => {
        // On touch devices, first tap reveals details. The link opens normally on second tap.
        if (typeof window !== "undefined" && window.matchMedia("(pointer: coarse)").matches && !tapped) {
          e.preventDefault();
          setTapped(true);
        }
      }}
      onBlur={() => setTapped(false)}
      className={`group relative shrink-0 w-[300px] md:w-[380px] mx-3 rounded-2xl border overflow-hidden flex flex-col gap-4 transition-all duration-300 cursor-pointer select-none
        ${tapped
          ? "border-cyan-500/60 bg-white/15 shadow-[0_0_24px_rgba(34,211,238,0.18)]"
          : "border-white/20 bg-white/10 backdrop-blur-md hover:border-cyan-500/40 hover:bg-white/15 hover:shadow-[0_0_24px_rgba(34,211,238,0.12)]"
        }`}
    >
      {/* Always-visible header */}
      <div className="px-6 pt-5 flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500/30 to-indigo-500/30 flex items-center justify-center border border-white/20">
          <Image
            src={logo}
            alt={org}
            width={40}
            height={40}
            className="w-full h-full object-contain p-1"
          />
        </div>
        <div className="min-w-0">
          <h3 className="text-sm font-semibold leading-snug bg-gradient-to-r from-cyan-300 to-indigo-300 bg-clip-text text-transparent truncate">
            {title}
          </h3>
          <p className="text-xs text-white/60 mt-0.5">{org}</p>
        </div>
      </div>

      {/* Description — always visible but fades to full opacity on hover/tap */}
      <div className="px-6 pb-5 flex flex-col gap-3 flex-grow">
        <p className={`text-xs leading-relaxed line-clamp-3 transition-colors duration-300
          ${tapped ? "text-white/90" : "text-white/70 group-hover:text-white/90"}`}>
          {description}
        </p>

        {/* Footer CTA */}
        <div className={`mt-auto flex items-center gap-1 text-xs transition-colors duration-300
          ${tapped ? "text-cyan-400" : "text-cyan-400/60 group-hover:text-cyan-400"}`}>
          <span>View credential</span>
          <span className={`transition-transform duration-300 ${tapped ? "translate-x-1" : "translate-x-0 group-hover:translate-x-1"}`}>
            →
          </span>
        </div>
      </div>

      {/* Mobile tap indicator badge */}
      <AnimatePresence>
        {!tapped && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="absolute top-3 right-3 md:hidden bg-white/10 rounded-full px-2 py-0.5 text-[10px] text-white/50 border border-white/10"
          >
            tap
          </motion.div>
        )}
      </AnimatePresence>
    </a>
  );
}

export default function CertificationsSection() {
  const doubled = [...certifications, ...certifications];

  return (
    <section
      id="certifications"
      className="w-full py-20 text-white relative overflow-hidden"
    >
      {/* Section heading */}
      <motion.h2
        className="text-3xl md:text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-400"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Certifications &amp; Achievements
      </motion.h2>

      {/* Desktop: seamless marquee */}
      <div
        className="pause-on-hover relative overflow-hidden hidden md:block"
        style={{
          maskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          WebkitMaskImage:
            "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="animate-marquee flex w-max">
          {doubled.map((cert, idx) => (
            <CertCard key={`${cert.title}-${idx}`} {...cert} />
          ))}
        </div>
      </div>

      {/* Mobile: responsive grid — no carousel, no hover required */}
      <div className="md:hidden grid grid-cols-1 sm:grid-cols-2 gap-4 px-2">
        {certifications.map((cert) => (
          <CertCard key={cert.title} {...cert} />
        ))}
      </div>

      {/* Hint text — different message per device */}
      <p className="mt-6 text-center text-xs text-white/25 tracking-widest uppercase select-none hidden md:block">
        Hover to pause · Click to view
      </p>
      <p className="mt-6 text-center text-xs text-white/25 tracking-widest uppercase select-none md:hidden">
        Tap to reveal · Tap again to view
      </p>
    </section>
  );
}