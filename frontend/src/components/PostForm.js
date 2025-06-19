import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import VideoBackground from './VideoBackground';
import './PostForm.css';

function PostForm() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [author, setAuthor] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      const decoded = jwtDecode(token);
      setAuthor(decoded.sub);
    }
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    axios.post('http://localhost:8080/api/posts', {
      title,
      content,
      author,
    })
    .then(() => {
      alert('게시글 작성 성공');
      navigate('/board');
    })
    .catch((error) => {
      console.error(error);
      alert('게시글 작성에 실패했습니다.');
    });
  };

  return (
    <VideoBackground>
      <div className="form-wrapper">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="post-form">
            <h2>게시글 작성</h2>
            <input
              type="text"
              placeholder="제목을 입력해주세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <textarea
              placeholder="내용을 입력해주세요"
              rows="10"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              required
            />
            <input
              type="text"
              value={`작성자: ${author}`}
              readOnly
            />
            <button type="submit" className="main-button">등록하기</button>
          </form>
  
          <div className="button-container">
            <Link to="/board" className="main-button">뒤로가기</Link>
            <Link to="/" className="main-button">홈으로 🏠</Link>
          </div>
        </div>
      </div>
    </VideoBackground>
  );
  
  
}

export default PostForm;
