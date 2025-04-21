'use client';

import type { BlogPostPreview } from "~/lib/getAllPostPreviews";
import BlogPreview from "./BlogPreview";

const Masonry = require("react-masonry-css").default;

const breakpointColumnsObj = {
  default: 3,
  1024: 2,
  640: 1,
};

export default function BlogListGrid({ posts }: { posts: BlogPostPreview[] }) {
  return (
    <div className="px-4 mt-24 max-w-7xl mx-auto">
      <Masonry
        breakpointCols={breakpointColumnsObj}
        className="flex gap-6"
        columnClassName="space-y-6"
      >
        {posts.map((post, idx) => (
          <BlogPreview key={post.slug} post={post} idx={idx} />
        ))}
      </Masonry>
    </div>
  );
}