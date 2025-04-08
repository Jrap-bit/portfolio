"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaCopy } from "react-icons/fa";

const email = "parjanya@example.com";

export default function ContactMe() {
  const [copied, setCopied] = useState(false);
  const [formSuccess, setFormSuccess] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Just simulate a submission here
    setFormSuccess(true);
    setTimeout(() => setFormSuccess(false), 2000);
  };

  return (
    <section
      id="contact"
      className="w-full max-w-3xl mx-auto px-6 py-20 flex flex-col items-center justify-center text-white"
    >
      <motion.h2
        className="text-4xl md:text-5xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-300 mb-8"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        Contact Me
      </motion.h2>

      <motion.p
        className="text-neutral-400 text-center max-w-xl text-lg mb-10"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.2 }}
        viewport={{ once: true }}
      >
        Have something in mind? Drop me a message or copy my email to reach out later.
      </motion.p>

      {/* Copy Email */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
        viewport={{ once: true }}
        className="mb-6"
      >
        <motion.button
          onClick={handleCopy}
          whileTap={{ scale: 0.95 }}
          className="flex items-center gap-2 px-5 py-2 rounded-full border border-white/10 bg-white/5 hover:bg-white/10 transition text-sm text-cyan-300 hover:text-white"
        >
          <FaCopy />
          Copy Email
        </motion.button>

        <AnimatePresence>
          {copied && (
            <motion.span
              key="copied"
              className="mt-2 text-green-400 text-sm flex items-center gap-1 justify-center"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <FaCheckCircle /> Copied!
            </motion.span>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Contact Form */}
      <motion.form
        onSubmit={handleSubmit}
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.4 }}
        viewport={{ once: true }}
        className="w-full space-y-4"
      >
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <input
            type="text"
            placeholder="Your Name"
            required
            className="bg-white/5 rounded-md px-4 py-2 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
          <input
            type="email"
            placeholder="Your Email"
            required
            className="bg-white/5 rounded-md px-4 py-2 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />
        </div>
        <textarea
          placeholder="Your Message"
          rows={5}
          required
          className="w-full bg-white/5 rounded-md px-4 py-2 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          type="submit"
          className="w-full md:w-auto px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full font-medium shadow hover:from-blue-600 hover:to-cyan-500 transition"
        >
          Send Message
        </motion.button>

        <AnimatePresence>
          {formSuccess && (
            <motion.p
              key="formSuccess"
              className="text-green-400 text-sm mt-2 flex items-center justify-center gap-1"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <FaCheckCircle /> Message sent (simulated)!
            </motion.p>
          )}
        </AnimatePresence>
      </motion.form>
    </section>
  );
}