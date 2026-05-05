"use client";

import { useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import type { BlogPostPreview } from "~/lib/getAllPostPreviews";

// ─── Skeleton ─────────────────────────────────────────────────────────────────

function CarouselSkeleton() {
  return (
    <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg">
      <div className="grid md:grid-cols-2 animate-pulse">
        <div className="w-full h-64 md:h-[340px] bg-white/10" />
        <div className="p-6 flex flex-col justify-center gap-3">
          <div className="h-3 w-24 rounded bg-white/10" />
          <div className="h-5 w-3/4 rounded bg-white/10" />
          <div className="h-3 w-full rounded bg-white/10" />
          <div className="h-3 w-5/6 rounded bg-white/10" />
          <div className="h-3 w-16 rounded bg-white/10 mt-2" />
        </div>
      </div>
    </div>
  );
}

// ─── Carousel ─────────────────────────────────────────────────────────────────

interface RecentPostsCarouselProps {
  posts: BlogPostPreview[];
  isLoading?: boolean;
  isError?: boolean;
}

export default function RecentPostsCarousel({
  posts,
  isLoading = false,
  isError = false,
}: RecentPostsCarouselProps) {
  const [index, setIndex] = useState(0);

  if (isLoading) {
    return (
      <section className="mt-24 text-white px-4 sm:px-6 md:px-0 w-full">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Recent Posts</h2>
        <CarouselSkeleton />
      </section>
    );
  }

  if (isError) {
    return (
      <section className="mt-24 text-white px-4 sm:px-6 md:px-0 w-full">
        <h2 className="text-2xl md:text-3xl font-semibold mb-6">Recent Posts</h2>
        <p className="text-sm text-neutral-400 italic">
          Could not load recent posts.
        </p>
      </section>
    );
  }

  if (posts.length === 0) return null;

  const current = posts[index]!;
  const showArrows = posts.length > 1;

  const prev = () =>
    setIndex((i) => (i - 1 + posts.length) % posts.length);
  const next = () =>
    setIndex((i) => (i + 1) % posts.length);

  return (
    <section className="mt-24 text-white px-4 sm:px-6 md:px-0 w-full">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Recent Posts</h2>

      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={current.slug}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2"
          >
            {/* Image — fill inside a sized container avoids the width/height + CSS override conflict */}
            <div className="relative w-full h-64 md:h-[340px] overflow-hidden">
              <Image
                src={current.coverImage ?? "/images/blog/fallback.jpg"}
                alt={current.title}
                fill
                sizes="(max-width: 768px) 100vw, 50vw"
                className="object-cover"
              />
            </div>

            <div className="p-6 flex flex-col justify-center">
              <p className="text-sm text-neutral-400 mb-2">
                {new Date(current.date).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <h3 className="text-xl font-semibold mb-2">{current.title}</h3>
              <p className="text-neutral-300 mb-4 line-clamp-3">{current.excerpt}</p>
              <Link
                href={`/blog/${current.slug}`}
                className="self-start text-sm text-cyan-400 hover:underline"
              >
                Read more →
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {showArrows && (
          <>
            <div className="absolute top-1/2 -translate-y-1/2 left-3 z-10">
              <button
                onClick={prev}
                aria-label="Previous post"
                className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
              >
                <FiChevronLeft size={20} />
              </button>
            </div>
            <div className="absolute top-1/2 -translate-y-1/2 right-3 z-10">
              <button
                onClick={next}
                aria-label="Next post"
                className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
              >
                <FiChevronRight size={20} />
              </button>
            </div>
          </>
        )}

        {/* Dot indicators */}
        {showArrows && (
          <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex gap-1.5 z-10">
            {posts.map((_, i) => (
              <button
                key={i}
                onClick={() => setIndex(i)}
                aria-label={`Go to post ${i + 1}`}
                className={`w-1.5 h-1.5 rounded-full transition-all ${
                  i === index ? "bg-white w-3" : "bg-white/30"
                }`}
              />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}