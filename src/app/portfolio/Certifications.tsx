"use client";

import { motion } from "framer-motion";
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
  return (
    <a
      href={link}
      target="_blank"
      rel="noopener noreferrer"
      className="group shrink-0 w-[300px] md:w-[380px] mx-3 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-md px-6 py-5 flex flex-col gap-4 transition-all duration-300 hover:border-cyan-500/40 hover:bg-white/8 hover:shadow-[0_0_24px_rgba(34,211,238,0.12)]"
    >
      {/* Header: logo + org/title */}
      <div className="flex items-center gap-3">
        <div className="h-10 w-10 shrink-0 rounded-xl overflow-hidden bg-gradient-to-br from-cyan-500/20 to-indigo-500/20 flex items-center justify-center border border-white/10">
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
          <p className="text-xs text-white/40 mt-0.5">{org}</p>
        </div>
      </div>

      {/* Description */}
      <p className="text-xs text-white/60 leading-relaxed line-clamp-3 group-hover:text-white/80 transition-colors duration-300">
        {description}
      </p>

      {/* Footer CTA */}
      <div className="mt-auto flex items-center gap-1 text-xs text-cyan-400/60 group-hover:text-cyan-400 transition-colors duration-300">
        <span>View credential</span>
        <span className="translate-x-0 group-hover:translate-x-1 transition-transform duration-300">
          →
        </span>
      </div>
    </a>
  );
}

export default function CertificationsSection() {
  // Duplicate items so the CSS marquee (-50% translate) creates a seamless loop
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

      {/* Marquee track — edge fades via mask, pause-on-hover via CSS */}
      <div
        className="pause-on-hover relative overflow-hidden"
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

      {/* Subtle hint text */}
      <p className="mt-6 text-center text-xs text-white/25 tracking-widest uppercase select-none">
        Hover to pause · Click to view
      </p>
    </section>
  );
}