"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaCopy, FaEnvelope } from "react-icons/fa";

const email = "namanpandey10@gmail.com";

export default function ContactMe() {
  const [copied, setCopied] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", message: "" });

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Copy failed:", err);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const mailtoLink = `mailto:${email}?subject=Message from ${encodeURIComponent(form.name)}&body=${encodeURIComponent(form.message)}%0A%0AFrom: ${encodeURIComponent(form.email)}`;
    window.location.href = mailtoLink;
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
        transition={{ duration: 0.5, delay: 0.1 }}
        viewport={{ once: true }}
      >
Whether it's a job opportunity, project collaboration, or just a hello — feel free to reach out!
</motion.p>

      {/* Form */}
      <motion.form
        onSubmit={handleSubmit}
        className="w-full space-y-4"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        whileFocus={{ scale: 1.2}}
        transition={{ delay: 0.2, duration: 0.5 }}
        viewport={{ once: true }}
      >
<motion.div className="grid grid-cols-1 md:grid-cols-2 gap-4">
  <motion.input
    whileFocus={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 200 }}
    name="name"
    value={form.name}
    onChange={handleChange}
    placeholder="Your Name"
    required
    className="bg-white/5 rounded-md px-4 py-2 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
  />
  <motion.input
    whileFocus={{ scale: 1.05 }}
    transition={{ type: "spring", stiffness: 200 }}
    name="email"
    type="email"
    value={form.email}
    onChange={handleChange}
    placeholder="Your Email"
    required
    className="bg-white/5 rounded-md px-4 py-2 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
  />
</motion.div>
<motion.div>
        <motion.textarea
          whileFocus={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 200 }}
          name="message"
          value={form.message}
          onChange={handleChange}
          placeholder="Your Message"
          rows={5}
          required
          className="w-full bg-white/5 rounded-md px-4 py-2 text-white placeholder-gray-400 border border-white/10 focus:outline-none focus:ring-2 focus:ring-cyan-500"
        />
        </motion.div>

        <div className="flex flex-col md:flex-row items-center gap-4">
          <motion.button
            whileTap={{ scale: 0.95 }}
            type="submit"
            className="w-full md:w-auto px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full font-medium shadow hover:from-blue-600 hover:to-cyan-500 transition flex items-center gap-2 justify-center"
          >
            <FaEnvelope /> Send Message
          </motion.button>

          <motion.button
            whileTap={{ scale: 0.95 }}
            onClick={handleCopy}
            type="button"
            className="w-full md:w-auto px-6 py-2 bg-gradient-to-r from-blue-500 to-cyan-400 text-white rounded-full font-medium shadow hover:from-blue-600 hover:to-cyan-500 transition flex items-center gap-2 justify-center"
          >
            <FaCopy /> Copy Email
          </motion.button>
        </div>

        <AnimatePresence>
          {copied && (
            <motion.p
              key="copied"
              className="text-green-400 text-sm mt-2 flex items-center justify-center gap-1"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -5 }}
              transition={{ duration: 0.3 }}
            >
              <FaCheckCircle /> Email copied to clipboard!
            </motion.p>
          )}
        </AnimatePresence>
      </motion.form>
    </section>
  );
}