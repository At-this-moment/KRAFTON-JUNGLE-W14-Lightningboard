import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Login.css';
import VideoBackground from './VideoBackground';

function Login({ onLoginSuccess }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    axios.post('http://localhost:8080/api/auth/login', { username, password })
      .then((response) => {
        localStorage.setItem('token', response.data.token);
        onLoginSuccess();
        navigate('/board');
      })
      .catch(() => alert('로그인 실패'));
  };

  return (
    <VideoBackground>
      <div className="login-container">
        <div className="login-box">
          <div className="login-logo">
            <img src="/logo.png" alt="Lightning" />
          </div>
          <form onSubmit={handleLogin}>
            <input type="text" placeholder="아이디" value={username}
              onChange={(e) => setUsername(e.target.value)} required />
            <input type="password" placeholder="비밀번호" value={password}
              onChange={(e) => setPassword(e.target.value)} required />
            <button type="submit">로그인</button>
          </form>
        </div>
      </div>
    </VideoBackground>
  );
}

export default Login;
