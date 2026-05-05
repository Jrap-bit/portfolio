"use client";

import { useEffect, useState } from "react";
import { FiHeart, FiSend } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import RecentPostsCarousel from "./RecentPostCarousel";
import { api } from "~/trpc/react";
import { toast } from "react-hot-toast";
import type { BlogPostPreview } from "~/lib/getAllPostPreviews";

// ─── Likes ────────────────────────────────────────────────────────────────────

function LikeButton({ slug }: { slug: string }) {
  const utils = api.useUtils();
  const { data: likeData = 0, isLoading } = api.likes.get.useQuery({ slug });
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("liked-posts") || "{}");
    setLiked(!!likedPosts[slug]);
  }, [slug]);

  const incrementLike = api.likes.increment.useMutation({
    // Optimistic update — UI responds instantly, server confirms in background
    onMutate: async () => {
      await utils.likes.get.cancel({ slug });
      const previous = utils.likes.get.getData({ slug }) ?? 0;
      utils.likes.get.setData({ slug }, previous + 1);
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      // Roll back if the server call fails
      if (ctx?.previous !== undefined) {
        utils.likes.get.setData({ slug }, ctx.previous);
      }
      setLiked(false);
      const likedPosts = JSON.parse(localStorage.getItem("liked-posts") || "{}");
      delete likedPosts[slug];
      localStorage.setItem("liked-posts", JSON.stringify(likedPosts));
    },
    onSettled: () => utils.likes.get.invalidate({ slug }),
  });

  const toggleLike = () => {
    if (liked) {
      toast("Sorry, the love stays — no take-backs!");
      return;
    }
    setLiked(true);
    incrementLike.mutate({ slug });
    const likedPosts = JSON.parse(localStorage.getItem("liked-posts") || "{}");
    likedPosts[slug] = true;
    localStorage.setItem("liked-posts", JSON.stringify(likedPosts));
  };

  return (
    <div className="flex items-center gap-3">
      <motion.button
        whileTap={{ scale: 0.9 }}
        whileHover={{ scale: 1.1 }}
        transition={{ duration: 0.1 }}
        className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-all ${
          liked
            ? "bg-red-500/20 border-red-400 text-red-400"
            : "bg-white/5 text-white border-white/10 hover:border-blue-400"
        }`}
        onClick={toggleLike}
      >
        <FiHeart className="text-base" />
        <span>{isLoading ? "…" : likeData}</span>
      </motion.button>
      <span className="text-sm text-neutral-400">Like this post</span>
    </div>
  );
}

// ─── Comments ─────────────────────────────────────────────────────────────────

function Comments({ slug }: { slug: string }) {
  const utils = api.useUtils();
  const { data: fetchedComments = [], isLoading } = api.comments.getBySlug.useQuery({ slug });
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [honeypot, setHoneypot] = useState("");

  const addComment = api.comments.add.useMutation({
    onMutate: async (newComment) => {
      await utils.comments.getBySlug.cancel({ slug });
      const previous = utils.comments.getBySlug.getData({ slug }) ?? [];
      // Inject an optimistic comment so the UI updates before the server responds
      utils.comments.getBySlug.setData({ slug }, [
        ...previous,
        {
          id: `optimistic-${Date.now()}`,
          slug,
          name: newComment.name || "Anonymous",
          text: newComment.text,
          createdAt: new Date(),
          ip: null,
          honeypot: null,
        },
      ]);
      return { previous };
    },
    onError: (_err, _vars, ctx) => {
      if (ctx?.previous) utils.comments.getBySlug.setData({ slug }, ctx.previous);
      toast.error("Failed to post comment. Please try again.");
    },
    onSuccess: () => toast.success("Comment added"),
    onSettled: () => utils.comments.getBySlug.invalidate({ slug }),
  });

  const postComment = () => {
    if (!text.trim() || honeypot.trim().length > 0) return;
    addComment.mutate({ slug, name: name.trim(), text: text.trim(), honeypot });
    setText("");
    setName("");
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      viewport={{ once: true }}
    >
      <h3 className="text-2xl font-medium mb-6 text-white mt-18">Leave a comment</h3>

      <div className="space-y-4 mb-12">
        <motion.input
          whileFocus={{ scale: 1.01, borderColor: "#67e8f9" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          type="text"
          placeholder="Your name (optional)"
          className="w-full bg-black/20 text-white px-4 py-2 rounded-md border border-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <motion.textarea
          whileFocus={{ scale: 1.01, borderColor: "#67e8f9" }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          rows={4}
          placeholder="Your comment..."
          className="w-full bg-black/20 text-white px-4 py-2 rounded-md border border-white/10 backdrop-blur-sm focus:outline-none focus:ring-2 focus:ring-cyan-500"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />

        {/* Honeypot — visually hidden but not display:none, which bots can detect */}
        <input
          type="text"
          autoComplete="off"
          value={honeypot}
          onChange={(e) => setHoneypot(e.target.value)}
          tabIndex={-1}
          aria-hidden="true"
          style={{ opacity: 0, position: "absolute", pointerEvents: "none", height: 0 }}
        />

        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
          className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md border border-white/10 transition"
          onClick={postComment}
          disabled={text.trim().length === 0 || text.length > 1000}
        >
          <FiSend /> Post Comment
        </motion.button>
      </div>

      <AnimatePresence>
        {isLoading ? (
          <p className="text-sm text-neutral-400 italic">Loading comments...</p>
        ) : fetchedComments.length > 0 ? (
          fetchedComments.map((comment) => (
            <motion.div
              key={comment.id}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 10 }}
              transition={{ duration: 0.3 }}
              className="border-b border-white/10 pb-6 mb-6"
            >
              <div className="text-sm text-neutral-300 mb-1 font-semibold">{comment.name}</div>
              <div className="text-base text-white whitespace-pre-wrap">{comment.text}</div>
              <div className="text-xs text-neutral-500 mt-1">
                {new Date(comment.createdAt).toLocaleString()}
              </div>
            </motion.div>
          ))
        ) : (
          <p className="text-sm text-neutral-400 italic">No comments yet. Be the first!</p>
        )}
      </AnimatePresence>
    </motion.div>
  );
}


// ─── Root ─────────────────────────────────────────────────────────────────────

interface BlogEngagementProps {
  slug: string;
  viewCount?: number;
  recentPosts?: BlogPostPreview[];
  recentPostsLoading?: boolean;
  recentPostsError?: boolean;
}

export default function BlogEngagement({
  slug,
  viewCount,
  recentPosts = [],
  recentPostsLoading = false,
  recentPostsError = false,
}: BlogEngagementProps) {
  return (
    <section className="mt-12 md:mt-18 pt-12 border-t border-white/10 text-white">

      {/* Likes and view count — loads independently */}
      <motion.div
        className="flex items-center justify-between mb-12"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <LikeButton slug={slug} />
        <span className="text-sm text-neutral-400">{viewCount ?? "–"} views</span>
      </motion.div>

      {/* Recent posts — data fetched in parent, no extra network call here */}
      <RecentPostsCarousel
        posts={recentPosts}
        isLoading={recentPostsLoading}
        isError={recentPostsError}
      />

      {/* Comments — loads independently */}
      <Comments slug={slug} />

    </section>
  );
}