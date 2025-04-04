"use client";

import { Timeline as AceternityTimeline } from "~/components/ui/timeline";

export default function TimelineSection() {
  const timelineData = [
    {
      title: "IBM – Associate Product Manager",
      content: (
        <div className="space-y-2">
          <p><strong>Sep 2024 – Mar 2025</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>Drove SIEM integration lifecycle, aligning customer needs with roadmap priorities.</li>
            <li>Collaborated cross-functionally with engineers, architects, and vendors to reduce delivery blockers.</li>
            <li>Contributed to $12.7M+ in revenue by enhancing QRadar SIEM’s enterprise integrations.</li>
          </ul>
        </div>
      ),
    },
    {
      title: "IBM – Associate Product Manager Intern",
      content: (
        <div className="  space-y-2">
          <p><strong>Jan 2024 – Aug 2024</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>Delivered new QRadar SIEM integrations and features with focus on customer needs.</li>
            <li>Led market and competitor research to shape integration strategy.</li>
            <li>Bridged communication between customers and engineers to close product gaps.</li>
          </ul>
        </div>
      ),
    },
    {
      title: "NIIT University – B.Tech CSE",
      content: (
        <div className="  space-y-2">
          <p><strong>2020 – 2024 | Neemrana, India</strong></p>
          <p>CGPA: <strong>9.63</strong></p>
          <p>Graduated with honors in Computer Science with focus on cybersecurity, product thinking, and software engineering.</p>
        </div>
      ),
    },
    {
      title: "St. Teresa School – 10th & 12th Boards",
      content: (
        <div className="  space-y-2">
          <p><strong>2017 – 2020 | Ghaziabad, India</strong></p>
          <ul className="list-disc list-inside space-y-1">
            <li>12th Boards: <strong>94.5%</strong></li>
            <li>10th Boards: <strong>95.6%</strong></li>
          </ul>
        </div>
      ),
    },
  ];

  return (
    <section id="timeline" className="snap-start px-0 md:px-1 py-20 bg-background">
      <h2 className="text-3xl font-bold mb-5 text-center text-white">Experience & Education</h2>
      <AceternityTimeline data={timelineData} />
    </section>
  );
}