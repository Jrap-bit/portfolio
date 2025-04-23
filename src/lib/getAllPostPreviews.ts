// lib/getAllPostPreviews.ts

import { getPageMetadata, getPageContent } from "~/lib/notion";
import { getAllPosts } from "./getAllPosts";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getPlaiceholder } from "plaiceholder";
import fs from "fs";
import path from "path";

export interface BlogPostPreview {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  coverImage: string | null;
  wordCount: number;
  blurDataURL: string | null;
}

export async function getAllPostPreviews(): Promise<BlogPostPreview[]> {
  const posts = await getAllPosts();

  const results = await Promise.all(
    posts.map(async ({ slug }) => {
      const page = await getPageMetadata(slug);
      if (!page) return null;

      const blocks = await getPageContent(page.id);

      const wordCount = blocks
        .filter(
          (block): block is BlockObjectResponse =>
            "type" in block && block.type !== undefined
        )
        .filter((block) => block.type === "paragraph")
        .flatMap((block) => block.paragraph.rich_text)
        .flatMap((text) => text.plain_text.split(/\s+/))
        .filter(Boolean).length;

      const props = page.properties;

      const seen = props["Seen"]?.type === "checkbox" ? props["Seen"].checkbox : false;
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

      const readTime = 3;

      const imageSlug = props["Cover"]?.type === "rich_text"
  ? props["Cover"].rich_text?.[0]?.plain_text ?? null
  : null;

  const coverImage =
  props["Cover"]?.type === "rich_text"
    ? props["Cover"].rich_text?.[0]?.plain_text ?? null
    : null;

let blurDataURL: string | null = null;

if (coverImage) {
  try {

    const fileName = coverImage?.split("/").pop(); // Extract just the filename
    const imagePath = fileName
      ? path.join(process.cwd(), "public", "images", "blog", fileName)
      : null;

    if (imagePath) {
      try {
        const imageBuffer = fs.readFileSync(imagePath);
        const { base64 } = await getPlaiceholder(imageBuffer);
        blurDataURL = base64;
      } catch (err) {
        console.warn("Could not generate blurDataURL for", fileName, err);
      }
    }
  } catch (err) {
    console.warn("Could not generate blurDataURL for", coverImage, err);
  }
  
}

      return {
        slug,
        title,
        excerpt,
        date,
        coverImage,
        readTime,
        wordCount,
        blurDataURL,
      };
    })
  );

  return results.filter(Boolean) as BlogPostPreview[];
}