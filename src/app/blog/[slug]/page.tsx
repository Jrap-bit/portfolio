export const dynamic = "force-dynamic";
export const dynamicParams = true;
export const revalidate = 60;
import { notFound } from 'next/navigation';
import { getPageMetadata, getPageContent } from "~/lib/notion";
import BlogHero from "./hero";
import ContentRenderer from "./content";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getAllPosts } from "~/lib/getAllPosts";
import type { Metadata } from "next";
import Footer from './footer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  const posts = await getAllPosts();
  return posts.map((post) => ({ slug: post.slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const resolvedParams = await params;
  if (!resolvedParams) return {};
  const slug = decodeURIComponent(resolvedParams.slug);
  if (!slug) return {};
  const page = await getPageMetadata(slug);
  if (!page) return {};

  const titleProp = page.properties["Title"];
  const excerptProp = page.properties["Excerpt"];
  const coverProp = page.properties["Cover"];

  const title =
    titleProp?.type === "title"
      ? titleProp.title?.[0]?.plain_text ?? "Untitled"
      : "Untitled";

  const description =
    excerptProp?.type === "rich_text"
      ? excerptProp.rich_text?.[0]?.plain_text ?? ""
      : "";

  const coverImage =
    coverProp?.type === "rich_text"
      ? `/images/blog/${coverProp.rich_text?.[0]?.plain_text ?? ""}`
      : null;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      url: `https://parjanya.vercel.app/blog/${slug}`,
      images: coverImage
        ? [
            {
              url: `https://parjanya.vercel.app${coverImage}`,
              width: 1200,
              height: 630,
              alt: title,
            },
          ]
        : [],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: coverImage ? [`https://parjanya.vercel.app${coverImage}`] : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
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
    <div className="min-h-screen bg-black">
      <BlogHero
        title={title}
        date={publishedAt}
        excerpt={excerpt}
        coverImage={coverImage}
        readTime={readTime}
        wordCount={wordCount}
      />

      <ContentRenderer 
        blocks={completeBlocks} 
        title={title}
        readTime={readTime}
        wordCount={wordCount}
      />

      <Footer wordCount={wordCount} />
    </div>
  );
}