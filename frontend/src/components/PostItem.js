import React, { useEffect, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const PostItem = ({ post, onExpire }) => {
  const [timeLeft, setTimeLeft] = useState(
    Math.max(0, new Date(post.expireAt) - Date.now())
  );

  useEffect(() => {
    const timer = setInterval(() => {
      const newTimeLeft = Math.max(0, new Date(post.expireAt) - Date.now());
      setTimeLeft(newTimeLeft);

      if (newTimeLeft === 0) {
        clearInterval(timer);
        setTimeout(() => onExpire(post.id), 500);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [post.expireAt, post.id, onExpire]);

  const isBlinking = timeLeft <= 10000 && timeLeft > 0;

  return (
    <AnimatePresence>
      {timeLeft > 0 && (
        <motion.div
          key={post.id}
          initial={{ opacity: 1 }}
          animate={{ opacity: isBlinking ? [1, 0.2, 1] : 1 }}
          exit={{ opacity: 0, scale: 0.8, y: -20 }}
          transition={{
            duration: isBlinking ? 0.8 : 0.5,
            repeat: isBlinking ? Infinity : 0,
          }}
          className="p-4 bg-white rounded-lg shadow-lg my-2"
        >
          <h3 className="text-xl font-bold">{post.title}</h3>
          <p>{post.content}</p>
          <div className="text-sm text-gray-500">
            {Math.ceil(timeLeft / 1000)}초 남음
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PostItem;
