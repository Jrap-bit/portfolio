// app/api/latest-blog/route.ts

import { NextResponse } from "next/server";
import { getAllPosts } from "~/lib/getAllPosts";
import { getPageMetadata } from "~/lib/notion";

export const revalidate = 3600; // Cache for 1 hour

export async function GET() {
  try {
    const allPosts = await getAllPosts();
    let latestPost = null;
    let latestSlug = null;

    for (const { slug, page } of allPosts) {
      if (!page) continue;

      const props = page.properties;
      const seen = props["Seen"]?.type === "checkbox" ? props["Seen"].checkbox : false;
      if (!seen) continue;

      latestPost = page;
      latestSlug = slug;
      break; // Found the first (latest) seen post
    }

    if (!latestPost) {
      return NextResponse.json({ error: "No blog posts found" }, { status: 404 });
    }

    const props = latestPost.properties;
    const title = props["Title"]?.type === "title" ? props["Title"].title?.[0]?.plain_text ?? "Untitled" : "Untitled";
    const pubDate = props["Date"]?.type === "date" ? props["Date"].date?.start ?? new Date().toISOString() : new Date().toISOString();

    return NextResponse.json({
      title,
      link: `https://parjanya.vercel.app/blog/${latestSlug}`,
      pubDate,
    });
  } catch (error) {
    console.error("Failed to fetch latest post", error);
    return NextResponse.json({ error: "Failed to fetch latest blog" }, { status: 500 });
  }
}