import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';

// JWT 토큰을 모든 Axios 요청 헤더에 자동 추가하는 인터셉터 설정
axios.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');  // JWT 토큰 가져오기
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;  // 헤더에 토큰 추가
    }
    return config;
  },
  (error) => Promise.reject(error)
);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <BrowserRouter>
    <App />
  </BrowserRouter>
);