import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate, Link } from 'react-router-dom';
import './Signup.css';
import VideoBackground from './VideoBackground';

function Signup() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSignup = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/users/register', { username, password })
      .then((response) => {
        alert(response.data);
        navigate('/login');
      })
      .catch((error) => {
        if (error.response && error.response.status === 409) {
          alert("이미 동일한 아이디가 있습니다. 다른 아이디를 사용해주세요.");
        } else {
          console.error(error);
          alert("회원가입 중 오류가 발생했습니다. 잠시 후 다시 시도해주세요.");
        }
      });
  };

  return (
    <VideoBackground>
      <div className="signup-container">
        <div className="signup-box">
          <div className="signup-logo">
            <img src="/logo.png" alt="Lightning" />
          </div>
          <form onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="아이디를 입력해주세요"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <input
              type="password"
              placeholder="비밀번호를 입력해주세요"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <button type="submit">회원가입</button>
          </form>
          <div className="links">
            <Link to="/">홈으로</Link>
          </div>
        </div>
      </div>
    </VideoBackground>
  );
}

export default Signup;
