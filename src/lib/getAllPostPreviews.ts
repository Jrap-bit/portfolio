// lib/getAllPostPreviews.ts

import { getPageMetadata } from "~/lib/notion";
import { getAllPosts } from "./getAllPosts";

export interface BlogPostPreview {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  readTime: number;
  coverImage: string | null;
}
export async function getAllPostPreviews(): Promise<BlogPostPreview[]> {
    const posts = await getAllPosts();
  
    const results = await Promise.all(
      posts.map(async ({ slug }) => {
        const page = await getPageMetadata(slug);
        if (!page) return null;
  
        const props = page.properties;
  
        const seen = props["Seen"]?.type === "checkbox" ? props["Seen"].checkbox : false;
        if (!seen) return null; // ✨ only include Seen posts in public list
  
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
        };
      })
    );
  
    return results.filter(Boolean) as BlogPostPreview[];
  }