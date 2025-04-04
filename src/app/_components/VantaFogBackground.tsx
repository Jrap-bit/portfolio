import { useRef, useEffect } from 'react';
import * as THREE from 'three';
import FOG from 'vanta/dist/vanta.fog.min';

export default function VantaFogBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<any>(null);

  useEffect(() => {
    if (!effectRef.current && vantaRef.current) {
      effectRef.current = FOG({
        el: vantaRef.current,
        THREE,
        highlightColor: 0xffb6c1,
        midtoneColor: 0xccccff,
        lowlightColor: 0x663399,
        baseColor: 0x1a1a2e,
        blurFactor: 0.5,
        speed: 5,
        zoom: 1.5,
        scale: 1.2,
        scaleMobile: 0.8,
        minHeight: 200.0,
        minWidth: 200.0,
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