import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import NET from 'vanta/dist/vanta.net.min';

export default function VantaNetBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<any>(null);

  useEffect(() => {
    if (!effectRef.current && vantaRef.current) {
      effectRef.current = NET({
        el: vantaRef.current,
        THREE,
        mouseControls: true,
        touchControls: true,
        minHeight: 200.0,
        minWidth: 200.0,
        scale: 1.0,
        scaleMobile: 1.0,
        color: 0x3b82f6,
        backgroundColor: 0x00000000,
      });
    }

    return () => {
      effectRef.current?.destroy();
      effectRef.current = null;
    };
  }, []);

  return (
    <div
      ref={vantaRef}
      className="absolute inset-0 w-screen h-screen pointer-events-none z-0"
    />
  );
}