// app/blog/BlogListGrid.tsx
'use client';

import type { BlogPostPreview } from "~/lib/getAllPostPreviews";
import BlogPreview from "./BlogPreview";

export default function BlogListGrid({ posts }: { posts: BlogPostPreview[] }) {
  return (
    <section className="max-w-7xl mx-auto mt-24 columns-1 sm:columns-2 md:columns-3 gap-6 space-y-6">
      {posts.map((post, idx) => (
        <BlogPreview key={post.slug} post={post} idx={idx} />
      ))}
    </section>
  );
}