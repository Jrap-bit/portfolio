'use client';

import dynamic from 'next/dynamic';
import type { BlogPostPreview } from '~/lib/getAllPostPreviews';

const BlogListGrid = dynamic(() => import('./BlogListGrid'), { ssr: false });

export default function BlogListWrapper({ posts }: { posts: BlogPostPreview[] }) {
  return <BlogListGrid posts={posts} />;
}