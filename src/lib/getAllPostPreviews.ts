// lib/getAllPostPreviews.ts

import { getPlaiceholder } from "plaiceholder";
import fs from "fs";
import path from "path";
import { unstable_cache } from "next/cache";
import { notion } from "~/lib/notion";
import { getAllPosts } from "./getAllPosts";

export interface BlogPostPreview {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  coverImage: string | null;
  wordCount: number;
}

// Cached per image URL — only generates once, then served from cache.
// Called client-side via /api/blur-hash?url=...
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
  { revalidate: false, tags: ["blur-data-url"] }
);

// Fetches all block content for a page and counts words across all text blocks.
// Handles pagination in case the post has more than 100 blocks.
async function getPageWordCount(pageId: string): Promise<number> {
  let wordCount = 0;
  let cursor: string | undefined = undefined;

  // Block types that carry rich_text we want to count
  const textBlockTypes = new Set([
    "paragraph",
    "heading_1",
    "heading_2",
    "heading_3",
    "bulleted_list_item",
    "numbered_list_item",
    "toggle",
    "quote",
    "callout",
  ]);

  do {
    const response = await notion.blocks.children.list({
      block_id: pageId,
      ...(cursor ? { start_cursor: cursor } : {}),
    });

    for (const block of response.results) {
      if (!("type" in block)) continue;
      if (!textBlockTypes.has(block.type)) continue;

      const blockContent = (block as any)[block.type];
      const richText: any[] = blockContent?.rich_text ?? [];
      const text = richText.map((t: any) => t.plain_text ?? "").join(" ");
      wordCount += text.split(/\s+/).filter(Boolean).length;
    }

    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return wordCount;
}

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

    // Count words from actual page content
    const wordCount = await getPageWordCount(page.id);
    const readTime = Math.max(1, Math.ceil(wordCount / 200));

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