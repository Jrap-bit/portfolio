"use client";

import { FaGithub, FaLinkedin, FaFileAlt, FaArrowUp, FaSpotify, FaEnvelope } from "react-icons/fa";
import { motion } from "framer-motion";
import { toast } from "sonner";

export default function Footer() {

  const copyEmail = () => {
    navigator.clipboard.writeText("parjanyapandey@gmail.com");
    toast.success("Email copied to clipboard!");
  };

  return (
    <footer className="relative w-full mt-20 px-6 py-10 text-white bg-[#0a0a0a] border-t border-white/10">
      <div className="max-w-7xl mx-auto grid md:grid-cols-3 gap-6">

        {/* Left - Info */}
        <motion.div
          className="space-y-2 text-sm text-neutral-400"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <p>© {new Date().getFullYear()} Parjanya Pandey</p>
          <p>📍 Ghaziabad, India</p>
          <p>
            📬{" "}
            <span
              onClick={copyEmail}
              className="cursor-pointer underline underline-offset-4 hover:text-white transition"
            >
              Copy Email
            </span>{" "}
            or{" "}
            <a
              href="mailto:parjanyapandey@gmail.com"
              className="underline underline-offset-4 hover:text-white transition"
            >
              Send Mail
            </a>
          </p>
        </motion.div>

        {/* Center - Links */}
        <motion.div
          className="flex flex-col space-y-2 text-sm text-white/70"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
        >
          <a
            href="/blog"
            className="hover:underline underline-offset-4 transition"
          >
            📝 Read My Blog
          </a>
          <a
            href="https://open.spotify.com/playlist/4MnxdTiWPG4V7T2ll3xHgS?si=2b11aa87cc5d46dc"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:underline underline-offset-4 transition flex items-center gap-1"
          >
            <FaSpotify className="text-green-400" /> Vibe with my playlist
          </a>
        </motion.div>

        {/* Right - Socials */}
        <motion.div
          className="flex gap-4 justify-start md:justify-end items-start text-white/70"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <a
            href="https://github.com/Jrap-bit"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            aria-label="GitHub"
          >
            <FaGithub size={20} />
          </a>
          <a
            href="https://linkedin.com/in/parjanyapandey"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            aria-label="LinkedIn"
          >
            <FaLinkedin size={20} />
          </a>
          <a
            href="/Resources/cv.pdf"
            target="_blank"
            rel="noopener noreferrer"
            className="hover:text-white transition"
            aria-label="Resume"
          >
            <FaFileAlt size={20} />
          </a>
        </motion.div>
      </div>
    </footer>
  );
}