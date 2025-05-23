// app/api/recent-posts/route.ts
import { NextResponse } from "next/server";
import Parser from "rss-parser";


type RSSCustomItem = {
  title: string;
  link: string;
  pubDate: string;
  guid: string;
  contentSnippet?: string;
  slug?: string;
  excerpt?: string;
  coverImage?: string;
};

const parser: Parser<Record<string, unknown>, RSSCustomItem> = new Parser({
  customFields: {
    item: ["slug", "excerpt", "coverImage"],
  },
});

export async function GET() {
  const feed = await parser.parseURL("https://parjanya.vercel.app/blog/feed.xml");

  const posts = feed.items.slice(0, 5).map((item) => {
    const slug = item.link?.split("/").pop() ?? "unknown";

    return {
    id: item.guid ?? slug,
    title: item.title ?? "Untitled",
    date: item.pubDate ?? new Date().toISOString(),
    slug,
    excerpt: item.excerpt ?? "",
    coverImage: `/images/blog/${item.coverImage}`,
  };
  });

  return NextResponse.json(posts);
}