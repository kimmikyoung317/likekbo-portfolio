import React, { useState, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import SubVisual from '../SubVisual/SubVisual';
import './ProductList.css';

const BACKEND_URL = 'http://localhost:8080';

const ProductList = ({ items, onAddToCart, onToggleWish, wishList = [] }) => {
  const navigate = useNavigate();

  const teams = ["전체", "KIA", "Lotte", "LG", "Doosan", "KT", "SSG", "Hanwha", "NC", "Kiwoom", "Samsung"];
  const [activeTab, setActiveTab] = useState("전체");

  const filteredItems = useMemo(() => {
    if (activeTab === "전체") return items;
    return items.filter(item => item.teamName === activeTab);
  }, [activeTab, items]);

  const getToken = () =>
    sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

  const getImageSrc = (imageUrl) => {
    if (!imageUrl) return '/assets/default_product.jpg';
    if (imageUrl.startsWith('http')) return imageUrl;          // 이미 절대경로면 그대로
    if (imageUrl.startsWith('/')) return `${BACKEND_URL}${imageUrl}`; // /uploads/... 같은 케이스
    return `${BACKEND_URL}/${imageUrl}`;                       // uploads/... 같은 케이스
  };

  const handleAddToCart = async (e, product) => {
    e?.preventDefault();

    const token = getToken();
    if (!token) {
      alert("로그인이 필요합니다");
      navigate("/login");
      return;
    }

    try {
      const res = await axios.post(
        `${BACKEND_URL}/api/cart/add`,
        { productId: product.id, quantity: 1 },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      if (res.status === 200 || res.status === 201) {
        onAddToCart(product);
        alert(`⚾️ ${product.name}이(가) 장바구니에 담겼습니다!`);
      }
    } catch (error) {
      console.error("⚾️ 서버 통신 에러:", error);
      onAddToCart(product);
      alert("⚾ 장바구니에 담겼습니다! (네트워크가 불안정하여 로컬에 우선 저장됩니다)");
    }
  };

  const handleWishClick = (e, item) => {
    e.preventDefault();
    if (onToggleWish) onToggleWish(item);
  };

  return (
    <div className="product-list-page-wrapper">
      <SubVisual title="KBO GOODS" activeTab={activeTab === "전체" ? "ALL" : activeTab} />
      <div className="product-list-container">
        <nav className="team-tabs">
          {teams.map(team => (
            <button
              key={team}
              className={`tab-item ${activeTab === team ? 'active' : ''}`}
              onClick={() => setActiveTab(team)}
            >
              {team}
            </button>
          ))}
        </nav>

        <div className="product-grid">
          {filteredItems.map(item => {
            const isWished = wishList.some(wishItem => wishItem.id === item.id);

            return (
              <Link to={`/product/${item.id}`} key={item.id} className="product-card">
                <div className="product-image-wrapper">
                  <img
                    src={getImageSrc(item.imageUrl)}
                    alt={item.name}
                  />
                  <span className={`team-tag ${item.teamName}`}>{item.teamName}</span>

                  <div className="card-actions">
                    <button
                      className={`wish-btn ${isWished ? 'active' : ''}`}
                      onClick={(e) => handleWishClick(e, item)}
                    >
                      {isWished ? '❤️' : '🤍'}
                    </button>

                    <button className="quick-add-btn" onClick={(e) => handleAddToCart(e, item)}>
                      담기
                    </button>
                  </div>
                </div>

                <div className="product-info">
                  <h3 className="product-name">{item.name}</h3>
                  <p className="product-price">₩{item.price?.toLocaleString()}</p>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProductList;