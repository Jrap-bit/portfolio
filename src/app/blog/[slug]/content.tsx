"use client";

import { renderBlocks } from "~/lib/notion-renderer";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { FiTwitter, FiLinkedin, FiLink } from "react-icons/fi";
import { toast } from "react-hot-toast";
import BlogEngagement from "./BlogEngagement";
import { api } from "~/trpc/react";

interface ContentRendererProps {
  blocks: BlockObjectResponse[];
  title: string;
  readTime: number;
  wordCount: number;
  slug: string;
}

function ShareButton({
  platform,
  children,
  onClick,
  showCopied,
}: {
  platform: string;
  children: React.ReactNode;
  onClick: () => void;
  showCopied?: boolean;
}) {
  return (
    <div className="relative">
      <motion.button
        onClick={onClick}
        className="p-3 rounded-full bg-black/70 hover:bg-black/90 transition-shadow shadow-lg"
        aria-label={`Share on ${platform}`}
        whileHover={{ scale: 1.15, boxShadow: "0 0 15px rgba(255,255,255,0.3)" }}
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 10 }}
      >
        {children}
      </motion.button>

      {platform === "copy" && showCopied && (
        <AnimatePresence>
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.8 }}
            transition={{ type: "spring", stiffness: 500, damping: 20 }}
            className="absolute -top-10 left-1/2 transform -translate-x-1/2 bg-black/90 text-white text-xs py-1 px-2 rounded whitespace-nowrap"
          >
            Copied!
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
}

