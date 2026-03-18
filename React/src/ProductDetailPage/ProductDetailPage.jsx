import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import './ProductDetailPage.css';
import SubVisual from '../SubVisual/SubVisual';

const BACKEND_URL = 'http://localhost:8080';

const ProductDetailPage = ({ items = [], onAddToCart }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isWished, setIsWished] = useState(false);

  const getToken = () =>
    sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

  const getImageSrc = (imageUrl) => {
    if (!imageUrl) return 'https://via.placeholder.com/400';
    if (imageUrl.startsWith('http')) return imageUrl;
    if (imageUrl.startsWith('/')) return `${BACKEND_URL}${imageUrl}`;
    return `${BACKEND_URL}/${imageUrl}`;
  };

  // 1. 데이터 로드: 서버 우선, 실패 시 로컬 mockData 활용
  useEffect(() => {
    let isMounted = true;
    setLoading(true);

    const fetchProduct = async () => {
      try {
        // ✅ 여기 API 경로도 통일(프로젝트에 따라 /api/products/{id} 일 수도 있음)
        const res = await axios.get(`${BACKEND_URL}/api/product/${id}`);
        if (isMounted) {
          setItem(res.data);
          setLoading(false);
        }
      } catch (err) {
        console.warn('서버 호출 실패, 로컬 데이터에서 복구 시도...');
        const foundItem = items.find((p) => String(p.id) === String(id));
        if (isMounted) {
          setItem(foundItem || null);
          setLoading(false);
        }
      }
    };

    fetchProduct();
    return () => {
      isMounted = false;
    };
  }, [id, items]);

  // 2. 장바구니 담기: 토큰(session/local) 통일 + 서버/로컬 병행 처리
  const handleAddToCart = async () => {
    const token = getToken();

    if (!token) {
      alert('로그인이 필요합니다! 로그인 페이지로 이동합니다. ⚾️');
      navigate('/login');
      return;
    }

    try {
      const response = await axios.post(
        `${BACKEND_URL}/api/cart/add`,
        { productId: item.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (response.status === 200 || response.status === 201) {
        alert('⚾️ 장바구니에 상품을 담았습니다!');
        onAddToCart?.(item);
      }
    } catch (error) {
      console.warn('서버 장바구니 연동 실패, 로컬 모드로 즉시 전환합니다.');
      onAddToCart?.(item);
      alert('⚾️ 장바구니에 상품을 성공적으로 담았습니다! (로컬 저장)');

      if (error.response?.status === 401 || error.response?.status === 403) {
        alert('인증이 만료되었습니다. 다시 로그인해 주세요.');
        navigate('/login');
      }
    }
  };

  const toggleWish = () => {
    setIsWished((prev) => !prev);
    alert(!isWished ? '위시리스트에 담겼습니다! ⚾️' : '위시리스트에서 제외되었습니다.');
  };

  if (loading) return <div className="loading">⚾️ 데이터를 가져오는 중...</div>;
  if (!item) return <div className="loading">상품 정보를 찾을 수 없습니다.</div>;

  return (
    <div className="DetailPage-container">
      <SubVisual title="PRODUCT DETAIL" activeTab="SHOP" />

      <div className="premium-detail-container">
        <div className="product-visual">
          <div className="main-img-box">
            <img
              src={getImageSrc(item?.imageUrl)}
              alt={item?.name || 'Product Image'}
              onError={(e) => {
                e.currentTarget.onerror = null;
                e.currentTarget.src = 'https://via.placeholder.com/400';
              }}
            />
          </div>
        </div>

        <div className="product-content">
          <div className="product-header">
            <span className="brand-tag">{(item.teamName || item.team || 'KBO')} OFFICIAL</span>
            <h1 className="title-main">{item.name}</h1>
            <p className="title-sub">Premium Limited Edition</p>
          </div>

          <div className="price-section">
            <span className="price-label">구매가</span>
            <div className="price-wrap">
              <span className="price-amount">{(item.price || 0).toLocaleString()}</span>
              <span className="price-unit">원</span>
            </div>
          </div>

          <div className="action-area">
            <button className="main-buy-btn" onClick={handleAddToCart}>
              장바구니 담기
            </button>

            <div className="sub-buttons">
              <button className={`icon-sub-btn ${isWished ? 'active' : ''}`} onClick={toggleWish}>
                <span className="icon">{isWished ? '⚾️' : '🔖'}</span>
                <span className="count">{isWished ? 'MY WISH' : '찜하기'}</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailPage;