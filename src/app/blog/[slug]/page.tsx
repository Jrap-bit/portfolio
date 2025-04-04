export default function BlogPostPage({ params }: { params: { slug: string } }) {
    return <div>Post Slug: {params.slug}</div>;
  }