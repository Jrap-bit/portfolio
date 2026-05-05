// lib/getAllPostPreviews.ts

import { getPlaiceholder } from "plaiceholder";
import fs from "fs";
import path from "path";
import { unstable_cache } from "next/cache";
import { getAllPosts } from "./getAllPosts";

export interface BlogPostPreview {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  coverImage: string | null;
  wordCount: number;
  // blurDataURL is intentionally omitted here — fetched lazily per-post
}

// Cached per image URL — only generates once, then served from cache.
// Called client-side via /api/blur-hash?url=... (see route handler below).
export const getBlurDataURL = unstable_cache(
  async (rawCover: string): Promise<string | null> => {
    try {
      const isRemoteUrl =
        rawCover.startsWith("http://") || rawCover.startsWith("https://");

      if (isRemoteUrl) {
        const response = await fetch(rawCover);
        if (!response.ok) return null;
        const buffer = Buffer.from(await response.arrayBuffer());
        const { base64 } = await getPlaiceholder(buffer);
        return base64;
      } else {
        const fileName = rawCover.split("/").pop();
        if (!fileName) return null;
        const imagePath = path.join(
          process.cwd(),
          "public",
          "images",
          "blog",
          fileName
        );
        const buffer = fs.readFileSync(imagePath);
        const { base64 } = await getPlaiceholder(buffer);
        return base64;
      }
    } catch (err) {
      console.warn("Could not generate blurDataURL for", rawCover, err);
      return null;
    }
  },
  ["blur-data-url"],
  // Blur hashes never change for a given image — cache indefinitely
  { revalidate: false, tags: ["blur-data-url"] }
);

async function processPost(
  slug: string,
  page: any
): Promise<BlogPostPreview | null> {
  try {
    if (!page) return null;

    const props = page.properties;

    const seen =
      props["Seen"]?.type === "checkbox" ? props["Seen"].checkbox : false;
    if (!seen) return null;

    const title =
      props["Title"]?.type === "title"
        ? props["Title"].title?.[0]?.plain_text ?? "Untitled"
        : "Untitled";

    const excerpt =
      props["Excerpt"]?.type === "rich_text"
        ? props["Excerpt"].rich_text?.[0]?.plain_text ?? ""
        : "";

    const date =
      props["Date"]?.type === "date"
        ? props["Date"].date?.start ?? ""
        : "";

    const excerptWordCount = excerpt.split(/\s+/).filter(Boolean).length;
    const wordCount = excerptWordCount > 0 ? excerptWordCount * 12 : 500;
    const readTime = Math.ceil(wordCount / 200) || 1;

    const rawCover =
      props["Cover"]?.type === "rich_text"
        ? props["Cover"].rich_text?.[0]?.plain_text ?? null
        : null;

    const isRemoteUrl =
      rawCover?.startsWith("http://") === true ||
      rawCover?.startsWith("https://") === true;

    const coverImage = rawCover
      ? isRemoteUrl
        ? rawCover
        : `/images/blog/${rawCover}`
      : null;

    return { slug, title, excerpt, date, coverImage, readTime, wordCount };
  } catch (error) {
    console.error(`Failed to process post ${slug}:`, error);
    return null;
  }
}

async function fetchAllPostPreviews(): Promise<BlogPostPreview[]> {
  const posts = await getAllPosts();

  const results = await Promise.all(
    posts.map(({ slug, page }) => processPost(slug, page))
  );

  return results.filter((post): post is BlogPostPreview => post !== null);
}

export const getAllPostPreviews = unstable_cache(
  fetchAllPostPreviews,
  ["blog-previews"],
  { revalidate: 60, tags: ["blog-previews"] }
);