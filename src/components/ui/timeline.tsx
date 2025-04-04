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

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start 5%", "end 80%"],
  });

  // Animate the colored line’s height and opacity
  const heightTransform = useTransform(scrollYProgress, [0, 1], [0, height]);
  const opacityTransform = useTransform(scrollYProgress, [0, 0.1], [0, 1]);

  return (
    <div
      className="w-full bg-white dark:bg-neutral-950 font-semibold md:px-0"
      ref={containerRef}
    >
      <div ref={ref} className="relative w-full mx-0 pb-20">
        {data.map((item, index) => (
          <div
            key={index}
            // On mobile: stacked
            // On desktop: bullet/line on the left, content on the right
            className="relative flex flex-col md:flex-row md:gap-10 pt-10 md:pt-24"
          >
            {/* Left side: the bullet (no sticky) */}
            <div className="relative w-0 md:w-auto">
              {/* The outer bullet container */}
              <div className="hidden md:hidden h-10 absolute left-3 md:left-3 w-10 rounded-full bg-white dark:bg-black items-center justify-center">
                {/* The inner circle */}
                <div className="hidden md:hidden h-4 w-4 rounded-full bg-neutral-200 dark:bg-neutral-800 border border-neutral-300 dark:border-neutral-700" />
              </div>
            </div>

            {/* Right side: Title + Content */}
            <div className="relative pl-20 md:pl-30 align-middle w-full">
              {/* Desktop title */}
              <h3 className="hidden md:block text-xl md:text-4xl font-bold text-neutral-500 dark:text-neutral-50">
                {item.title}
              </h3>
              {/* Mobile title */}
              <h3 className="md:hidden block text-2xl mb-4 text-left font-bold text-neutral-500 dark:text-neutral-50">
                {item.title}
              </h3>

              <div className="md:text-neutral-50 text-base font-normal leading-relaxed">
                {item.content}
              </div>
            </div>
          </div>
        ))}

        {/* The vertical timeline line in the background */}
        <div
          style={{
            height: height + "px",
          }}
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
              from-purple-500
              via-blue-500
              to-transparent
              from-[0%]
              via-[10%]
              rounded-full
            "
          />
        </div>
      </div>
    </div>
  );
};