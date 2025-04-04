"use client";

import { motion } from "framer-motion";
import { Badge } from "~/components/ui/badge";
import { useEffect, useRef, useState } from "react";

export default function SkillsSection() {
  const techSkills = {
    Frontend: ["React", "Next.js", "TypeScript", "JavaScript", "HTML", "CSS", "Tailwind CSS"],
    "Backend & Databases": ["Node.js", "Express.js", "Django", "Python", "MongoDB", "MySQL", "tRPC", "Prisma"],
    "DevOps & Tools": ["Docker", "Git", "VS Code", "Selenium", "Power BI"],
  };

  const pmSkills = {
    "Product Management": ["Product Roadmapping", "Customer Empathy", "Prioritization & Strategy", "Market Research"],
    "Collaboration & Methodologies": ["Cross-functional Collaboration", "Agile & Scrum", "UI/UX & Design Thinking"],
    "Design & PM Tools": ["Aha!", "Jira", "Figma", "Canva", "Photoshop", "Illustrator"],
  };

  const scrollRef = useRef<HTMLDivElement>(null);
  const [isOverflowing, setIsOverflowing] = useState(false);

  useEffect(() => {
    const checkOverflow = () => {
      const el = scrollRef.current;
      if (el) {
        setIsOverflowing(el.scrollHeight > el.clientHeight);
      }
    };
    checkOverflow();
    window.addEventListener("resize", checkOverflow);
    return () => window.removeEventListener("resize", checkOverflow);
  }, []);

  return (
    <section
      id="skills"
      className="snap-start h-screen px-4 md:px-8 lg:px-12 py-8 md:py-12 bg-transparent flex justify-center items-center"
    >
      <div className="relative w-full max-w-6xl h-[90%] rounded-3xl">
        {/* Glowing border */}
        <motion.div
          initial={{ opacity: 0.6 }}
          animate={{ opacity: [0.2, 0.5, 0.2] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -inset-1 bg-gradient-to-r from-cyan-500 via-indigo-500 to-purple-600 rounded-3xl blur-lg"
        />

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="relative w-full h-full bg-black rounded-3xl p-6 md:p-8 overflow-y-auto scrollbar-thin scrollbar-thumb-neutral-700 scrollbar-track-transparent"
        >
          <div className="grid md:grid-cols-2 gap-8">
            {/* Technical Skills */}
            <div className="space-y-6">
              <motion.h2
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-cyan-300"
              >
                Tech Stack
              </motion.h2>

              {/* 👀 Quirky scroll hint (mobile + if overflowing) */}
              {isOverflowing && (
                <div className="md:hidden text-sm text-neutral-500 -mt-4 mb-1 pl-1">
                  Psst... there’s more if you scroll 😏
                </div>
              )}

              {Object.entries(techSkills).map(([group, skills], groupIdx) => (
                <motion.div
                  key={group}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: groupIdx * 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  <h3 className="text-xl font-semibold text-cyan-200">{group}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="text-sm border-cyan-400 text-cyan-100 hover:bg-cyan-400 hover:text-black transition duration-300 ease-in-out cursor-default"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>

            {/* Product & Management */}
            <div className="space-y-6">
              <motion.h2
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className="text-3xl font-bold text-indigo-300"
              >
                Product & Management
              </motion.h2>

              {Object.entries(pmSkills).map(([group, skills], groupIdx) => (
                <motion.div
                  key={group}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: groupIdx * 0.2 }}
                  viewport={{ once: true }}
                  className="space-y-3"
                >
                  <h3 className="text-xl font-semibold text-indigo-200">{group}</h3>
                  <div className="flex flex-wrap gap-2">
                    {skills.map((skill) => (
                      <Badge
                        key={skill}
                        variant="outline"
                        className="text-sm border-indigo-400 text-indigo-100 hover:bg-indigo-400 hover:text-black transition duration-300 ease-in-out cursor-default"
                      >
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}