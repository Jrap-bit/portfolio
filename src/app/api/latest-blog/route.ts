// app/api/latest-blog/route.ts
import Parser from "rss-parser";
import { NextResponse } from "next/server";

const RSS_URL = "https://elliott1022.wixsite.com/ephemeris/blog-feed.xml";

export async function GET() {
  const parser = new Parser();

  try {
    const feed = await parser.parseURL(RSS_URL);
    const latest = feed.items[0];

    return NextResponse.json({
      title: latest?.title,
      link: latest?.link,
      pubDate: latest?.pubDate,
    });
  } catch (err) {
    return NextResponse.json({ error: "Failed to fetch blog" }, { status: 500 });
  }
}