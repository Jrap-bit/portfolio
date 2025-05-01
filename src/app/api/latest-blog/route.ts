// app/api/latest-blog/route.ts

import { NextResponse } from "next/server";
import Parser from "rss-parser";

const parser = new Parser();

export async function GET() {
  try {
    const feed = await parser.parseURL("https://parjanya.vercel.app/blog/feed.xml");

    if (!feed.items.length) {
      return NextResponse.json({ error: "No blog posts found" }, { status: 404 });
    }

    const latest = feed.items[0];
    return NextResponse.json({
      title: latest?.title,
      link: latest?.link,
      pubDate: latest?.pubDate,
    });
  } catch (error) {
    console.error("Failed to fetch latest RSS post", error);
    return NextResponse.json({ error: "Failed to fetch latest blog" }, { status: 500 });
  }
}