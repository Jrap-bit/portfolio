"use client";

import { useEffect, useState } from "react";
import { FiChevronLeft, FiChevronRight } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { cover } from "three/src/extras/TextureUtils.js";

interface BlogPost {
  id: string;
  title: string;
  date: string;
  slug: string;
  excerpt: string;
  coverImage: string;
}

export default function RecentPostsCarousel() {
  const [posts, setPosts] = useState<BlogPost[]>([]);
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await fetch("/api/latest-blog");
      const data = await res.json();
      setPosts(data);
    };
    fetchPosts();
  }, []);

  const prev = () => setIndex((prev) => (prev - 1 + posts.length) % posts.length);
  const next = () => setIndex((prev) => (prev + 1) % posts.length);
  

  if (posts.length === 0) return null;

  const current = posts[index];
  const title = current?.title ?? "Untitled";
  const excerpt = current?.excerpt ?? "";
  const coverImage = current?.coverImage ?? "/images/blog/fallback.jpg";  

  console.log("Current Post:", current);
    console.log("Posts:", posts);
    console.log("Index:", index);
    console.log("Cover Image:", coverImage);
    console.log("Title:", title);
    console.log("Excerpt:", excerpt);

  return (
    <section className="mt-24 text-white px-4 sm:px-6 md:px-0 w-full">
      <h2 className="text-2xl md:text-3xl font-semibold mb-6">Recent Posts</h2>

      <div className="relative overflow-hidden rounded-xl border border-white/10 bg-white/5 backdrop-blur-md shadow-lg">
        <AnimatePresence mode="wait">
          <motion.div
            key={current?.id}
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -30 }}
            transition={{ duration: 0.4 }}
            className="grid md:grid-cols-2"
          >
            <div className="w-full h-64 md:h-[340px] overflow-hidden">
            <Image
            src={coverImage}
            alt={title}
            width={600}
            height={400}
            className="w-full h-full object-cover"
/>
            </div>
            <div className="p-6 flex flex-col justify-center">
              <p className="text-sm text-neutral-400 mb-2">
                {new Date(current?.date!).toLocaleDateString("en-IN", {
                  day: "numeric",
                  month: "short",
                  year: "numeric",
                })}
              </p>
              <h3 className="text-xl font-semibold mb-2">{title}</h3>
              <p className="text-neutral-300 mb-4">{excerpt}</p>
              <Link
                href={`/blog/${current?.slug}`}
                className="self-start text-sm text-cyan-400 hover:underline"
              >
                Read more →
              </Link>
            </div>
          </motion.div>
        </AnimatePresence>

        {/* Arrows */}
        <div className="absolute top-1/2 -translate-y-1/2 left-3 z-10">
          <button
            onClick={prev}
            className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
          >
            <FiChevronLeft size={20} />
          </button>
        </div>
        <div className="absolute top-1/2 -translate-y-1/2 right-3 z-10">
          <button
            onClick={next}
            className="p-2 rounded-full bg-black/60 text-white hover:bg-black/80 transition"
          >
            <FiChevronRight size={20} />
          </button>
        </div>
      </div>
    </section>
  );
}