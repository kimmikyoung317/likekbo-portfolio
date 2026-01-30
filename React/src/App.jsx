import React, { useState, useEffect, useMemo } from 'react'; // useMemo 추가
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import axios from 'axios';

import LoginPage from './LoginPage/LoginPage';
import SignUpPage from './SignUpPage/SignUpPage';
import AdminProductPage from './AdminProductPage/AdminProductPage';
import ProductDetailPage from './ProductDetailPage/ProductDetailPage';
import TeamsPage from './TeamsPage/TeamsPage'; 
import ProductList from './ProductList/ProductList'; 
import CartPage from './CartPage/CartPage';
import BoardPage from './BoardPage/BoardPage';
import './App.css';

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

  function App() {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('kboCart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  // 1. 데이터 정렬 로직 (KIA -> Lotte -> Samsung)
  // 매번 렌더링될 때마다 정렬하지 않도록 useMemo로 최적화합니다.
  const sortedProducts = useMemo(() => {
    const order = { 'KIA': 1, 'Lotte': 2, 'Samsung': 3 };
    return [...products].sort((a, b) => (order[a.team] || 99) - (order[b.team] || 99));
  }, [products]);

  useEffect(() => {
    localStorage.setItem('kboCart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    setCart(prev => {
      if (prev.find(item => item.id === product.id)) {
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
        console.error("API 연동 에러:", err);
        setLoading(false);
      });
  }, []);

  if (loading) return <div className="loading-screen"><h2>⚾️ KBO 데이터 로딩 중...</h2></div>;

  return (
    <Router>
      <div className="app-container">
        {/* 헤더 네비게이션 부분 */}
        <header className="premium-header"> 
          <div className="utility-nav">
             <Link to="/" className="brand-logo">⚾️KBOLiKe</Link>
            <Link to="/signup" className="util-link">Signup</Link>
            <Link to="/login" className="util-link">Login</Link>
            <Link to="/admin" className="util-link">Admin</Link>
          </div>
         
          
          <nav className="main-nav">
            <Link to="/" className="nav-link">HOME</Link>
            <Link to="/team" className="nav-link">TEAM</Link>
            <Link to="/product" className="nav-link">PRODUCTS</Link>
            <Link to="/board" className="nav-link">BOARD</Link>
            <Link to="/cart" className="nav-link">CART ({cart.length})</Link>
          </nav>

          {/* 유틸리티 메뉴: 작게 따로 관리 */}
         
        </header>

        <main className="content-area">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/team" element={<TeamsPage />} />
            <Route path="/product" element={<ProductList items={sortedProducts} onAddToCart={addToCart} />} />
            {/* 2. 장바구니 라우트 연결 (가장 중요!) */}
            <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/admin" element={<AdminProductPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;