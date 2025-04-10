// lib/notion.ts
import { Client } from "@notionhq/client";
import type { PageObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
});

export async function getPageMetadata(slug: string) {
  const databaseId = process.env.NOTION_DATABASE_ID!;
  const response = await notion.databases.query({
    database_id: databaseId,
    filter: {
      property: "Slug",
      rich_text: {
        equals: slug,
      },
    },
  });

  const page = response.results[0];
  if (!page) return null;

  return page as PageObjectResponse;
}

export async function getPageContent(pageId: string) {
  const response = await notion.blocks.children.list({
    block_id: pageId,
  });

  return response.results;
}