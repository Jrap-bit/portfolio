"use client";

import { useEffect, useState } from "react";
import { FiHeart, FiSend } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import RecentPostsCarousel from "./RecentPostCarousel";
import { api } from "~/trpc/react";
import { toast } from "react-hot-toast";

export default function BlogEngagement({ slug, viewCount }: { slug: string; viewCount?: number }) {
  const utils = api.useUtils();
  const { data: likeData = 0, isLoading: likesLoading } = api.likes.get.useQuery({ slug });
  const incrementLike = api.likes.increment.useMutation({
    onSuccess: () => utils.likes.get.invalidate({ slug }),
  });

  const { data: fetchedComments = [], isLoading: commentsLoading } = api.comments.getBySlug.useQuery({ slug });
  const addComment = api.comments.add.useMutation({
    onSuccess: async () => {
      await utils.comments.getBySlug.invalidate({ slug });
      toast.success("Comment added");
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  const [liked, setLiked] = useState(false);
  const [name, setName] = useState("");
  const [text, setText] = useState("");
  const [honeypot, setHoneypot] = useState("");

  useEffect(() => {
    const likedPosts = JSON.parse(localStorage.getItem("liked-posts") || "{}");
    setLiked(!!likedPosts[slug]);
  }, [slug]);

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

  const postComment = () => {
    if (!text.trim()) return;
    if (honeypot.trim().length > 0) return; // spam bot

    addComment.mutate({
      slug,
      name: name.trim(),
      text: text.trim(),
      honeypot,
    });

    setText("");
    setName("");
  };

  return (
    <section className="mt-12 md:mt-18 pt-12 border-t border-white/10 text-white">
      <motion.div
        className="flex items-center justify-between mb-12"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.01 }}
        viewport={{ once: true }}
      >
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
            <span>{likesLoading ? "…" : likeData}</span>
          </motion.button>
          <span className="text-sm text-neutral-400">Like this post</span>
        </div>
        <span className="text-sm text-neutral-400">{viewCount ?? "–"} views</span>
      </motion.div>

      <RecentPostsCarousel />

      <motion.div
        className="mb-12"
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true }}
      >
        <motion.h3
          className="text-2xl font-medium mb-6 text-white mt-18"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1, duration: 0.01 }}
        >
          Leave a comment
        </motion.h3>

        <div className="space-y-4">
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

          <input
            type="text"
            className="hidden"
            autoComplete="off"
            value={honeypot}
            onChange={(e) => setHoneypot(e.target.value)}
            tabIndex={-1}
            aria-hidden="true"
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
      </motion.div>

      <AnimatePresence>
        {commentsLoading ? (
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
    </section>
  );
}
