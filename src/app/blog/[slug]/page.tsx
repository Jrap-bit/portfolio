import { notFound } from "next/navigation";
import { getPageMetadata, getPageContent } from "~/lib/notion";
import BlogHero from "./hero";
import ContentRenderer from "./content";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";

export default async function BlogPostPage({ params }: { params: { slug: string } }) {
  const resolvedParams = await Promise.resolve(params);
  const slug = decodeURIComponent(resolvedParams.slug);
  const page = await getPageMetadata(slug);
  if (!page) return notFound();

  const blocks = await getPageContent(page.id);
  
  // Filter out partial blocks and ensure we only have complete BlockObjectResponse objects
  const completeBlocks = blocks.filter((block): block is BlockObjectResponse => 
    'type' in block && block.type !== undefined
  );

  const titleProp = page.properties["Title"];
  const dateProp = page.properties["Date"];
  const excerptProp = page.properties["Excerpt"];
  const coverProp = page.properties["Cover"];

  const title =
    titleProp?.type === "title"
      ? titleProp.title?.[0]?.plain_text ?? "Untitled"
      : "Untitled";

  const excerpt =
    excerptProp?.type === "rich_text"
      ? excerptProp.rich_text?.[0]?.plain_text ?? ""
      : "";

  const publishedAt =
    dateProp?.type === "date" ? dateProp.date?.start ?? null : null;

  const coverImage =
    coverProp?.type === "rich_text"
      ? `/images/blog/${coverProp.rich_text?.[0]?.plain_text ?? ""}`
      : null;

  const wordCount = completeBlocks
    .filter((block): block is BlockObjectResponse & { type: "paragraph" } => 
      block.type === "paragraph"
    )
    .flatMap((block) =>
      block.paragraph.rich_text.flatMap((t) => t.plain_text.split(/\s+/))
    ).length;

  const readTime = Math.ceil(wordCount / 200);

  return (
    <>
      <BlogHero
        title={title}
        date={publishedAt}
        excerpt={excerpt}
        coverImage={coverImage}
        readTime={readTime}
      />

      <ContentRenderer 
        blocks={completeBlocks} 
        title={title}
        readTime={readTime}
        wordCount={wordCount}
      />
    </>
  );
}