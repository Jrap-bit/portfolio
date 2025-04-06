"use client";
import { cn } from "~/lib/utils";
import React, { useEffect, useState, useRef } from "react";
import { motion } from "framer-motion";

export const InfiniteMovingCards = ({
  items,
  direction = "right",
  speed = "fast",
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

  // Detect if device is mobile
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => {
      window.removeEventListener('resize', checkMobile);
    };
  }, []);

  useEffect(() => {
    addAnimation();
  }, []);

  // Calculate total width after items are duplicated
  useEffect(() => {
    if (scrollerRef.current) {
      const width = scrollerRef.current.scrollWidth;
      setTotalWidth(width);
      
      // Calculate the width of a single item
      const firstItem = scrollerRef.current.querySelector('li');
      if (firstItem) {
        const itemRect = firstItem.getBoundingClientRect();
        setItemWidth(itemRect.width);
      }
    }
  }, [start]);

  function addAnimation() {
    if (containerRef.current && scrollerRef.current) {
      const scrollerContent = Array.from(scrollerRef.current.children);
      
      // Clear any existing duplicated items
      const existingItems = scrollerRef.current.querySelectorAll('li');
      if (existingItems && existingItems.length > items.length) {
        for (let i = items.length; i < existingItems.length; i++) {
          existingItems[i]?.remove();
        }
      }

      // Duplicate each child once
      scrollerContent.forEach((item) => {
        const duplicatedItem = item.cloneNode(true);
        scrollerRef.current!.appendChild(duplicatedItem);
      });

      getDirection();
      getSpeed();
      setStart(true);
    }
  }

  const getDirection = () => {
    if (containerRef.current) {
      if (direction === "left") {
        containerRef.current.style.setProperty("--animation-direction", "forwards");
      } else {
        containerRef.current.style.setProperty("--animation-direction", "reverse");
      }
    }
  };

  const getSpeed = () => {
    if (containerRef.current) {
      if (speed === "fast") {
        containerRef.current.style.setProperty("--animation-duration", "20s");
      } else if (speed === "normal") {
        containerRef.current.style.setProperty("--animation-duration", "40s");
      } else {
        containerRef.current.style.setProperty("--animation-duration", "80s");
      }
    }
  };

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
      // Capture the current position before resuming animation
      if (scrollerRef.current) {
        const currentTransform = scrollerRef.current.style.transform;
        if (currentTransform) {
          const match = currentTransform.match(/translateX\(([-\d.]+)px\)/);
          if (match && match[1]) {
            setManualScrollPosition(parseFloat(match[1]));
          }
        }
        // Reset animation with new starting position
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
    // Capture the final position after dragging
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
      
      // If we've dragged past the halfway point, wrap around
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
    // Increment animation key to force re-render
    setAnimationKey(prev => prev + 1);
    
    // Apply the manual scroll position to the scroller
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

  // Handle touch events for mobile
  const handleTouchStart = () => {
    setIsPaused(true);
    if (scrollerRef.current) {
      scrollerRef.current.style.animationPlayState = "paused";
    }
  };

  return (
    <div 
      className="flex flex-col items-center cursor-grab active:cursor-grabbing"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onWheel={handleWheel}
      onTouchStart={handleTouchStart}
    >
      <div
        ref={containerRef}
        className={cn(
          "scroller relative z-20 w-full overflow-hidden",
          className,
        )}
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
              className="relative w-[280px] max-w-full shrink-0 rounded-2xl border border-b-0 border-zinc-200 bg-[linear-gradient(180deg,#fafafa,#f5f5f5)] px-6 py-4 md:w-[450px] md:px-8 md:py-6 dark:border-zinc-700 dark:bg-[linear-gradient(180deg,#27272a,#18181b)]"
            >
              <a
                href={item.link}
                target="_blank"
                rel="noopener noreferrer"
                className="block"
              >
                <div className="flex items-center mb-3 md:mb-4">
                  <img
                    src={item.logo}
                    alt={item.org}
                    className="h-8 w-8 md:h-10 md:w-10 object-contain mr-2"
                  />
                  <div>
                    <h3 className="text-base md:text-lg font-bold text-neutral-800 dark:text-gray-100">
                      {item.title}
                    </h3>
                    <p className="text-xs md:text-sm text-neutral-500 dark:text-gray-400">
                      {item.org}
                    </p>
                  </div>
                </div>
                <p className="text-xs md:text-sm text-neutral-700 dark:text-gray-300">
                  {item.description}
                </p>
              </a>
            </li>
          ))}
        </motion.ul>
      </div>
      
      <div className="mt-2 flex items-center justify-center text-sm text-neutral-500 dark:text-neutral-400">
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="mr-1"
        >
          <path d="M21 12H3M3 12L9 6M3 12L9 18" />
        </svg>
        <span>Drag to explore</span>
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          width="16" 
          height="16" 
          viewBox="0 0 24 24" 
          fill="none" 
          stroke="currentColor" 
          strokeWidth="2" 
          strokeLinecap="round" 
          strokeLinejoin="round" 
          className="ml-1"
        >
          <path d="M3 12H21M21 12L15 6M21 12L15 18" />
        </svg>
      </div>
    </div>
  );
};