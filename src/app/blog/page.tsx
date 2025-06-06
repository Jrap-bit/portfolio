import { getAllPostPreviews } from "~/lib/getAllPostPreviews";
import type { BlogPostPreview } from "~/lib/getAllPostPreviews";
import FeaturedPost from "./FeaturedPost";
import BlogListWrapper from "./BlogListWrapper";
import EphemerisHeader from "./EphemerisHeader";
import Footer from "~/components/blog-footer";
import StarfieldBackground from "./starfield";

export const revalidate = 60;

export default async function BlogPage() {
  let posts: BlogPostPreview[] = [];

  try {
    posts = await getAllPostPreviews();
  } catch (err) {
    console.error("Error fetching posts:", err);
    const isRateLimited =
      err instanceof Error && err.message.toLowerCase().includes("rate");

    return (
      <div className="min-h-screen flex items-center justify-center bg-black text-white px-6 text-center">
        <div>
          <h2 className="text-2xl font-semibold">
            {isRateLimited
              ? "You've reached the ephemeris too often."
              : "Something went wrong."}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {isRateLimited
              ? "The thoughts need time to replenish. Try again shortly."
              : "The thoughts couldn't be fetched from the ether. Try again soon."}
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
  const totalWords = posts.reduce((sum, post) => sum + (post.wordCount || 0), 0);


  return (
    <main className="min-h-screen bg-black text-white px-6 pt-20 pb-20 font-satoshi">
      <StarfieldBackground />
      <a
        href="/"
        className="absolute top-6 left-6 z-50 hidden md:flex px-5 py-2 rounded-full text-white font-semibold text-sm md:text-base bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 shadow-[0_0_3px_1px_rgba(59,130,246,0.5)] hover:scale-105 hover:shadow-[0_0_10px_5px_rgba(59,130,246,0.7)] transition-all duration-300 ease-in-out"
      >
        ⭠ Back to Portal
      </a>
      <a
        href="/"
        className="md:hidden absolute top-4 left-4 z-50 p-2 rounded-full bg-gradient-to-br from-cyan-400 via-blue-500 to-indigo-600 shadow-[0_0_3px_1px_rgba(59,130,246,0.5)] hover:scale-105 hover:shadow-[0_0_10px_5px_rgba(59,130,246,0.7)] transition-all duration-300 ease-in-out"
      >
        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" />
        </svg>
      </a>

       {/* Blog Title */}
       <div className="text-center mb-16">
       <EphemerisHeader />
      </div>
      <section className="max-w-7xl mx-auto space-y-8">
        {highlighted && <FeaturedPost post={highlighted} />}
          </section>

      <BlogListWrapper posts={rest} />

      <Footer wordCount={totalWords} />
    </main>
  );
}