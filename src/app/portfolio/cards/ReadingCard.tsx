import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Image from "next/image";// (2,1–3,1) Currently Reading (Flip Card)
export const CurrentlyReadingCard = () => {
    const [flipped, setFlipped] = useState(false);
  
    return (
      <motion.div
        className="col-span-1 row-span-2 rounded-2xl bg-gradient-to-br from-indigo-900/30 to-purple-900/30 p-6 backdrop-blur-md border border-white/10 shadow-lg text-white cursor-pointer"
        onClick={() => setFlipped(!flipped)}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <h3 className="text-cyan-300 text-sm font-semibold mb-3">📚 Currently Reading</h3>
        <div className="relative w-full h-56 perspective">
          <motion.div
            className="relative w-full h-full"
            animate={{ rotateY: flipped ? 180 : 0 }}
            transition={{ duration: 0.6 }}
            style={{ transformStyle: "preserve-3d" }}
          >
            {/* Front Side */}
            <div className="absolute inset-0 backface-hidden">
              <Image
                src="/images/book.jpg"
                alt="Book Cover"
                width={500}
                height={300}
                className="w-full h-40 rounded-lg object-cover mb-3"
              />
              <h4 className="text-sm font-medium">"Hooked" by Nir Eyal</h4>
              <p className="text-xs text-neutral-400">The science of habit-forming products.</p>
              <p className="text-xs text-neutral-500 mt-2 italic">Tap to flip</p>
            </div>
  
            {/* Back Side */}
            <div className="absolute inset-0 backface-hidden rotate-y-180 p-2">
              <p className="text-xs text-neutral-300 leading-relaxed">
                This book helped me design interfaces people keep coming back to — ethically.
              </p>
              <p className="text-xs text-neutral-500 mt-2 italic">Tap to flip back</p>
            </div>
          </motion.div>
        </div>
      </motion.div>
    );
  };
  