// src/app/blog/[slug]/page.tsx

import { type FC } from "react";

type Props = {
  params: {
    slug: string;
  };
};

const BlogPostPage: FC<Props> = ({ params }) => {
  const { slug } = params;

  return (
    <div className="text-white text-xl p-6">
      Blog Post Slug: <span className="font-semibold">{slug}</span>
    </div>
  );
};

export default BlogPostPage;