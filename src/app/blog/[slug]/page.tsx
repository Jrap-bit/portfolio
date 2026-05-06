export const dynamic = "force-dynamic";
export const dynamicParams = true;

import { notFound } from 'next/navigation';
import { getPageMetadata, getPageContent } from "~/lib/notion";
import BlogHero from "./hero";
import ContentRenderer from "./content";
import type { BlockObjectResponse } from "@notionhq/client/build/src/api-endpoints";
import { getAllPosts } from "~/lib/getAllPosts";
import { getAllPostPreviews } from "~/lib/getAllPostPreviews";
import type { Metadata } from "next";
import Footer from './footer';

interface PageProps {
  params: Promise<{ slug: string }>;
}

// Block types that contain readable prose
const TEXT_BLOCK_TYPES = new Set([
  "paragraph",
  "heading_1",
  "heading_2",
  "heading_3",
  "bulleted_list_item",
  "numbered_list_item",
  "toggle",
  "quote",
  "callout",
]);

function countWords(blocks: BlockObjectResponse[]): number {
  return blocks
    .filter((block) => TEXT_BLOCK_TYPES.has(block.type))
    .flatMap((block) => {
      const richText = (block as any)[block.type]?.rich_text ?? [];
      return (richText as any[]).map((t) => t.plain_text ?? "");
    })
    .join(" ")
    .split(/\s+/)
    .filter(Boolean).length;
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

  const rawCoverMeta = coverProp?.type === "rich_text"
    ? coverProp.rich_text?.[0]?.plain_text ?? null
    : null;
  const isRemoteUrlMeta =
    rawCoverMeta?.startsWith("http://") || rawCoverMeta?.startsWith("https://");
  const coverImage = rawCoverMeta
    ? isRemoteUrlMeta
      ? rawCoverMeta
      : `/images/blog/${rawCoverMeta}`
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
              url: isRemoteUrlMeta
                ? coverImage
                : `https://parjanya.vercel.app${coverImage}`,
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
      images: coverImage
        ? [isRemoteUrlMeta ? coverImage : `https://parjanya.vercel.app${coverImage}`]
        : [],
    },
  };
}

export default async function BlogPostPage({ params }: PageProps) {
  const resolvedParams = await params;
  const slug = decodeURIComponent(resolvedParams.slug);

  // Fetch page metadata, blocks, and recent posts in parallel
  const [page, allPreviews] = await Promise.all([
    getPageMetadata(slug),
    getAllPostPreviews(),
  ]);

  if (!page) return notFound();

  const blocks = await getPageContent(page.id);

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

  const rawCover = coverProp?.type === "rich_text"
    ? coverProp.rich_text?.[0]?.plain_text ?? null
    : null;
  const isRemoteUrl =
    rawCover?.startsWith("http://") || rawCover?.startsWith("https://");
  const coverImage = rawCover
    ? isRemoteUrl
      ? rawCover
      : `/images/blog/${rawCover}`
    : null;

  const wordCount = countWords(completeBlocks);
  const readTime = Math.max(1, Math.ceil(wordCount / 200));

  // Exclude the current post from the carousel
  const recentPosts = allPreviews
    .filter((p) => p.slug !== slug)
    .slice(0, 5);

  return (
    <div className="min-h-screen overflow-x-clip bg-black">
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
        slug={slug}
        recentPosts={recentPosts}
      />

      <Footer wordCount={wordCount} />
    </div>
  );
}
