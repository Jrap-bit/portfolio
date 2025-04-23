// app/blog/BlogPreview.tsx
'use client';

import Link from "next/link";
import Image from "next/image";
import { formatDate } from "~/lib/utils";
import { MotionDiv } from "~/components/MotionWrapper";
import type { BlogPostPreview } from "~/lib/getAllPostPreviews";
import { useInView } from "framer-motion";
import { useRef } from "react";

export default function BlogPreview({ post, idx }: { post: BlogPostPreview; idx: number }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <MotionDiv
      ref={ref}
      initial={{ opacity: 0, y: 40 }}
      animate={isInView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay: idx * 0.05 }}
      className="group relative break-inside-avoid rounded-3xl bg-gradient-to-br from-black/60 via-black/30 to-black/60 backdrop-blur-lg p-5 shadow-md hover:shadow-cyan-400/20 transition duration-500 overflow-hidden"
    >
      <Link href={`/blog/${post.slug}`} className="block space-y-5">
        {/* Image */}
        {post.coverImage && (
          <div className="relative overflow-hidden rounded-xl shadow-md">
            <Image
              src={`/images/blog/${post.coverImage}`}
              alt={post.title}
              width={800}
              height={1000}
              className="w-full max-h-[500px] object-contain md:object-cover rounded-xl transition-transform duration-700 group-hover:scale-[1.04]"
              {...(post.blurDataURL
                ? { placeholder: "blur", blurDataURL: post.blurDataURL }
                : {})}
            />
            {/* Glow border around image */}
            <div className="absolute inset-0 border border-white/10 group-hover:border-white/30 rounded-xl transition duration-500 pointer-events-none" />
            {/* Soft shadow mask */}
            <div className="absolute inset-0 rounded-xl bg-black/0 group-hover:bg-black/10 transition-colors duration-500" />
          </div>
        )}

        {/* Text */}
        <div className="space-y-2 relative">
          <p className="text-xs text-muted-foreground tracking-wider uppercase">
            {formatDate(post.date)} · {post.readTime} min read
          </p>
          <h3 className="text-2xl font-semibold text-white relative z-10 transition-all duration-500 group-hover:tracking-wide">
            {post.title}
          </h3>
          <p className="text-sm text-muted-foreground line-clamp-3 group-hover:text-white/80 transition-colors duration-300">
            {post.excerpt}
          </p>

          {/* Hover underline */}
          <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-cyan-500 transition-all duration-500 group-hover:w-1/2" />
        </div>

        {/* Floating Share Icon */}
        <div className="absolute top-6 right-6 opacity-0 group-hover:opacity-100 transition-opacity duration-500">
          <span className="inline-flex items-center justify-center px-2 py-1 text-xs rounded-full bg-gradient-to-r from-neutral-700 to-neutral-900 text-white shadow-md">
            ↗
          </span>
        </div>
      </Link>
    </MotionDiv>
  );
}
