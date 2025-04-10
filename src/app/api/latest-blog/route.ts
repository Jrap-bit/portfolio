// app/api/blogs/route.ts
import { NextResponse } from "next/server";
import { notion } from "~/lib/notion";

export async function GET() {
  try {
    console.log("⏳ Fetching blog posts...");

    const response = await notion.databases.query({
      database_id: process.env.NOTION_DATABASE_ID!,
      filter: {
        property: "Published",
        checkbox: {
          equals: true,
        },
      },
      sorts: [
        {
          property: "Date",
          direction: "descending",
        },
      ],
    });

    console.log("✅ Fetched Notion pages:", response.results.length);

    const blogs = response.results.map((page: any) => {
      const properties = page.properties;
      const coverProp = page.properties["Cover"];
    
      return {
        id: page.id,
        title: properties.Title?.title?.[0]?.plain_text ?? "Untitled",
        date: properties.Date?.date?.start ?? null,
        slug: properties.Slug?.rich_text?.[0]?.plain_text ?? "",
        excerpt: properties.Excerpt?.rich_text?.[0]?.plain_text ?? "",
        coverImage: coverProp?.type === "rich_text"
        ? `/images/blog/${coverProp.rich_text?.[0]?.plain_text ?? ""}`
        : null,
      };
    });

    return NextResponse.json(blogs);
  } catch (err) {
    console.error("❌ Failed to fetch blog posts:", err);
    return NextResponse.json({ error: "Failed to load blog posts" }, { status: 500 });
  }
}