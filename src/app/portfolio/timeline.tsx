"use client";

import { Timeline as AceternityTimeline } from "~/components/ui/timeline";
import { motion } from "framer-motion";

export default function TimelineSection() {
  const timelineData = [
    {
      title: "IBM – Associate Product Manager",
      content: (
        <div className="space-y-2">
          <p><strong>Sep 2024 – Mar 2025</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>Led product roadmap and execution for QRadar SIEM integrations with third-party security tools.</li>
            <li>Managed stakeholder requests and prioritized features based on business impact and feasibility.</li>
            <li>Worked closely with engineering teams to define requirements, track sprints, and resolve roadblocks.</li>
            <li>Facilitated alignment across sales, support, and marketing to drive product adoption and clarity.</li>
            <li>Delivered new integrations that contributed to revenue growth and platform expansion.</li>
          </ul>
        </div>
      ),
    },
    {
      title: "IBM – Associate Product Manager Intern",
      content: (
        <div className="space-y-2">
          <p><strong>Jan 2024 – Aug 2024</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>Spearheaded QRadar SIEM integration projects and ensured timely feature delivery.</li>
            <li>Conducted market and competitor research to improve integration strategy.</li>
            <li>Facilitated communication between developers and customers to bridge product gaps.</li>
            <li>Led documentation for integration workflows, APIs, and enhancement tracking.</li>
            <li>Collaborated with users to identify pain points and align roadmap with actual needs.</li>
          </ul>
        </div>
      ),
    },
    {
      title: "NIIT University – B.Tech CSE",
      content: (
        <div className="space-y-2">
          <p><strong>2020 – 2024 | Neemrana, India</strong></p>
          <p>CGPA: <strong>9.63</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>Studied computer science with a focus on Cybersecurity, Software Engineering, and Full-Stack Development.</li>
            <li>Led the Sinusoid Digital Design Team, Member of Consilio: The Design Club, and Binary Beasts: Programming Club.</li>
          </ul>
        </div>
      ),
    },
    {
      title: "St. Teresa School – 10th & 12th Boards",
      content: (
        <div className="space-y-2">
          <p><strong>2017 – 2020 | Ghaziabad, India</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>12th Boards: <strong>94.5%</strong></li>
            <li>10th Boards: <strong>95.6%</strong></li>
            <li>Involved in technical team, public speaking initiatives, and design projects.</li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <section
      id="timeline"
      className="px-6 py-20 max-w-7xl mx-auto relative z-10"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        viewport={{ once: true }}
        className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300"
      >
        Experience & Education
      </motion.h2>
      <AceternityTimeline data={timelineData} />
    </section>
  );
}
