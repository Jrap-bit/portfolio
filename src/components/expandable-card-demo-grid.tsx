// ~/components/expandable-cards-demo-grid.tsx

"use client";

import Image from "next/image";
import React, { useEffect, useId, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { useOutsideClick } from "~/hooks/use-outside-click";

export interface ProjectCard {
  title: string;
  description: string;
  src?: string;
  ctaText: string;
  ctaLink: string;
  content: React.ReactNode | (() => React.ReactNode);
}

export default function ExpandableCardGrid({ cards }: { cards: ProjectCard[] }) {
  const [active, setActive] = useState<ProjectCard | null>(null);
  const id = useId();
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function onKeyDown(event: KeyboardEvent) {
      if (event.key === "Escape") setActive(null);
    }

    document.body.style.overflow = active ? "hidden" : "auto";
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [active]);

  useOutsideClick(ref, () => setActive(null));

  return (
    <>
      {/* Overlay */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 z-40"
          />
        )}
      </AnimatePresence>

      {/* Modal */}
      <AnimatePresence>
        {active && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div
              layoutId={`card-${active.title}-${id}`}
              ref={ref}
              className="w-full max-w-[500px] max-h-[90vh] flex flex-col bg-white dark:bg-neutral-900 sm:rounded-3xl overflow-hidden relative"
            >
              {/* Close button */}
              <button 
                onClick={() => setActive(null)}
                className="absolute top-4 right-4 z-10 bg-black/50 text-white rounded-full p-2 hover:bg-black/70 transition-colors"
                aria-label="Close"
              >
                <svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="20" 
                  height="20" 
                  viewBox="0 0 24 24" 
                  fill="none" 
                  stroke="currentColor" 
                  strokeWidth="2" 
                  strokeLinecap="round" 
                  strokeLinejoin="round"
                >
                  <path d="M18 6 6 18" />
                  <path d="m6 6 12 12" />
                </svg>
              </button>
              
              {active.src && (
                <motion.div layoutId={`image-${active.title}-${id}`} className="relative h-48 sm:h-64">
                  <Image
                    priority
                    width={500}
                    height={200}
                    src={active.src}
                    alt={active.title}
                    className="w-full h-full object-cover object-top"
                  />
                </motion.div>
              )}
              <div className="p-4 sm:p-6 flex flex-col flex-grow overflow-hidden">
                <motion.h3 className="text-lg font-semibold text-neutral-900 dark:text-white">
                  {active.title}
                </motion.h3>
                <motion.p className="text-neutral-600 dark:text-neutral-400 mb-4">
                  {active.description}
                </motion.p>
                <motion.div className="text-neutral-700 dark:text-neutral-300 text-sm leading-relaxed space-y-3 overflow-y-auto flex-grow pr-2">
                  {typeof active.content === "function"
                    ? active.content()
                    : active.content}
                </motion.div>
                <div className="mt-6 pt-4 border-t border-neutral-200 dark:border-neutral-800">
                  <a
                    href={active.ctaLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-block bg-green-500 text-white px-5 py-2 text-sm rounded-full font-medium hover:bg-green-600 transition"
                  >
                    {active.ctaText}
                  </a>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Grid of Cards */}
      <ul className="max-w-7xl mx-auto w-full grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card) => (
          <motion.div
            layoutId={`card-${card.title}-${id}`}
            key={card.title}
            onClick={() => setActive(card)}
            className="bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl cursor-pointer p-4 transition duration-300 backdrop-blur-sm h-full flex flex-col"
          >
            <div className="w-full h-56 bg-gradient-to-br from-neutral-800 to-neutral-900 rounded-md flex items-center justify-center">
              {card.src ? (
                <Image
                  width={300}
                  height={300}
                  src={card.src}
                  alt={card.title}
                  className="rounded-md w-full h-full object-cover"
                />
              ) : (
                <div className="text-white/60 text-center p-4">
                  <svg 
                    xmlns="http://www.w3.org/2000/svg" 
                    width="48" 
                    height="48" 
                    viewBox="0 0 24 24" 
                    fill="none" 
                    stroke="currentColor" 
                    strokeWidth="1.5" 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    className="mx-auto mb-2"
                  >
                    <rect width="18" height="18" x="3" y="3" rx="2" ry="2" />
                    <circle cx="9" cy="9" r="2" />
                    <path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                  </svg>
                  <p className="text-sm">No image available</p>
                </div>
              )}
            </div>
            <div className="mt-4 space-y-1 flex-grow">
              <h3 className="text-lg font-semibold text-white">{card.title}</h3>
              <p className="text-sm text-neutral-400 line-clamp-2">{card.description}</p>
            </div>
          </motion.div>
        ))}
      </ul>
    </>
  );
}