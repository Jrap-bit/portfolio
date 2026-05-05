// app/api/recent-posts/route.ts
import { NextResponse } from "next/server";
import { getAllPosts } from "~/lib/getAllPosts";
import { getPageMetadata } from "~/lib/notion";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const allPosts = await getAllPosts();
    const recentPosts = [];

    for (const { slug, page } of allPosts) {
      if (recentPosts.length >= 5) break;

      if (!page) continue;

      const props = page.properties;
      const seen = props["Seen"]?.type === "checkbox" ? props["Seen"].checkbox : false;
      if (!seen) continue;

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
          ? props["Date"].date?.start ?? new Date().toISOString()
          : new Date().toISOString();

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
        : "/images/blog/fallback.jpg";

      recentPosts.push({
        id: page.id,
        title,
        date,
        slug,
        excerpt,
        coverImage,
      });
    }

    return NextResponse.json(recentPosts);
  } catch (error) {
    console.error("Failed to fetch recent posts", error);
    return NextResponse.json({ error: "Failed to fetch recent posts" }, { status: 500 });
  }
}