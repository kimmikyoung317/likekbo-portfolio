import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import './ProductDetailPage.css';

// App.js에서 onAddToCart를 프롭으로 내려받아야 합니다.
const ProductDetailPage = ({ onAddToCart }) => {
  const { id } = useParams();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWished, setIsWished] = useState(false); // 찜 상태 관리

  useEffect(() => {
    axios.get(`http://localhost:8080/api/product/${id}`)
      .then(res => {
        setItem(res.data);
        setLoading(false);
      })
      .catch(err => {
        console.error("데이터 로드 실패", err);
        setLoading(false);
      });
  }, [id]);

  // 찜하기 토글 함수
  const toggleWish = () => {
    setIsWished(!isWished);
    const message = !isWished ? "위시리스트에 담겼습니다! ⚾️" : "위시리스트에서 제외되었습니다.";
    alert(message);
  };

  if (loading) return <div className="loading">⚾️ 데이터를 가져오는 중...</div>;
  if (!item) return <div className="loading">상품을 찾을 수 없습니다.</div>;

  return (
    <div className="premium-detail-container">
      <div className="product-visual">
        <div className="main-img-box">
          <img src={item.imageUrl ? `http://localhost:8080${item.imageUrl}` : 'https://via.placeholder.com/600'} alt={item.name} />
        </div>
      </div>

      <div className="product-content">
        <div className="product-header">
          <span className="brand-tag">{item.team} OFFICIAL</span>
          <h1 className="title-main">{item.name}</h1>
          <p className="title-sub">Premium Limited Edition</p>
        </div>

        <div className="price-section">
          <span className="price-label">구매가</span>
          <div className="price-wrap">
            <span className="price-amount">{item.price?.toLocaleString()}</span>
            <span className="price-unit">원</span>
          </div>
        </div>

        <div className="shipping-banner">
          <p><strong>일반배송</strong> 3,000원 (5-7일 내 도착 예정)</p>
        </div>

        <div className="action-area">
          {/* 🛒 장바구니 담기 클릭 시 App의 addToCart 실행 */}
          <button 
            className="main-buy-btn" 
            onClick={() => onAddToCart(item)}
          >
            장바구니 담기
          </button>
          
          <div className="sub-buttons">
            {/* ⚾️ 찜하기(위시리스트) 버튼 */}
            <button 
              className={`icon-sub-btn ${isWished ? 'active' : ''}`} 
              onClick={toggleWish}
            >
              <span className="icon">{isWished ? '⚾️' : '🔖'}</span>
              <span className="count">{isWished ? 'MY WISH' : '찜하기'}</span>
            </button>
            <button className="icon-sub-btn">
              <span className="icon">📤</span>
              <span className="text">공유</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;