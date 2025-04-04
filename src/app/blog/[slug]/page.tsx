type Params = Promise<{ slug: string[] }>;
export default async function BlogPostPage({ params }: { params: Params }) {
    const { slug } = await params;
    return <div>Post Slug: {slug}</div>;
  }