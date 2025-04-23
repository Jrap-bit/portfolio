// app/feed.xml/route.ts
import { getAllPosts } from "~/lib/getAllPosts";
import { getPageMetadata } from "~/lib/notion";
import { NextResponse } from "next/server";
import RSS from "rss";

export async function GET() {
  const posts = await getAllPosts();
  const siteUrl = "https://parjanya.vercel.app";

  const feed = new RSS({
    title: 'Ephemeris – Parjanya\'s Blog',
    description: 'Poetic, introspective, and philosophical writings from the edge of memory.',
    feed_url: 'https://parjanya.vercel.app/blog/feed.xml',
    site_url: 'https://parjanya.vercel.app/blog',
    language: 'en',
    pubDate: new Date().toUTCString(),
    copyright: `All rights reserved ${new Date().getFullYear()}, Parjanya`,
  });

  const metadata = await Promise.all(
    posts.map(({ slug }) => getPageMetadata(slug).then((page) => ({ slug, page })))
  );

  for (const { slug, page } of metadata) {
    if (!page) continue;
  
    const props = page.properties;
    const seen = props["Seen"]?.type === "checkbox" && props["Seen"].checkbox;
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
        ? new Date(props["Date"].date?.start ?? "")
        : new Date();
  
    feed.item({
      title,
      url: `${siteUrl}/blog/${slug}`,
      description: excerpt,
      date,
    });
  }

  return new NextResponse(feed.xml({ indent: true }), {
    headers: {
      "Content-Type": "application/rss+xml; charset=utf-8",
    },
  });
}