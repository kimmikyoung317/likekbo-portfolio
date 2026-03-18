import React, { useState } from 'react';
import './MyPage.css';

const MyPage = () => {
  const [activeTab, setActiveTab] = useState('PROFILE');
  // 임시 사용자 데이터 (나중에 DB 연결)
  const [user, setUser] = useState({
    name: " ",
    email: "partner@kbo.com",
    favoriteTeam: "KIA", // 
    joinDate: "2026-02-04"
  });

  return (
    <div className="mypage-container">
      <div className="mypage-sidebar">
        <h2>MY PAGE</h2>
        <ul>
          <li className={activeTab === 'PROFILE' ? 'active' : ''} onClick={() => setActiveTab('PROFILE')}>내 정보 관리</li>
          <li className={activeTab === 'ORDER' ? 'active' : ''} onClick={() => setActiveTab('ORDER')}>주문 내역</li>
          <li className={activeTab === 'WISH' ? 'active' : ''} onClick={() => setActiveTab('WISH')}>위시리스트</li>
        </ul>
      </div>

      <div className="mypage-content">
        {activeTab === 'PROFILE' && (
          <div className="profile-section">
            <h3>계정 정보</h3>
            <div className="info-group">
              <label>이름</label>
              <input type="text" value={user.name} readOnly />
            </div>
            <div className="info-group">
              <label>이메일</label>
              <p>{user.email} <span className="auth-badge">인증완료</span></p>
            </div>
            <div className="info-group">
              <label>응원 구단</label>
              <select value={user.favoriteTeam} onChange={(e) => setUser({...user, favoriteTeam: e.target.value})}>
                <option value="KIA">KIA 타이거즈</option>
                <option value="Lotte">롯데 자이언츠</option>
                <option value="Doodsan">두산 베어스</option>
                <option value="Samsung">엘지 트윈스</option>
                <option value="Samsung">케이티 위즈</option>
                <option value="Samsung">에스에스지 랜더스</option>
                <option value="Samsung">키움 히어로즈</option>
                <option value="Samsung">엔씨 다이노스</option>
                <option value="Samsung">한화 이글스</option>
                <option value="Samsung">삼성 라이온즈</option>
                {/* 나머지 구단 추가 */}
              </select>
            </div>
            <p className="passwordless-notice"></p>
          </div>
        )}

        {activeTab === 'ORDER' && (
          <div className="order-section">
            <h3>최근 주문 내역</h3>
            <div className="empty-msg">아직 주문한 상품이 없습니다. ⚾️</div>
          </div>
        )}
      </div>
    </div>
  );
};

export default MyPage;