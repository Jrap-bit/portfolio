"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Hero from "~/app/portfolio/hero";
import CertificationsCarousel from "./Certifications";
import SkillsSection from "./skills";
import PortfolioNavbar from "./portfolio-navbar";
import AboutMeSection from "./about";
import ProjectsSection from "./projects";
import TimelineSection from "./timeline";
import ContactSection from "./contact";
import Footer from "./footer";
import Dock from "./dock";

export default function PortfolioPage() {
  const [showNavbar, setShowNavbar] = useState(false);

  useEffect(() => {
    const heroEl = document.getElementById("Hero");
    if (!heroEl) return;

    const observer = new IntersectionObserver(
      ([entry]) => setShowNavbar(!entry?.isIntersecting),
      { threshold: 0, rootMargin: "-50% 0px 0px 0px" }
    );

    observer.observe(heroEl);
    return () => observer.disconnect();
  }, []);

  return (
    <div className="overflow-x-hidden bg-[#000000] text-white">
      <div className="bg-[url('/textures/noise.svg')] bg-cover bg-repeat bg-fixed bg-[#000000] min-h-screen">

      <Dock />

      {/* Hero Section */}
      <section id="Hero" className="min-h-screen flex items-center justify-center">
        <Hero />
      </section>

      {/* Render Navbar only if not in the Hero section */}
      {showNavbar && <PortfolioNavbar />}

      {/* About Me Section */}
      <section
        id="about"
        className="min-h-screen w-full mx-auto px-4 py-0 sm:py-20 flex flex-col justify-center"
      >
       <AboutMeSection />
      </section>

      {/* Tech Stack Section */}
      <section
        id="tech"
        className="min-h-screen max-w-7xl mx-auto px-4 sm:px-6 py-12 sm:py-20 flex flex-col justify-center"
      >
        <SkillsSection />
      </section>

      {/* Timeline Section */}
      <section id="timeline" className="px-4 sm:px-6 py-12 sm:py-20 max-w-5xl mx-auto">
        <TimelineSection />
      </section>

      {/* Certifications Section */}
      <section id="certifications" className="px-4 sm:px-6 py-12 sm:py-20 max-w-7xl mx-auto">
        <CertificationsCarousel />
      </section>

      {/* Projects Section */}
      <section id="projects" className="px-4 sm:px-6 py-12 sm:py-20 max-w-7xl mx-auto">
        <ProjectsSection />
      </section>

      {/* Contact Section */}
      <section id="contact" className="px-4 sm:px-6 py-12 sm:py-20 max-w-5xl mx-auto">
        <ContactSection />
      </section>
      <Footer />
    </div>
    </div>
  );
}