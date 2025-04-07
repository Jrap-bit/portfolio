"use client";

import { InfiniteMovingCards } from "~/components/ui/infinite-moving-cards";
import { motion } from "framer-motion";

const certifications = [
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

export default function CertificationsSection() {
  return (
    <section
      id="certifications"
      className="w-full py-20 px-4 md:px-10 text-white relative overflow-hidden"
    >
      <motion.h2
        className="text-3xl md:text-5xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-400"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Certifications & Achievements
      </motion.h2>

      <div className="relative">
        <InfiniteMovingCards
          items={certifications}
          direction="left"
          speed="slow"
          pauseOnHover={true}
        />
      </div>
    </section>
  );
}