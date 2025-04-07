"use client";

import { cn } from "~/lib/utils";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export const InfiniteMovingCards = ({
  items,
  direction = "right",
  speed = "slow",
  pauseOnHover = true,
  className,
}: {
  items: {
    title: string;
    org: string;
    logo: string;
    description: string;
    link: string;
  }[];
  direction?: "left" | "right";
  speed?: "fast" | "normal" | "slow";
  pauseOnHover?: boolean;
  className?: string;
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const scrollerRef = useRef<HTMLUListElement>(null);
  const [start, setStart] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [scrollPosition, setScrollPosition] = useState(0);
  const [manualScrollPosition, setManualScrollPosition] = useState(0);
  const [animationKey, setAnimationKey] = useState(0);
  const [totalWidth, setTotalWidth] = useState(0);
  const [itemWidth, setItemWidth] = useState(0);

  useEffect(() => {
    const checkMobile = () => {
      const isMobileDevice = window.innerWidth < 768;
      setIsMobile(isMobileDevice);
      document.documentElement.style.setProperty(
        "--blur-strength",
        isMobileDevice ? "10px" : "30px"
      );
    };

    checkMobile();
    window.addEventListener("resize", checkMobile);
    return () => {
      window.removeEventListener("resize", checkMobile);
    };
  }, []);

  useEffect(() => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }

      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  }, [direction, speed]);

  useEffect(() => {
    if (scrollerRef.current) {
      const existingItems = scrollerRef.current.querySelectorAll("li");
      if (existingItems && existingItems.length > items.length) {
        for (let i = items.length; i < existingItems.length; i++) {
          existingItems[i]?.remove();
        }
      }

      const scrollerContent = Array.from(scrollerRef.current.children);
      for (let i = 0; i < 5; i++) {
        scrollerContent.forEach((item) => {
          const duplicatedItem = item.cloneNode(true);
          scrollerRef.current!.appendChild(duplicatedItem);
        });
      }

      setStart(true);
    }
  }, [items]);

  useEffect(() => {
    if (scrollerRef.current) {
      const width = scrollerRef.current.scrollWidth;
      setTotalWidth(width);
      const firstItem = scrollerRef.current.querySelector("li");
      if (firstItem) {
        const itemRect = firstItem.getBoundingClientRect();
        setItemWidth(itemRect.width);
      }
    }
  }, [start]);

  const handleMouseEnter = () => {
    if (pauseOnHover) {
      setIsPaused(true);
      if (scrollerRef.current) {
        scrollerRef.current.style.animationPlayState = "paused";
      }
    }
  };

  const handleMouseLeave = () => {
    if (pauseOnHover) {
      setIsPaused(false);
      if (scrollerRef.current) {
        const currentTransform = scrollerRef.current.style.transform;
        if (currentTransform) {
          const match = currentTransform.match(/translateX\(([-\d.]+)px\)/);
          if (match && match[1]) {
            setManualScrollPosition(parseFloat(match[1]));
          }
        }
        resetAnimationFromPosition();
      }
    }
  };

  const handleDragStart = () => {
    setIsDragging(true);
    setIsPaused(true);
    if (scrollerRef.current) {
      scrollerRef.current.style.animationPlayState = "paused";
    }
  };

  const handleDragEnd = () => {
    setIsDragging(false);
    if (scrollerRef.current) {
      const currentTransform = scrollerRef.current.style.transform;
      if (currentTransform) {
        const match = currentTransform.match(/translateX\(([-\d.]+)px\)/);
        if (match && match[1]) {
          setManualScrollPosition(parseFloat(match[1]));
        }
      }
    }
  };

  const handleDrag = (event: any, info: any) => {
    if (scrollerRef.current && totalWidth > 0 && itemWidth > 0) {
      const halfWidth = totalWidth / 2;
      const currentX = manualScrollPosition + info.offset.x;

      if (currentX < -halfWidth) {
        const newPosition = currentX + halfWidth;
        setManualScrollPosition(newPosition);
        scrollerRef.current.style.transform = `translateX(${newPosition}px)`;
      } else if (currentX > 0) {
        const newPosition = currentX - halfWidth;
        setManualScrollPosition(newPosition);
        scrollerRef.current.style.transform = `translateX(${newPosition}px)`;
      }
    }
  };

  const resetAnimationFromPosition = () => {
    setAnimationKey(prev => prev + 1);
    if (scrollerRef.current) {
      scrollerRef.current.style.transform = `translateX(${manualScrollPosition}px)`;
    }
  };

  const handleWheel = (e: React.WheelEvent) => {
    if (isPaused && scrollerRef.current) {
      e.preventDefault();
      const newPosition = scrollPosition + e.deltaX;
      setScrollPosition(newPosition);
      scrollerRef.current.style.transform = `translateX(${newPosition}px)`;
      setManualScrollPosition(newPosition);
    }
  };

  const handleTouchStart = () => {
    setIsPaused(true);
    if (scrollerRef.current) {
      scrollerRef.current.style.animationPlayState = "paused";
    }
  };

  return (
    <div
      className="flex flex-col items-center cursor-grab active:cursor-grabbing relative"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
    >
      <div className="pointer-events-none absolute inset-0 z-30">
        <div className="absolute inset-y-0 left-0 w-16 md:w-24 h-full bg-gradient-to-r from-black to-transparent" />
        <div className="absolute inset-y-0 right-0 w-16 md:w-24 h-full bg-gradient-to-l from-black to-transparent" />
      </div>

      <div
        ref={containerRef}
        className={cn("scroller relative z-20 w-full overflow-hidden", className)}
      >
        <motion.ul
          key={animationKey}
          ref={scrollerRef}
          drag={isPaused ? "x" : false}
          dragConstraints={{ left: -totalWidth, right: 0 }}
          dragElastic={0.1}
          onDragStart={handleDragStart}
          onDrag={handleDrag}
          onDragEnd={handleDragEnd}
          className={cn(
            "flex w-max min-w-full shrink-0 flex-nowrap gap-4 py-4",
            start && !isDragging && !isPaused && "animate-scroll",
            isMobile && "touch-pan-x"
          )}
          style={{
            transform: isPaused ? `translateX(${manualScrollPosition}px)` : undefined,
            willChange: "transform"
          }}
        >
          {items.map((item, idx) => (
            <li
              key={`${item.title}-${idx}`}
              className="w-[280px] md:w-[450px] shrink-0 rounded-2xl border border-zinc-700 bg-black/40 px-6 py-4 md:px-8 md:py-6 hover:scale-[1.01] hover:shadow-[0_0_20px_rgba(59,130,246,0.3)] transition-all duration-300 backdrop-blur-md"
            >
              <a href={item.link} target="_blank" rel="noopener noreferrer" className="block">
                <div className="flex items-center mb-4">
                <div className="h-10 w-10 rounded-full overflow-hidden bg-gradient-to-br from-blue-400/20 to-cyan-400/20 flex items-center justify-center">
                <img
    src={item.logo}
    alt={item.org}
    className="w-full h-auto object-contain"
  />
</div>
                  <div className="ml-3">
                    <h3 className="text-lg font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent">
                      {item.title}
                    </h3>
                    <p className="text-sm text-gray-400">{item.org}</p>
                  </div>
                </div>
                <p className="text-sm text-neutral-300">{item.description}</p>
              </a>
            </li>
          ))}
        </motion.ul>
      </div>

      <div className="mt-3 text-sm text-neutral-500 flex items-center gap-2">
        <span>← Drag to explore →</span>
      </div>
    </div>
  );
};