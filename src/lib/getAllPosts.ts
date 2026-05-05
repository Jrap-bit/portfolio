// lib/getAllPosts.ts

import { notion } from "~/lib/notion";

export async function getAllPosts() {
  const databaseId = process.env.NOTION_DATABASE_ID!;
  const allResults: any[] = [];

  let cursor: string | undefined = undefined;

  do {
    const response = await notion.databases.query({
      database_id: databaseId,
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
      ...(cursor ? { start_cursor: cursor } : {}),
    });

    allResults.push(...response.results);
    cursor = response.has_more ? (response.next_cursor ?? undefined) : undefined;
  } while (cursor);

  return allResults.map((page: any) => ({
    slug: page.properties.Slug?.rich_text?.[0]?.plain_text ?? "",
    page,
  }));
}