// app/blog/FeaturedPost.tsx
'use client';

import Image from "next/image";
import Link from "next/link";
import { formatDate } from "~/lib/utils";
import { MotionDiv } from "~/components/MotionWrapper";
import type { BlogPostPreview } from "~/lib/getAllPostPreviews";

export default function FeaturedPost({ post }: { post: BlogPostPreview }) {
  return (
    <Link href={`/blog/${post.slug}`}>
      <MotionDiv
        initial={{ opacity: 0, y: 24 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative group overflow-hidden rounded-3xl bg-black/50 backdrop-blur-lg shadow-xl hover:shadow-cyan-500/10 transition-shadow duration-500"
      >
        {post.coverImage && (
          <div className="relative">
            <Image
              src={`/images/blog/${post.coverImage}`}
              alt={post.title}
              width={1600}
              height={800}
              className="w-full h-[600px] object-cover rounded-3xl transition-transform duration-700 group-hover:scale-[1.02]"
              priority
            />
            {/* Glow border */}
            <div className="absolute inset-0 rounded-3xl border border-white/10 group-hover:border-white/20 transition" />
            {/* Overlay fade */}
            <div className="absolute inset-0 rounded-3xl bg-gradient-to-t from-black/80 via-black/40 to-transparent" />
          </div>
        )}

        <div className="absolute inset-0 px-10 py-8 flex flex-col justify-end z-10">
          <p className="text-sm text-muted-foreground">
            {formatDate(post.date)} · {post.readTime} min read
          </p>
          <h2 className="text-4xl font-bold mt-2 text-white leading-snug group-hover:tracking-wide transition-all">
            {post.title}
          </h2>
          <p className="text-md mt-3 text-white/80 max-w-2xl line-clamp-3">
            {post.excerpt}
          </p>
        </div>
      </MotionDiv>
    </Link>
  );
}
