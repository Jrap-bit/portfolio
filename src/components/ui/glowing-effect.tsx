"use client";

import { memo, useCallback, useEffect, useRef } from "react";
import { animate } from "motion";
import { cn } from "~/lib/utils";

interface GlowingEffectProps {
  blur?: number;
  inactiveZone?: number;
  proximity?: number;
  spread?: number;
  variant?: "default" | "white";
  glow?: boolean;
  className?: string;
  disabled?: boolean;
  movementDuration?: number;
  borderWidth?: number;
}

const GlowingEffect = memo(({
  blur = 0,
  inactiveZone = 0.7,
  proximity = 0,
  spread = 20,
  variant = "default",
  glow = false,
  className,
  disabled = true,
  movementDuration = 2,
  borderWidth = 1,
}: GlowingEffectProps) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const lastPosition = useRef({ x: 0, y: 0 });
  const animationFrameRef = useRef<number>(0);

  const handleMove = useCallback((e?: MouseEvent | { x: number; y: number }) => {
    const element = containerRef.current;
    if (!element) return;

    if (animationFrameRef.current) cancelAnimationFrame(animationFrameRef.current);

    animationFrameRef.current = requestAnimationFrame(() => {
      const rect = element.getBoundingClientRect();
      const { left, top, width, height } = rect;

      if (width === 0 || height === 0) return;

      const mouseX = e?.x ?? lastPosition.current.x;
      const mouseY = e?.y ?? lastPosition.current.y;
      if (e) lastPosition.current = { x: mouseX, y: mouseY };

      const centerX = left + width * 0.5;
      const centerY = top + height * 0.5;
      const distance = Math.hypot(mouseX - centerX, mouseY - centerY);
      const radius = 0.5 * Math.min(width, height) * inactiveZone;

      if (distance < radius) {
        element.style.setProperty("--active", "0");
        return;
      }

      const isActive =
        mouseX > left - proximity &&
        mouseX < left + width + proximity &&
        mouseY > top - proximity &&
        mouseY < top + height + proximity;

      element.style.setProperty("--active", isActive ? "1" : "0");
      if (!isActive) return;

      const currentAngle = parseFloat(element.style.getPropertyValue("--start")) || 0;
      const targetAngle = (180 * Math.atan2(mouseY - centerY, mouseX - centerX)) / Math.PI + 90;
      const diff = ((targetAngle - currentAngle + 180) % 360) - 180;
      const newAngle = currentAngle + diff;

      animate(currentAngle, newAngle, {
        duration: movementDuration,
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (val) => element.style.setProperty("--start", String(val))
      });
    });
  }, [inactiveZone, proximity, movementDuration]);

  useEffect(() => {
    if (disabled) return;

    const onScroll = () => handleMove();
    const onPointer = (e: PointerEvent) => handleMove(e);

    window.addEventListener("scroll", onScroll, { passive: true });
    document.body.addEventListener("pointermove", onPointer, { passive: true });

    return () => {
      cancelAnimationFrame(animationFrameRef.current);
      window.removeEventListener("scroll", onScroll);
      document.body.removeEventListener("pointermove", onPointer);
    };
  }, [handleMove, disabled]);

  const gradient = variant === "white"
    ? `repeating-conic-gradient(from 236.84deg at 50% 50%, var(--black), var(--black) calc(25% / var(--repeating-conic-gradient-times)))`
    : `radial-gradient(circle, #00e0ff 10%, #00e0ff00 20%),
       radial-gradient(circle at 40% 40%, #006eff 5%, #006eff00 15%),
       radial-gradient(circle at 60% 60%, #00d1ff 10%, #00d1ff00 20%),
       radial-gradient(circle at 40% 60%, #6bfffc 10%, #6bfffc00 20%),
       repeating-conic-gradient(from 236.84deg at 50% 50%, #00e0ff 0%, #006eff calc(25% / var(--repeating-conic-gradient-times)), #00d1ff calc(50% / var(--repeating-conic-gradient-times)), #6bfffc calc(75% / var(--repeating-conic-gradient-times)), #00e0ff calc(100% / var(--repeating-conic-gradient-times)))`;

  return (
    <>
      <div
        className={cn(
          "pointer-events-none absolute -inset-px hidden rounded-[inherit] border opacity-0 transition-opacity",
          glow && "opacity-100",
          variant === "white" && "border-white",
          disabled && "!block"
        )}
      />
      <div
        ref={containerRef}
        style={{
          "--blur": `${blur}px`,
          "--spread": spread,
          "--start": "0",
          "--active": "0",
          "--glowingeffect-border-width": `${borderWidth}px`,
          "--repeating-conic-gradient-times": "5",
          "--gradient": gradient,
        } as React.CSSProperties}
        className={cn(
          "pointer-events-none absolute inset-0 rounded-[inherit] transition-opacity",
          glow && "opacity-100",
          blur > 0 && "blur-[var(--blur)]",
          className,
          disabled && "!hidden"
        )}
      >
        <div
          className={cn(
            "glow",
            "rounded-[inherit]",
            'after:content-["\""] after:rounded-[inherit] after:absolute after:inset-[calc(-1*var(--glowingeffect-border-width))]',
            "after:[border:var(--glowingeffect-border-width)_solid_transparent]",
            "after:[background:var(--gradient)] after:[background-attachment:fixed]",
            "after:opacity-[var(--active)] after:transition-opacity after:duration-300",
            "after:[mask-clip:padding-box,border-box]",
            "after:[mask-composite:intersect]",
            "after:[mask-image:linear-gradient(#0000,#0000),conic-gradient(from_calc((var(--start)-var(--spread))*1deg),#00000000_0deg,#fff,#00000000_calc(var(--spread)*2deg))]"
          )}
        />
      </div>
    </>
  );
});

GlowingEffect.displayName = "GlowingEffect";
export { GlowingEffect };
