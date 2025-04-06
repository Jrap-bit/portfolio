"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "~/app/portfolio/hero";
import CertificationsCarousel from "./Certifications";
import SkillsSection from "./skills";
import PortfolioNavbar from "./portfolio-navbar";
import ProjectsSection from "./projects";
import TimelineSection from "./timeline";
import Dock from "./dock";

export default function PortfolioPage() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById("Hero");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // When the hero is mostly out of view, show the navbar.
        setShowNavbar(!entry?.isIntersecting);
      },
      { threshold: 0, rootMargin: "-50% 0px 0px 0px" }
    );

    observer.observe(heroEl);

    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <div className="overflow-y-scroll scroll-smooth">
      <Dock />
      {/* Hero Section */}
      <section id="Hero" className="flex items-center justify-center">
        <Hero />
      </section>

      {/* Render Navbar only if not in the Hero section */}
      {showNavbar && <PortfolioNavbar />}

      {/* About Me Section */}
      <section
        id="about"
        className="h-screen max-w-4xl mx-auto px-6 py-20 flex flex-col justify-center"
      >
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className="text-3xl font-bold mb-4"
        >
          About Me
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          viewport={{ once: true }}
          className="text-muted-foreground leading-relaxed text-lg"
        >
          I'm a passionate developer and product thinker...
        </motion.p>
        <ul className="mt-6 grid grid-cols-1 md:grid-cols-2 gap-4 text-muted-foreground text-sm">
          <li className="bg-muted p-4 rounded-md">
            🧠 Systems thinker and problem solver
          </li>
          <li className="bg-muted p-4 rounded-md">
            🧰 Skilled in frontend & backend development
          </li>
          <li className="bg-muted p-4 rounded-md">
            📦 Product manager with cross-team coordination experience
          </li>
          <li className="bg-muted p-4 rounded-md">
            🎨 Strong design sense and UX sensitivity
          </li>
        </ul>
      </section>

      {/* Tech Stack Section */}
      <section
        id="tech"
        className="h-screen max-w-5xl mx-auto px-6 py-20 flex flex-col justify-center"
      >
        <SkillsSection />
      </section>

      {/* Timeline Section */}
      <section
        id="timeline"
        className="px-6 py-5 max-w-5xl mx-auto"
      >
        <TimelineSection />
      </section>

      {/* Certifications Section */}
      <section
        id="certifications"
        className="px-6 py-2 max-w-7xl mx-auto"
      >
        <CertificationsCarousel />
      </section>
{/* Projects Section */}
<section
  id="projects"
  className="px-6 py-10 max-w-7xl mx-auto"
>
  <ProjectsSection />
</section>

    </div>
  );
}