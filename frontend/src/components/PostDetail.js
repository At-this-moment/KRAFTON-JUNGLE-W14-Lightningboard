import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { jwtDecode } from 'jwt-decode';
import VideoBackground from './VideoBackground';
import './PostForm.css'; // ✅ 스타일 추가

function formatDate(dateString) {
  const date = new Date(dateString);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, '0')}-${String(date.getDate()).padStart(2, '0')} ${String(date.getHours()).padStart(2, '0')}:${String(date.getMinutes()).padStart(2, '0')}`;
}

function PostDetail() {
  const { postId } = useParams();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [commentContent, setCommentContent] = useState('');
  const [currentUser, setCurrentUser] = useState('');
  const navigate = useNavigate();

  const fetchPostAndComments = () => {
    axios.get(`http://localhost:8080/api/posts/${postId}`)
      .then(response => {
        setPost(response.data);
        setComments(response.data.comments || []);
      })
      .catch(error => console.error(error));
  };

  useEffect(() => {
    fetchPostAndComments();
    const token = localStorage.getItem('token');
    if (token) setCurrentUser(jwtDecode(token).sub);
  }, [postId]);

  const handleCommentSubmit = (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');

    axios.post(`http://localhost:8080/api/posts/${postId}/comments`, {
      content: commentContent
    }, { headers: { Authorization: `Bearer ${token}` } })
    .then(() => {
      setCommentContent('');
      fetchPostAndComments();
    })
    .catch(error => console.error(error));
  };

  const handleDelete = () => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:8080/api/posts/${postId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      alert('게시글이 삭제되었습니다.');
      navigate('/board');
    })
    .catch(error => {
      console.error(error);
      alert('게시글 삭제에 실패했습니다.');
    });
  };

  const handleDeleteComment = (commentId) => {
    const token = localStorage.getItem('token');
    axios.delete(`http://localhost:8080/api/posts/${postId}/comments/${commentId}`, {
      headers: { Authorization: `Bearer ${token}` }
    })
    .then(() => {
      alert('댓글이 삭제되었습니다.');
      fetchPostAndComments();
    })
    .catch(error => {
      console.error(error);
      alert('댓글 삭제에 실패했습니다.');
    });
  };

  if (!post) return <div>로딩 중...</div>;

  return (
    <VideoBackground>
      <div className="form-wrapper">
        <div className="form-container">
          <h2 className="post-title">{post.title}</h2>
          <div className="post-meta">
            <span className="post-author"><strong>작성자:</strong> {post.author}</span> |
            <span className="post-date"><strong>작성일:</strong> {formatDate(post.createdAt)}</span>
          </div>
          <div className="post-content">
            {post.content}
          </div>

          {currentUser === post.author && (
            <div className="button-container">
              <Link to={`/edit/${postId}`} className="main-button">수정하기 ✏️</Link>
              <button onClick={handleDelete} className="main-button">삭제하기 🗑️</button>
            </div>
          )}

          <hr />

          <h3>댓글 목록</h3>
          <ul className="comment-list">
            {comments.length > 0 ? comments.map(comment => (
              <li key={comment.id} className="comment-item">
                <span className="comment-author">[{comment.author}]</span>
                <span className="comment-text">{comment.content}</span>
                {(currentUser === comment.author || currentUser === post.author) && (
                  <button className="delete-comment-button" onClick={() => handleDeleteComment(comment.id)}>
                    댓글 삭제 🗑️
                  </button>
                )}
              </li>
            
            )) : <li className="no-comment">아직 댓글이 없습니다.</li>}
          </ul>

          <hr />

          {currentUser ? (
            <form onSubmit={handleCommentSubmit} className="post-form">
              <textarea
                placeholder="댓글 내용을 입력하세요"
                value={commentContent}
                onChange={(e) => setCommentContent(e.target.value)}
                required
              />
              <button type="submit" className="main-button">댓글 작성 ✍️</button>
            </form>
          ) : (
            <p>댓글을 작성하려면 로그인하세요.</p>
          )}

          <div className="button-container">
            <Link to="/board" className="main-button">목록으로 📄</Link>
            <Link to="/" className="main-button">홈으로 🏠</Link>
          </div>
        </div>
      </div>
    </VideoBackground>
  );
}

export default PostDetail;
