// lib/shimmer.ts

export function shimmer(width: number, height: number) {
    return `
      <svg width="${width}" height="${height}" viewBox="0 0 ${width} ${height}" xmlns="http://www.w3.org/2000/svg" preserveAspectRatio="none">
        <defs>
          <linearGradient id="g">
            <stop stop-color="#333" offset="20%" />
            <stop stop-color="#222" offset="50%" />
            <stop stop-color="#333" offset="70%" />
          </linearGradient>
        </defs>
        <rect width="${width}" height="${height}" fill="#333" />
        <rect id="r" width="${width}" height="${height}" fill="url(#g)" />
        <animate xlink:href="#r" attributeName="x" from="-${width}" to="${width}" dur="1s" repeatCount="indefinite"  />
      </svg>`;
  }
  
  export function toBase64(str: string) {
    return typeof window === "undefined"
      ? Buffer.from(str).toString("base64")
      : window.btoa(str);
  }