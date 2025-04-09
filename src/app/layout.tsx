import "~/styles/globals.css";

import { type Metadata } from "next";
import { Analytics } from '@vercel/analytics/react';
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";

export const metadata: Metadata = {
  title: "Portal to My World",
  description: "Welcome to my digital realm, where creativity meets technology. Go through my portfolio or explore my blog to see what I'm up to.",
  icons: [{ rel: "icon", url: "/favicon.png" }],
};

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`dark ${geist.variable}`}>
      <body className="overscroll-x-auto">
        <TRPCReactProvider>{children}</TRPCReactProvider>
        <Analytics />
      </body>
    </html>
  );
}
