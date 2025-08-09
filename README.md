# Lightning - 이야기가 번개처럼 지나가는 곳

> **크래프톤 정글 14주차 - 실력 다지기 프로젝트**

실시간으로 빠르게 의견을 주고받으며, 짧은 시간 안에 활발한 소통을 이끌어내는 라이트닝 형식의 게시판입니다.

## 발표 영상

[https://www.youtube.com/watch?v=qiBfjUgSFpU](https://www.youtube.com/watch?v=qiBfjUgSFpU)

## 스크린샷

| 화면 1                                                                                                                    | 화면 2                                                                                                                    |
| ----------------------------------------------------------------------------------------------------------------------- | ----------------------------------------------------------------------------------------------------------------------- |
| <img width="900" alt="화면 캡처 1" src="https://github.com/user-attachments/assets/bb2278e5-49ec-41cf-bd65-3eec3a2f6b17" /> | <img width="900" alt="화면 캡처 2" src="https://github.com/user-attachments/assets/0beb7850-c88d-486c-807c-6888914b72b4" /> |
| <img width="900" alt="화면 캡처 3" src="https://github.com/user-attachments/assets/57cd63de-83b4-402c-a209-31b5b2c4a206" /> | <img width="900" alt="화면 캡처 4" src="https://github.com/user-attachments/assets/62ea3ed7-7aee-41d8-addc-e47ce7aa4e8e" /> |
| <img width="900" alt="화면 캡처 5" src="https://github.com/user-attachments/assets/722ff047-bd08-48a6-bc33-4efab81a00a2" /> |                                                                                                                         |



## 주요 기능

* **회원가입 및 로그인**

  * 아이디 중복 체크를 통해 중복 가입 방지
* **게시글 작성, 수정, 삭제**

  * 댓글이 달린 게시글은 삭제 불가능
* **댓글 작성, 삭제**

  * 댓글 작성자 본인과 게시글 작성자만 댓글 삭제 가능
* **비로그인 사용자도 게시판 조회 가능**

  * 글이나 댓글 작성을 위해서는 로그인 필요

## 기술 스택

| 분야       | 기술                                                       |
| -------- | -------------------------------------------------------- |
| Frontend | React, Axios, CSS                                        |
| Backend  | Kotlin, Spring Boot, Spring Security, JWT Authentication |

## 프로젝트 구조

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

## 프로젝트 실행 방법

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



## 링크

* [14주차 실력다지기 진행상황 1 벨로그](https://velog.io/@qnfrma1997/14%EC%A3%BC%EC%B0%A8-%EC%8B%A4%EB%A0%A5%EB%8B%A4%EC%A7%80%EA%B8%B0-%EC%A7%84%ED%96%89%EC%83%81%ED%99%A9-1)
* [14주차 실력다지기 진행상황 2 벨로그](https://velog.io/@qnfrma1997/14%EC%A3%BC%EC%B0%A8-%EC%8B%A4%EB%A0%A5%EB%8B%A4%EC%A7%80%EA%B8%B0-%EC%A7%84%ED%96%89%EC%83%81%ED%99%A9-2)
