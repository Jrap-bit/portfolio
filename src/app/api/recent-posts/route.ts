// app/api/recent-posts/route.ts
import { NextResponse } from "next/server";
import Parser from "rss-parser";


type RSSCustomItem = {
  title: string;
  link: string;
  pubDate: string;
  guid: string;
  contentSnippet?: string;
  custom_elements?: { [key: string]: any }[];
};

const parser: Parser<Record<string, unknown>, RSSCustomItem> = new Parser();

export async function GET() {
  const feed = await parser.parseURL("http://localhost:3000/blog/feed.xml");

  const posts = feed.items.slice(0, 5).map((item) => {
    console.log("Item:", item);
    const slug = item.link?.split("/").pop() ?? "unknown";

    let excerpt = "";
    let coverImage = "";

    if (Array.isArray(item.custom_elements)) {
      for (const el of item.custom_elements) {
        if (el.excerpt) excerpt = el.excerpt;
        if (el.coverImage) coverImage = el.coverImage;
      }
    }

    return {
      id: item.guid ?? slug,
      title: item.title ?? "Untitled",
      date: item.pubDate ?? new Date().toISOString(),
      slug,
      excerpt,
      coverImage: `/images/blog/${coverImage}` || `/images/blog/${slug}.jpg`,
    };
  });

  return NextResponse.json(posts);
}