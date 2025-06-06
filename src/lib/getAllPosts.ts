import { notion } from "~/lib/notion";

export async function getAllPosts() {
  const databaseId = process.env.NOTION_DATABASE_ID!;
  
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
  });

  const posts = response.results.map((page: any) => ({
    slug: page.properties.Slug?.rich_text?.[0]?.plain_text ?? "",
  }));

  return posts;
}