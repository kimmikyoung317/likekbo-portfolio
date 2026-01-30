import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';
import LoginPage from './LoginPage';
import SignUpPage from './SignUpPage';
import AdminProductPage from './AdminProductPage';
import ProductDetailPage from './ProductDetailPage';
import TeamsPage from './TeamsPage'; 
import './App.css';

// ⚾️ 홈 섹션
const Home = () => (
  <div className="hero-section">
    <div className="hero-overlay">
      <div className="hero-content">
        <span className="hero-subtitle">PREMIUM KBO GOODS STORE</span>
        <h1 className="hero-title">WIN THE <br/> GAME</h1>
        <p className="hero-desc">전설적인 기록, 그 이상의 가치를 소장하세요.</p>
        <Link to="/product" className="hero-btn">SHOP NOW ⚾️</Link>
      </div>
    </div>
  </div>
);

// ⚾️ 상품 목록 컴포넌트
const ProductList = ({ items, onAddToCart }) => {
  const [visibleCount, setVisibleCount] = useState(9); 
  const handleViewMore = () => setVisibleCount(prev => prev + 9); 

  const sortedItems = [...items].sort((a, b) => {
    const order = { 'KIA': 1, 'Lotte': 2, 'Samsung': 3 }; // 우선순위 준수 [cite: 2026-01-27]
    return (order[a.team] || 99) - (order[b.team] || 99);
  });

  return (
    <div className="product-all-section">
      <div className="product-grid">
        <h3 className='product-title'>KBOlike</h3><br></br>
        {sortedItems.slice(0, visibleCount).map(item => (
          <div key={item.id} className="product-card">
             <Link to={`/product/${item.id}`} className="product-img-wrapper">
                <img src={item.imageUrl ? `http://localhost:8080${item.imageUrl}` : 'https://via.placeholder.com/300'} alt={item.name} />
             </Link>
             <div className="product-info">
                <h3 className="product-name">{item.name}</h3>
                <div className="price-container">
                    <p className="product-price">₩{item.price?.toLocaleString()}</p>
                    <div className="action-icons">
                        <button className="wish-btn"></button>
                        <button className="cart-btn" onClick={() => onAddToCart(item)}></button>
                    </div>
                </div>
             </div>
          </div>
        ))}
      </div>
      {visibleCount < items.length && (
        <div className="view-more-container">
          <button className="view-more-btn" onClick={handleViewMore}>VIEW MORE ⚾️</button>
        </div>
      )}
    </div>
  );
};

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  // 1. [장바구니 상태 및 로직] 
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('kboCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('kboCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      const isExist = prev.find(item => item.id === product.id);
      if (isExist) {
        alert("이미 장바구니에 담긴 상품입니다! ⚾️");
        return prev;
      }
      alert(`${product.name}이(가) 장바구니에 담겼습니다!`);
      return [...prev, product];
    });
  };

  useEffect(() => {
    setLoading(true);
    axios.get('http://localhost:8080/api/product/all') 
      .then(res => {
        setProducts(res.data);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading-screen"><h2>⚾️ KBO 데이터 로딩 중...</h2></div>;

  return (
    <Router>
      <div className="app-container">
        <header className="premium-header">
          <Link to="/" className="brand-logo">⚾️KBOLiKe</Link>
          <nav className="premium-nav">
            <Link to="/" className="nav-link">HOME</Link>
            <Link to="/product" className="nav-link">PRODUCTS</Link>
            <Link to="/teams" className="nav-link">TEAMS</Link>
            <Link to="/cart" className="nav-link">CART ({cart.length})</Link>
            <Link to="/login" className="nav-link">LOGIN</Link>
          </nav>
        </header>

        <main className="content-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/product" element={<ProductList items={products} onAddToCart={addToCart} />} />
            {/* 핵심 수정: 중복 라우트 제거 및 프롭 전달 버전만 유지 */}
            <Route path="/product/:id" element={<ProductDetailPage onAddToCart={addToCart} />} />
            <Route path="/teams" element={<TeamsPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminProductPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;