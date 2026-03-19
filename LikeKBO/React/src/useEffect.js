import React, { useState } from 'react';

function ProductPage() {
  // 1. [지역 변수 생성] 입력값과 응답 결과를 담을 그릇
  const [email, setEmail] = useState('');
  const [key, setKey] = useState('');
  const [message, setMessage] = useState('');

  // 2. [호출 함수] 버튼 클릭 시 실행
  const handleRegister = async () => {
    try {
      // 쿼리 스트링 방식으로 백엔드(8080) 호출
      const response = await fetch(`http://localhost:8080/api/auth/finish?email=${email}&key=${key}`, {
        method: 'POST', // 전송 방식은 POST
      });

      if (response.ok) {
        const data = await response.text();
        setMessage(data); // "DB 저장 성공!" 메시지 담기
        alert("성공했습니다!");
      } else {
        setMessage("오류 발생: " + response.status);
      }
    } catch (error) {
      console.error("백엔드 연결 실패:", error);
      setMessage("서버가 꺼져있는지 확인하세요!");
    }
  };

  return (
    <div style={{ padding: '20px', border: '1px solid #ddd' }}>
      <h2>LikeKBO 기기 등록 테스트</h2>
      
      {/* 입력창들 */}
      <input 
        type="text" 
        placeholder="이메일 입력" 
        value={email} 
        onChange={(e) => setEmail(e.target.value)} 
      />
      <input 
        type="text" 
        placeholder="키 입력" 
        value={key} 
        onChange={(e) => setKey(e.target.value)} 
      />

      {/* 3. [호출 버튼] */}
      <button onClick={handleRegister}>DB에 저장하기</button>

      {/* 결과 출력 */}
      {message && <p style={{ color: 'blue' }}>서버 응답: {message}</p>}
    </div>
  );
}

export default ProductPage;