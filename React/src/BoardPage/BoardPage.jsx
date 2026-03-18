import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SubVisual from '../SubVisual/SubVisual'; // ✅ 경로 확인하세요!
import './BoardPage.css';

const BoardPage = () => {
  const [posts, setPosts] = useState([]);
  const [viewMode, setViewMode] = useState('LIST'); // LIST, WRITE, DETAIL, EDIT
  const [selectedPost, setSelectedPost] = useState(null);
  const [formData, setFormData] = useState({ title: '', content: '', author: '팬' });


//조회
  useEffect(() => { fetchPosts(); }, []);
  const fetchPosts = () => {
    axios.get('http://localhost:8080/api/board/all')
      .then(res => setPosts(res.data))
      .catch(err => console.error("데이터 로드 실패:", err));
  };

  // 2. 글 저장/수정 (Create / Update)
  const handleSave = () => {
    const url = viewMode === 'EDIT' 
      ? `http://localhost:8080/api/board/update/${selectedPost.id}`
      : 'http://localhost:8080/api/board/write';
    
    const method = viewMode === 'EDIT' ? 'put' : 'post';

    axios[method](url, formData)
      .then(() => {
        alert(viewMode === 'EDIT' ? "수정되었습니다!" : "저장되었습니다! ⚾️");
        setViewMode('LIST');
        setFormData({ title: '', content: '', author: '팬' });
        fetchPosts(); // 여기서 다시 불러와야 목록에 즉시 뜹니다!
      })
      .catch(err => alert("저장 실패: 서버 상태를 확인하세요."));
  };

  // 3. 삭제 (Delete)
  const handleDelete = (id) => {
    if(!window.confirm("정말 삭제하시겠습니까?")) return;
    axios.delete(`http://localhost:8080/api/board/delete/${id}`)
      .then(() => {
        alert("삭제되었습니다.");
        setViewMode('LIST');
        fetchPosts();
      });
  };

  return (
    <div className="board-page-wrapper">
      {/* ⚾️ 파트너님의 요청대로 공통 SubVisual 적용! */}
      <SubVisual title="FAN ARCHIVE" activeTab="BOARD" />
      <div className="board-container">
        {/* --- 1. 목록 보기 (LIST) --- */}
        {viewMode === 'LIST' && (
          <>
            <table className="board-table">
              <thead>
                <tr><th>번호</th><th>제목</th><th>작성자</th></tr>
              </thead>
              <tbody>
                {posts.map(post => (
                  <tr key={post.id} onClick={() => { setSelectedPost(post); setViewMode('DETAIL'); }} style={{cursor:'pointer'}}>
                    <td>{post.id}</td>
                    <td>{post.title}</td>
                    <td>{post.author || '익명'}</td>
                  </tr>
                ))}
              </tbody>
            </table>
            <button className="write-btn" onClick={() => { setViewMode('WRITE'); setFormData({title:'', content:'', author:'팬'}); }}>글쓰기</button>
          </>
        )}

        {/* --- 2. 글쓰기 & 수정 (WRITE / EDIT) --- */}
        {(viewMode === 'WRITE' || viewMode === 'EDIT') && (
          <div className="write-section">
            <input 
              value={formData.title} 
              onChange={e => setFormData({...formData, title: e.target.value})} 
              placeholder="제목을 입력하세요" 
            />
            <textarea 
              value={formData.content} 
              onChange={e => setFormData({...formData, content: e.target.value})} 
              placeholder="내용을 입력하세요" 
            />
            <div className="btn-group">
              <button onClick={handleSave} className="save-btn">{viewMode === 'EDIT' ? '수정완료' : '등록'}</button>
              <button onClick={() => setViewMode('LIST')}>취소</button>
            </div>
          </div>
        )}

        {/* --- 3. 상세보기 (DETAIL) --- */}
        {viewMode === 'DETAIL' && selectedPost && (
          <div className="detail-section">
            <h3>{selectedPost.title}</h3>
            <p className="post-info">작성자: {selectedPost.author} | 날짜: {selectedPost.date || '2026-02-04'}</p>
            <div className="post-content">{selectedPost.content}</div>
            <div className="btn-group">
              <button onClick={() => { setFormData(selectedPost); setViewMode('EDIT'); }}>수정</button>
              <button onClick={() => handleDelete(selectedPost.id)}>삭제</button>
              <button onClick={() => setViewMode('LIST')}>목록으로</button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BoardPage;