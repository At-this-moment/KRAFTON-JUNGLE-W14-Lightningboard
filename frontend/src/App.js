import React, { useState, useEffect } from 'react';
import { Routes, Route, Link, useNavigate } from 'react-router-dom';
import BoardList from './components/BoardList';
import PostDetail from './components/PostDetail';
import PostForm from './components/PostForm';
import Login from './components/Login';
import Signup from './components/Signup';
import { jwtDecode } from 'jwt-decode';
import PostEdit from './components/PostEdit';

function Home({ isLoggedIn, handleLogout }) {
  return (
    <div className="home-container" style={{ position: 'relative', overflow: 'hidden', height: '100vh', display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
      <video autoPlay loop muted style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        objectFit: 'cover',
        top: 0,
        left: 0,
        zIndex: -1
      }}>
        <source src="/lightning.mp4" type="video/mp4" />
      </video>

      <div style={{ position: 'relative', zIndex: 1, color: 'white', textAlign: 'center' }}>
        <h1 className="main-title">Lightning</h1>
        <p className="main-subtitle yeon-sung-regular">이야기가 번개처럼 지나가는 곳</p>

        {isLoggedIn ? (
          <div className="button-container">
            <Link to="/write" className="main-button">글쓰기</Link>
            <Link to="/board" className="main-button">게시판 보기</Link>
            <button onClick={handleLogout} className="main-button logout-button">Logout</button>
          </div>
        ) : (
          <div className="button-container">
            <Link to="/signup" className="main-button">Signup</Link>
            <Link to="/login" className="main-button">Login</Link>
          </div>
        )}
      </div>
    </div>
  );
}





function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    setIsLoggedIn(token && jwtDecode(token).exp * 1000 > Date.now());
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
    navigate('/');  //메인 화면으로 이동
  };

  const handleLoginSuccess = () => {
    setIsLoggedIn(true);
    navigate('/');
  };

  return (
    <>
      <Routes>
        <Route path="/" element={<Home isLoggedIn={isLoggedIn} handleLogout={handleLogout} />} />
        <Route path="/board" element={<BoardList />} />
        <Route path="/board/:postId" element={<PostDetail />} />
        <Route path="/write" element={<PostForm />} />
        <Route path="/login" element={<Login onLoginSuccess={handleLoginSuccess} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/edit/:postId" element={<PostEdit />} />
      </Routes>
    </>
  );
}

export default App;
