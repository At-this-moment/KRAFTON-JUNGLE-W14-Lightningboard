# ⚡ Lightning - 이야기가 번개처럼 지나가는 곳

> **크래프톤 정글 14주차 - 실력 다지기 프로젝트**

실시간으로 빠르게 의견을 주고받으며, 짧은 시간 안에 활발한 소통을 이끌어내는 라이트닝 형식의 게시판입니다.

##발표 영상입니다. https://www.youtube.com/watch?v=qiBfjUgSFpU

## 🎯 주요 기능

* **회원가입 및 로그인**

  * 아이디 중복 체크를 통해 중복 가입 방지
* **게시글 작성, 수정, 삭제**

  * 댓글이 달린 게시글은 삭제 불가능
* **댓글 작성, 삭제**

  * 댓글 작성자 본인과 게시글 작성자만 댓글 삭제 가능
* **비로그인 사용자도 게시판 조회 가능**

  * 글이나 댓글 작성을 위해서는 로그인 필요

## 🛠 기술 스택

| 분야           | 기술                                                       |
| ------------ | -------------------------------------------------------- |
| **Frontend** | React, Axios, CSS                                        |
| **Backend**  | Kotlin, Spring Boot, Spring Security, JWT Authentication |

## 📁 프로젝트 구조

```
.
├─ backend
│   └─ src
│       ├─ main
│       │   ├─ kotlin
│       │   │   └─ com.myboard.backend
│       │   │       ├─ config
│       │   │       ├─ controller
│       │   │       ├─ dto
│       │   │       ├─ entity
│       │   │       ├─ repository
│       │   │       ├─ security
│       │   │       └─ service
│       │   └─ resources
└─ frontend
    ├─ public
    └─ src
        ├─ components
        ├─ pages
        ├─ App.js
        ├─ index.js
        └─ index.css
```

## 🚀 프로젝트 실행 방법

### Frontend

```bash
cd frontend
npm install
npm start
```

### Backend

```bash
cd backend
./gradlew bootRun
```

## 🖥 스크린샷

> <img width="1855" alt="화면 캡처 2025-06-19 151514" src="https://github.com/user-attachments/assets/bb2278e5-49ec-41cf-bd65-3eec3a2f6b17" />
> <img width="1834" alt="화면 캡처 2025-06-19 151332" src="https://github.com/user-attachments/assets/0beb7850-c88d-486c-807c-6888914b72b4" />
> <img width="1853" alt="화면 캡처 2025-06-19 151837" src="https://github.com/user-attachments/assets/57cd63de-83b4-402c-a209-31b5b2c4a206" />
> <img width="1851" alt="화면 캡처 2025-06-19 151855" src="https://github.com/user-attachments/assets/62ea3ed7-7aee-41d8-addc-e47ce7aa4e8e" />
> <img width="1855" alt="화면 캡처 2025-06-19 151917" src="https://github.com/user-attachments/assets/722ff047-bd08-48a6-bc33-4efab81a00a2" />




## 🔗 링크

* [Frontend 폴더 바로가기](./frontend)
* [Backend 폴더 바로가기](./backend)

---

**© 2025 크래프톤 정글 14주차 Lightning Board**
