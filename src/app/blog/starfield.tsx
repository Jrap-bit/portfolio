"use client";

import { useEffect, useRef } from "react";

export default function StarfieldBackground() {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const maybeCtx = canvas.getContext("2d");
    if (!(maybeCtx instanceof CanvasRenderingContext2D)) return;
    const ctx = maybeCtx;

    let width = window.innerWidth;
    let height = window.innerHeight;
    canvas.width = width;
    canvas.height = height;

    let stars = Array.from({ length: 1000 }, () => createStar(width, height));

    function createStar(w: number, h: number) {
      return {
        x: Math.random() * w,
        y: Math.random() * h,
        radius: Math.random() * 1.1,
        alpha: Math.random(),
        dx: -0.2 + Math.random() * 0.4,
        dy: -0.2 + Math.random() * 0.4,
      };
    }

    function draw() {
      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, width, height);

      for (let star of stars) {
        ctx.beginPath();
        ctx.arc(star.x, star.y, star.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(255, 255, 255, ${star.alpha})`;
        ctx.fill();

        star.x += star.dx;
        star.y += star.dy;

        // bounce or wrap
        if (star.x < 0 || star.x > width) star.dx *= -1;
        if (star.y < 0 || star.y > height) star.dy *= -1;
      }

      requestAnimationFrame(draw);
    }

    draw();

    const handleResize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = width;
      canvas.height = height;
      stars = Array.from({ length: 200 }, () => createStar(width, height));
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed top-0 left-0 z-0 w-full h-full pointer-events-none opacity-90"
    />
  );
}
