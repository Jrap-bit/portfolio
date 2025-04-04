"use client";

import Hero from "~/app/portfolio/hero";
import { TracingBeam } from "~/components/ui/tracing-beam";
import SkillsSection from "./skills";
import PortfolioNavbar from "./portfolio-navbar";
import TimelineSection from "./timeline";
import { motion } from "framer-motion";
import Dock from "./dock";

export default function PortfolioPage() {
  return (
    <div className="overflow-y-scroll scroll-smooth snap-y snap-mandatory">
      <Dock />
      {/* Hero Section */}
      <section id="Hero" className="snap-start h-screen flex items-center justify-center">
        <Hero />
      </section>

      {/* Navigation Bar */}
      <PortfolioNavbar />

      {/* About Me Section */}
      <section id="about" className="snap-start h-screen max-w-4xl mx-auto px-6 py-20 flex flex-col justify-center">
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
          <li className="bg-muted p-4 rounded-md">🧠 Systems thinker and problem solver</li>
          <li className="bg-muted p-4 rounded-md">🧰 Skilled in frontend & backend development</li>
          <li className="bg-muted p-4 rounded-md">📦 Product manager with cross-team coordination experience</li>
          <li className="bg-muted p-4 rounded-md">🎨 Strong design sense and UX sensitivity</li>
        </ul>
      </section>

      {/* Tech Stack Section */}
      <section id="tech" className="snap-start h-screen max-w-5xl mx-auto px-6 py-20 flex flex-col justify-center">
        <SkillsSection />
      </section>

      {/* Timeline Section — allow full height */}
      <section id="timeline" className="snap-start px-6 py-20 max-w-5xl mx-auto">
        <TimelineSection />
      </section>
    </div>
  );
}