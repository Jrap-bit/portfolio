import { useRef, useEffect } from 'react';

export default function VantaNetBackground() {
  const vantaRef = useRef<HTMLDivElement>(null);
  const effectRef = useRef<any>(null);

  useEffect(() => {
    // Dynamically import THREE and Vanta inside useEffect so they
    // never execute during SSR (localStorage is not available server-side).
    let cancelled = false;

    void (async () => {
      const THREE = await import('three');
      const { default: NET } = await import('vanta/dist/vanta.net.min');

      if (cancelled || effectRef.current || !vantaRef.current) return;

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
    })();

    return () => {
      cancelled = true;
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