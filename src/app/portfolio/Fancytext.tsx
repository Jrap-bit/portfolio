"use client";

import React, { useState } from "react";

export default function FancyText({
  text,
  className = "",
}: {
  text: string;
  className?: string; // e.g. "text-5xl font-bold"
}) {
  // Track background gradient center as percentages.
  const [bgPos, setBgPos] = useState({ x: 50, y: 50 });

  // Calculate mouse position relative to the container div.
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setBgPos({ x, y });
  };

  return (
    <div
      className={`relative inline-block group ${className}`}
      onMouseMove={handleMouseMove}
    >
      {/* Top Layer: Plain Text */}
      <span
        className="
          block
          transition-opacity
          duration-300
          group-hover:opacity-0
        "
      >
        {text}
      </span>

      {/* Bottom Layer: Gradient Text */}
      <span
        className="
          pointer-events-none
          absolute
          inset-0
          block
          text-transparent
          bg-clip-text
          opacity-0
          transition-opacity
          duration-300
          group-hover:opacity-100
        "
        style={{
          // Use a radial gradient centered on the mouse position.
          backgroundImage: `radial-gradient(circle at ${bgPos.x}% ${bgPos.y}%, #ce84f9, #89baef, #2af0d9)`,
        }}
      >
        {text}
      </span>
    </div>
  );
}