export default function ContentRenderer({
  blocks,
  title,
  slug,
}: ContentRendererProps) {
  const [copied, setCopied] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [showMobileDrawer, setShowMobileDrawer] = useState(false);
  const contentEndRef = useRef<HTMLDivElement>(null);
  const utils = api.useUtils();

  const viewMutation = api.views.increment.useMutation({
    onSuccess: async () => {
      await utils.views.get.invalidate({ slug });
    },
  });
  
  const { data: viewCount } = api.views.get.useQuery({ slug }, { enabled: !!slug });
  
  useEffect(() => {
    viewMutation.mutate({ slug });
  }, [slug]);

  useEffect(() => {
    const handleScroll = () => {
      setShowScrollTop(window.scrollY > 500);
    };
    window.addEventListener("scroll", handleScroll);
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const url = typeof window !== "undefined" ? window.location.href : "";

  const handleShare = async (platform: string) => {
    try {
      switch (platform) {
        case "twitter":
          window.open(
            `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`,
            "_blank"
          );
          break;
        case "linkedin":
          window.open(
            `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
            "_blank"
          );
          break;
        case "copy":
          await navigator.clipboard.writeText(url);
          setCopied(true);
          toast.success("Link copied!");
          setTimeout(() => setCopied(false), 2000);
          break;
      }
    } catch {
      toast.error("Could not share");
    }
  };

  return (
    <div className="relative">
      <main className="max-w-5xl mx-auto px-6 pt-24 pb-16 text-white">

        {/* Floating Share Bar (Desktop Only) */}
        <AnimatePresence>
          {showScrollTop && (
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.3 }}
              className="fixed left-4 top-1/2 transform -translate-y-1/2 sm:flex flex-col space-y-4 z-20 hidden md:flex"
            >
              <ShareButton platform="Twitter" onClick={() => handleShare("twitter")}>
                <FiTwitter className="text-blue-400" size={20} />
              </ShareButton>
              <ShareButton platform="LinkedIn" onClick={() => handleShare("linkedin")}>
                <FiLinkedin className="text-blue-500" size={20} />
              </ShareButton>
              <ShareButton
                platform="Copy Link"
                onClick={() => handleShare("copy")}
                showCopied={copied}
              >
                <FiLink className="text-neutral-200" size={20} />
              </ShareButton>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Blog Content */}
        <article className="mt-12 space-y-8">
          {blocks.map((block, i) => {
            const isHeading =
              block.type === "heading_1" ||
              block.type === "heading_2" ||
              block.type === "heading_3";

            const MotionWrapper = ({ children }: { children: React.ReactNode }) => {
              const ref = useRef(null);
              const isInView = useInView(ref, { once: true, margin: "-100px" });

              return (
                <motion.div
                  ref={ref}
                  initial={{ opacity: 0, y: 30 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    duration: 0.6,
                    delay: i * 0.05,
                    ease: [0.22, 1, 0.36, 1],
                  }}
                  className="prose-custom"
                >
                  {children}
                </motion.div>
              );
            };

            return isHeading ? (
              <MotionWrapper key={block.id}>
                {renderBlocks([block])}
              </MotionWrapper>
            ) : (
              <motion.div
                key={block.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="prose-custom"
              >
                {renderBlocks([block])}
              </motion.div>
            );
          })}
        </article>

        <div ref={contentEndRef} className="" />

        {/* Mobile Share Trigger Button */}
        <div className="md:hidden mt-15 flex justify-center">
          <button
            onClick={() => setShowMobileDrawer(true)}
            className="text-base text-neutral-300 bg-black/60 px-4 py-2 rounded-md backdrop-blur-md border border-white/20 hover:border-blue-400 transition"
          >
            Share this post
          </button>
        </div>

        {/* Mobile Share Drawer */}
        <AnimatePresence>
          {showMobileDrawer && (
            <motion.div
              className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-end md:hidden"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowMobileDrawer(false)}
            >
              <motion.div
                className="w-full bg-neutral-900 rounded-t-2xl p-6 border-t border-white/10"
                initial={{ y: 100 }}
                animate={{ y: 0 }}
                exit={{ y: 100 }}
                transition={{ type: "spring", stiffness: 300, damping: 30 }}
                onClick={(e) => e.stopPropagation()}
              >
                <p className="text-center text-sm text-neutral-400 mb-4">Share this post</p>
                <div className="flex justify-around">
                  <ShareButton platform="Twitter" onClick={() => handleShare("twitter")}>
                    <FiTwitter className="text-blue-400" size={20} />
                  </ShareButton>
                  <ShareButton platform="LinkedIn" onClick={() => handleShare("linkedin")}>
                    <FiLinkedin className="text-blue-500" size={20} />
                  </ShareButton>
                  <ShareButton
                    platform="Copy Link"
                    onClick={() => handleShare("copy")}
                    showCopied={copied}
                  >
                    <FiLink className="text-neutral-200" size={20} />
                  </ShareButton>
                </div>
                <button
                  onClick={() => setShowMobileDrawer(false)}
                  className="mt-6 w-full text-sm text-neutral-400 text-center"
                >
                  Close
                </button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <BlogEngagement slug={slug} viewCount={viewCount} />


        {/* Global Font Styling */}
        <style jsx global>{`
          @import url('https://api.fontshare.com/v2/css?f[]=satoshi@400,500,600&display=swap');

          html {
            scroll-behavior: smooth;
          }
          .prose-custom {
            font-family: 'Satoshi', sans-serif;
            font-weight: 400;
            color: #e5e7eb;
            font-size: 1.25rem;
            line-height: 1.8;
            letter-spacing: -0.015em;
          }
          .prose-custom h1,
          .prose-custom h2,
          .prose-custom h3 {
            font-weight: 600;
            color: #f3f4f6;
            margin-top: 2.25rem;
            margin-bottom: 0.2rem;
          }
          .prose-custom p {
            margin-bottom: 1.8rem;
          }

          .prose-custom code {
            background-color: rgba(255, 255, 255, 0.1);
            padding: 0.2rem 0.4rem;
            border-radius: 0.25rem;
            font-size: 0.9rem;
            color: #e5e7eb;
          }
          .prose-custom blockquote {
            border-left: 4px solid rgba(255, 255, 255, 0.2);
            padding-left: 1rem;
            margin: 1.5rem 0;
            font-style: italic;
            color: #d1d5db;
          }

          @media (max-width: 640px) {
            .prose-custom {
              font-size: 1.03rem;
              line-height: 1.65;
              font-weight: 400;
            }

            .prose-custom h1 {
              font-size: 1.5rem;
              font-weight: 600;
            }

            .prose-custom h2 {
              font-size: 1.25rem;
              font-weight: 500;
            }

            .prose-custom h3 {
              font-size: 1.125rem;
              font-weight: 500;
            }
          }
        `}</style>
      </main>
    </div>
  );
}