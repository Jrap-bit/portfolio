// lib/getAllPostPreviews.ts

import { getPageMetadata, getPageContent } from "~/lib/notion";
import { getAllPosts } from "./getAllPosts";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export interface BlogPostPreview {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  coverImage: string | null;
  wordCount: number;
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

      const coverImage =
        props["Cover"]?.type === "rich_text"
          ? props["Cover"].rich_text?.[0]?.plain_text ?? null
          : null;

      const readTime = 3;

      return {
        slug,
        title,
        excerpt,
        date,
        coverImage,
        readTime,
        wordCount,
      };
    })
  );

  return results.filter(Boolean) as BlogPostPreview[];
}