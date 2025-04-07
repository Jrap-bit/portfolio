"use client";

import {
  useScroll,
  useTransform,
  motion,
} from "motion/react";
import React, { useEffect, useRef, useState } from "react";

interface TimelineEntry {
  title: string;
  content: React.ReactNode;
}

export const Timeline = ({ data }: { data: TimelineEntry[] }) => {
  const ref = useRef<HTMLDivElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (ref.current) {
      const rect = ref.current.getBoundingClientRect();
      setHeight(rect.height);
    }
  }, [ref]);

  const isMobile = typeof window !== "undefined" && window.innerWidth < 768;

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 5%", `end ${isMobile ? "90%" : "80%"}`],
  });

  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full font-semibold md:px-0 relative"
      ref={containerRef}
    >
      <div ref={ref} className="relative w-full mx-0 pb-20">
        {data.map((item, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: index * 0.1 }}
            viewport={{ once: true }}
            className="relative flex flex-col md:flex-row md:gap-10 pt-10 md:pt-24 group"
          >
            {/* Left spacer */}
            <div className="relative w-0 md:w-auto" />

            {/* Right side */}
            <div className="relative pl-20 md:pl-30 w-full">
              {/* Desktop title */}
              <h3 className="hidden md:block text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 to-white transition duration-300">
                {item.title}
              </h3>

              {/* Mobile title */}
              <h3 className="md:hidden block text-2xl mb-4 font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-100 to-white transition duration-300">
                {item.title}
              </h3>

              {/* Hoverable content box */}
              <motion.div
                whileHover={{
                  scale: 1.015,
                  backgroundColor: "rgba(255,255,255,0.06)",
                }}
                transition={{ type: "spring", stiffness: 180, damping: 15 }}
                className="md:text-neutral-200 text-base font-normal leading-relaxed mt-4 rounded-xl bg-white/5 dark:bg-black/20 px-4 py-3 shadow-inner"
              >
                {item.content}
              </motion.div>
            </div>
          </motion.div>
        ))}

        {/* Vertical timeline line */}
        <div
          style={{ height: height + "px" }}
          className="
            absolute
            md:left-8
            left-8
            top-0
            overflow-hidden
            w-[2px]
            bg-[linear-gradient(to_bottom,var(--tw-gradient-stops))]
            from-transparent from-[0%]
            via-neutral-200 dark:via-neutral-700
            to-transparent to-[99%]
            [mask-image:linear-gradient(to_bottom,transparent_0%,black_10%,black_90%,transparent_100%)]
          "
        >
          <motion.div
            style={{
              height: heightTransform,
              opacity: opacityTransform,
            }}
            className="
              absolute
              inset-x-0
              top-0
              w-[2px]
              bg-gradient-to-t
              from-blue-500
              via-cyan-400
              to-transparent
              rounded-full
              shadow-[0_0_8px_rgba(59,130,246,0.5)]
            "
          />
        </div>
      </div>
    </div>
  );
};