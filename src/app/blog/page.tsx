import { getAllPostPreviews } from "~/lib/getAllPostPreviews";
import type { BlogPostPreview } from "~/lib/getAllPostPreviews";
import FeaturedPost from "./FeaturedPost";
import BlogListGrid from "./BlogListGrid";

export const revalidate = 60;

export default async function BlogPage() {
  let posts: BlogPostPreview[] = [];

try {
  posts = await getAllPostPreviews();
} catch (err) {
  console.error("Error fetching posts:", err);
  return (
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6 text-center">
      <div>
        <h2 className="text-2xl font-semibold">Something went wrong.</h2>
        <p className="mt-2 text-muted-foreground">
          The thoughts couldn't be fetched from the ether. Try again soon.
        </p>
      </div>
    </div>
  );
}

if (!posts || posts.length === 0) {
  return (

    
    <div className="min-h-screen flex items-center justify-center bg-black text-white px-6 text-center">
      
      <div>
        <h2 className="text-xl font-semibold">No posts yet.</h2>
        <p className="mt-1 text-muted-foreground">But something might appear soon.</p>
      </div>
    </div>
  );
}

  const [highlighted, ...rest] = posts;

  return (
    <main className="min-h-screen bg-black text-white px-6 pt-20 pb-32 font-satoshi">
      <section className="max-w-7xl mx-auto space-y-8">
        {highlighted && <FeaturedPost post={highlighted} />}
          </section>

      <BlogListGrid posts={rest} />
    </main>
  );
}