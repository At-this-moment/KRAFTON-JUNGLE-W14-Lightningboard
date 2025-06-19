import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import VideoBackground from './VideoBackground';
import './PostForm.css';

function PostEdit() {
  const { postId } = useParams();
  const navigate = useNavigate();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const token = localStorage.getItem('token');

  useEffect(() => {
    axios.get(`http://localhost:8080/api/posts/${postId}`)
      .then(res => {
        setTitle(res.data.title);
        setContent(res.data.content);
      })
      .catch(err => console.error(err));
  }, [postId]);

  const handleSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:8080/api/posts/${postId}`, {
      title,
      content
    }, {
      headers: { 'Authorization': `Bearer ${token}` }
    })
    .then(() => {
      alert('게시글이 수정되었습니다.');
      navigate(`/board/${postId}`);
    })
    .catch(err => {
      console.error(err);
      alert('수정 실패');
    });
  };

  return (
    <VideoBackground>
      <div className="form-wrapper">
        <div className="form-container">
          <form onSubmit={handleSubmit} className="post-form">
            <h2>게시글 수정 ✏️</h2>
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
  
            <button type="submit" className="main-button">수정 완료 ✅</button>
          </form>
  
          <div className="button-container">
            <Link to={`/board/${postId}`} className="main-button">돌아가기 📄</Link>
            <Link to="/" className="main-button">홈으로 🏠</Link>
          </div>
        </div>
      </div>
    </VideoBackground>
  );
  
  
  
}

export default PostEdit;
