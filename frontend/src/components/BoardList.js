import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import VideoBackground from './VideoBackground';
import './BoardList.css';

function BoardList() {
  const [posts, setPosts] = useState([]);
  const [isPaused, setIsPaused] = useState(true); // ✅ 기본을 true로 설정하여 멈춘 상태로 시작
  const timerRef = useRef(null);

  useEffect(() => {
    axios.get('http://localhost:8080/api/posts')
      .then(response => {
        const postsWithTimer = response.data.map(post => ({
          ...post,
          //remainingSeconds: Math.floor((new Date(post.expiresAt) - new Date()) / 1000)
          remainingSeconds: 15
        }));
        setPosts(postsWithTimer);
      })
      .catch(error => console.error(error));
  }, []);

  useEffect(() => {
    if (!isPaused) { // isPaused가 false일 때만 타이머 작동
      timerRef.current = setInterval(() => {
        setPosts(prevPosts => prevPosts
          .map(post => ({ ...post, remainingSeconds: post.remainingSeconds - 1 }))
          .filter(post => post.remainingSeconds > -1)
        );
      }, 1000);
    } else if (timerRef.current) {
      clearInterval(timerRef.current); // 멈추면 타이머 제거
    }

    return () => clearInterval(timerRef.current);
  }, [isPaused]);

  const handlePauseToggle = () => setIsPaused(prev => !prev);

  return (
    <VideoBackground>
      <div className="card-container">
        <h1 className="title">Lightning</h1>

        <button 
          className="main-button"
          onClick={handlePauseToggle}
          style={{
            position: 'absolute',
            top: '20px',
            right: '20px',
            zIndex: 10
          }}
        >
          {isPaused ? '⏵️ PLAY_TEST' : '⏸️ PAUSE_TEST'}
        </button>


        <div className="cards-grid">
          <AnimatePresence>
            {posts.map(post => {
              const isBlinking = post.remainingSeconds <= 10 && post.remainingSeconds > 0;

              return post.remainingSeconds >= 0 && (
                <motion.div
                  key={post.id}
                  className="card-item"
                  initial={{ opacity: 1 }}
                  animate={{ opacity: isBlinking ? [1, 0.2, 1] : 1 }}
                  exit={{ opacity: 0, scale: 0.8, y: -20 }}
                  transition={{
                    duration: isBlinking ? 0.8 : 0.5,
                    repeat: isBlinking ? Infinity : 0,
                  }}
                >
                  <Link to={`/board/${post.id}`} className="card">
                    <span className="card-title">{post.title}</span>
                    <span className="card-timer">{post.remainingSeconds}s</span>
                  </Link>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>

        <div className="button-container">
          <Link to="/write" className="main-button">글쓰기 ✏️</Link>
          <Link to="/" className="main-button">홈으로 🏠</Link>
        </div>
      </div>
    </VideoBackground>
  );
}

export default BoardList;
