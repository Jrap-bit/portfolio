"use client";

import React from "react";
import ExpandableCardGrid from "~/components/expandable-card-demo-grid";

// Project data
const projects = [
    {
        title: "INTEGRATE Framework",
        description: "Internal Integration Delivery Pipeline Framework at IBM",
        src: "/images/projects/integrate.png",
        ctaText: "Read Summary",
        ctaLink: "#",
        content: () => (
          <>
            <p>
              A strategic integration delivery pipeline developed under the I.N.T.E.G.R.A.T.E.
              framework at IBM to streamline third-party onboarding and reduce customer
              escalations.
            </p>
            <ul className="list-disc pl-6 pt-4">
              <li>Defined a sprint-based model with repeatable delivery phases</li>
              <li>Standardized workflows: Plan → Dev → Test → Release</li>
              <li>Backlog reduction and faster turnaround for integrations</li>
            </ul>
          </>
        ),
      },
      {
        title: "ESA Contract Automation",
        description: "PDF Parsing & Part Code Matching Tool for ESA at IBM",
        src: "/images/certs/cisco Icon.png",
        ctaText: "Read Summary",
        ctaLink: "#",
        content: () => (
          <>
            <p>
              A Django-based internal tool to automate ESA contract validation by parsing PDF
              contracts and comparing against part code databases.
            </p>
            <ul className="list-disc pl-6 pt-4">
              <li>OCR + logic-based PDF contract parsing</li>
              <li>Compares and classifies parts into Eligible / Ineligible / Replacement</li>
              <li>Outputs structured Excel reports for automation</li>
            </ul>
          </>
        ),
      },
      {
        title: "Guardium RAG Chatbot",
        description: "Watsonx-powered RAG chatbot for Guardium sales enablement",
        src: "/images/certs/ibm.png",
        ctaText: "Read Summary",
        ctaLink: "#",
        content: () => (
          <>
            <p>
              An AI-powered chatbot built for IBM’s Guardium sales teams to answer
              documentation-based queries using a Retrieval-Augmented Generation (RAG) pipeline.
              Reduced search time from hours to seconds.
            </p>
            <ul className="list-disc pl-6 pt-4">
              <li>Uses IBM Watsonx.ai with the Granite foundation model for answer generation</li>
              <li>Connects to Watsonx Discovery to retrieve relevant Guardium documents</li>
              <li>Frontend built in React; API orchestrates retrieval + generation flow</li>
              <li>Accelerated response time for internal sellers and reduced onboarding friction</li>
            </ul>
          </>
        ),
      },
    {
      title: "CoffeeChain",
      description: "Blockchain-based supply chain management for coffee logistics.",
      src: "/images/certs/cisco Icon.png",
      ctaText: "View Code",
      ctaLink: "https://github.com/Jrap-bit/CoffeeChain",
      content: () => (
        <div className="space-y-4">
          <p>
            CoffeeChain is a blockchain-powered supply chain management system
            that enhances transparency and traceability in coffee logistics.
            Combines smart contracts, Django for backend, and a modern UI for stakeholders.
          </p>
          <div>
            <h4 className="font-semibold mb-1">Technologies Used:</h4>
            <ul className="list-disc pl-5 space-y-1">
              <li>Python</li>
              <li>Django</li>
              <li>Blockchain</li>
              <li>Web3</li>
            </ul>
          </div>
        </div>
      ),
    },
    {
      title: "TuneLink",
      description: "Spotify + YouTube downloader and playlist cloner.",
      src: "/images/certs/ibm.png",
      ctaText: "View Code",
      ctaLink: "https://github.com/Jrap-bit/TuneLink",
      content: () => (
        <div className="space-y-4">
          <p>
            Effortlessly merges Spotify and YouTube, enabling direct song downloads
            and playlist duplication on YouTube. A productivity tool for music lovers.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Python</li>
            <li>YouTube API</li>
            <li>Spotify Web API</li>
          </ul>
        </div>
      ),
    },
    {
      title: "CipherGuard",
      description: "Robust encryption suite using React + Django.",
      src: "/images/certs/cisco Icon.png",
      ctaText: "View Code",
      ctaLink: "https://github.com/Jrap-bit/CipherGuard",
      content: () => (
        <div className="space-y-4">
          <p>
            Merges classic and modern encryption algorithms in a clean web interface.
            Great for learning about cipher strength and data protection strategies.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>JavaScript</li>
            <li>React</li>
            <li>Django</li>
          </ul>
        </div>
      ),
    },
    {
      title: "MetroDeals",
      description: "MERN stack-powered online deal finder.",
      src: "/images/certs/ibm.png",
      ctaText: "View Code",
      ctaLink: "https://github.com/MrDXTR/MetroDeals",
      content: () => (
        <div className="space-y-4">
          <p>
            Authentication, location tags, product insights. Fullstack application
            built for seamless shopping exploration.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>MongoDB</li>
            <li>Express</li>
            <li>React</li>
            <li>Node.js</li>
          </ul>
        </div>
      ),
    },
    {
      title: "Attendance-System",
      description: "Precision attendance tracking system.",
      src: "/images/certs/cisco Icon.png",
      ctaText: "View Code",
      ctaLink: "https://github.com/Jrap-bit/Attendance-System",
      content: () => (
        <div className="space-y-4">
          <p>
            Built to automate attendance systems with a focus on high accuracy.
            Supports RFID + time-based logs and admin dashboard.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Python</li>
            <li>Flask</li>
            <li>SQLite</li>
          </ul>
        </div>
      ),
    },
    {
      title: "MalwareGuard",
      description: "Advanced malware analysis toolkit using YARA.",
      src: "/images/certs/ibm.png",
      ctaText: "View Code",
      ctaLink: "https://github.com/Jrap-bit/MalwareGuard",
      content: () => (
        <div className="space-y-4">
          <p>
            Employs YARA Rules, SSDEEP hashing, and Boosted Random Forests
            for highly accurate malware detection and classification.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>Python</li>
            <li>Pandas + Scikit-learn</li>
            <li>PEfile</li>
            <li>YARA</li>
          </ul>
        </div>
      ),
    },
    {
      title: "v6_main_site",
      description: "Official website for siNUsoid v6 tech fest.",
      src: "/images/certs/cisco Icon.png",
      ctaText: "View Code",
      ctaLink: "https://github.com/Akshat7274/v6_main_site",
      content: () => (
        <div className="space-y-4">
          <p>
            Designed, deployed and maintained for the NIIT University's annual
            tech fest. Supports user registration, event info, and sponsor banners.
          </p>
          <ul className="list-disc pl-5 space-y-1">
            <li>HTML</li>
            <li>CSS</li>
            <li>JavaScript</li>
          </ul>
        </div>
      ),
    },
  ];

export default function ProjectsSection() {
  return (
    <section id="projects" className="w-full px-4 py-20 md:px-12 text-white">
      <h2 className="text-5xl font-bold mb-12 text-center text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300">Projects</h2>
      <ExpandableCardGrid cards={projects} />
    </section>
  );
}