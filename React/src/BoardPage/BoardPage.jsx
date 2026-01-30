import React, { useState } from 'react';
import './BoardPage.css';

const BoardPage = () => {
  // 샘플 데이터 (나중에 API 연결)
  const [posts] = useState([
    { id: 1, title: "KIA 타이거즈 유니폼 사이즈 문의", author: "호랑이팬", date: "2026-01-30" },
    { id: 2, title: "롯데 자이언츠 굿즈 배송 언제오나요?", author: "갈매기", date: "2026-01-29" },
    { id: 3, title: "삼성 라이온즈 올드 유니폼 재입고 요청!", author: "사자왕", date: "2026-01-28" },
  ]);

  return (
    <div className="board-container">
      <h2>FAN BOARD</h2>
      <table className="board-table">
        <thead>
          <tr>
            <th>번호</th>
            <th>제목</th>
            <th>작성자</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          {posts.map(post => (
            <tr key={post.id}>
              <td>{post.id}</td>
              <td className="post-title">{post.title}</td>
              <td>{post.author}</td>
              <td>{post.date}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button className="write-btn">글쓰기</button>
    </div>
  );
};

export default BoardPage;