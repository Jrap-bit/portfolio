"use client";

import { useState } from "react";
import { FiHeart, FiSend } from "react-icons/fi";
import { AnimatePresence, motion } from "framer-motion";
import RecentPostsCarousel from "./RecentPostCarousel";

interface Comment {
  id: number;
  name: string;
  text: string;
  timestamp: string;
}

export default function BlogEngagement() {
  const [likes, setLikes] = useState(0);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [name, setName] = useState("");
  const [text, setText] = useState("");

  const toggleLike = () => {
    setLiked(!liked);
    setLikes((prev) => (liked ? prev - 1 : prev + 1));
  };

  const postComment = () => {
    if (!text.trim()) return;
    const newComment: Comment = {
      id: Date.now(),
      name: name.trim() || "Anonymous",
      text: text.trim(),
      timestamp: new Date().toLocaleString(),
    };
    setComments([newComment, ...comments]);
    setText("");
    setName("");
  };

  return (
    <section className="mt-12 md:mt-18 pt-12 border-t border-white/10 text-white">
      {/* Like Button */}
      <motion.div
        className="flex items-center gap-4 mb-12"
        initial={{ opacity: 0, y: 10 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        viewport={{ once: true }}
      >
        <motion.button
          whileTap={{ scale: 0.9 }}
          whileHover={{ scale: 1.1 }}
          className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-full border transition-all ${
            liked
              ? "bg-red-500/20 border-red-400 text-red-400"
              : "bg-white/5 text-white border-white/10 hover:border-blue-400"
          }`}
          onClick={toggleLike}
        >
          <FiHeart className="text-base" />
          <span>{likes}</span>
        </motion.button>
        <span className="text-sm text-neutral-400">Like this post</span>
      </motion.div>

      <RecentPostsCarousel />

     {/* Comment Form */}
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
    transition={{ delay: 0.1, duration: 0.4 }}
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

    <motion.button
      whileTap={{ scale: 0.95 }}
      whileHover={{ scale: 1.05, backgroundColor: "rgba(255,255,255,0.2)" }}
      className="flex items-center gap-2 bg-white/10 hover:bg-white/20 text-white px-4 py-2 rounded-md border border-white/10 transition"
      onClick={postComment}
    >
      <FiSend /> Post Comment
    </motion.button>
  </div>
</motion.div>

      {/* Comment List */}
      <AnimatePresence>
        {comments.map((comment) => (
          <motion.div
            key={comment.id}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.3 }}
            className="border-b border-white/10 pb-6 mb-6"
          >
            <div className="text-sm text-neutral-300 mb-1 font-semibold">
              {comment.name}
            </div>
            <div className="text-base text-white">{comment.text}</div>
            <div className="text-xs text-neutral-500 mt-1">{comment.timestamp}</div>
          </motion.div>
        ))}
        {comments.length === 0 && (
          <p className="text-sm text-neutral-400 italic">No comments yet. Be the first!</p>
        )}
      </AnimatePresence>
    </section>
  );
}