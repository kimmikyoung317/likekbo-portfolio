import React, { useState, useEffect, useMemo } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
} from "react-router-dom";
import { motion } from "framer-motion";
import { Search } from "lucide-react";
import "./App.css";

//  axios instance (토큰 자동 첨부)
import instance from "./instance/instance";

// 컴포넌트 임포트 (기존 경로 유지)
import LoginPage from "./LoginPage/LoginPage";
import SignUpPage from "./SignUpPage/SignUpPage";
import AdminProductPage from "./AdminProductPage/AdminProductPage";
import ProductDetailPage from "./ProductDetailPage/ProductDetailPage";
import ProductList from "./ProductList/ProductList";
import CartPage from "./CartPage/CartPage";
import BoardPage from "./BoardPage/BoardPage";
import Footer from "./Footer/Footer";
import LogoBanner from "./LogoBanner/LogoBanner";
import MyPage from "./MyPage/MyPage";
import SuccessPage from "./SuccessPage/SuccessPage";
import AdminLogin from "./AdminLogin/AdminLogin";
import KboNewsStrip from "./KboNews/KboNewsStrip";
import KboNewsPage from "./KboNews/KboNewsPage";
import KboNewsDetail from "./KboNews/KboNewsDetail";
import AdminKboNewsPage from "./AdminKboNews/AdminKboNewsPage";



//  공통: 토큰/유저정보는 sessionStorage 우선, 없으면 localStorage fallback
const getStoredAuth = () => {
  const accessToken =
    sessionStorage.getItem("accessToken") || localStorage.getItem("accessToken");
  const userName =
    sessionStorage.getItem("userName") || localStorage.getItem("userName");
  const userRole =
    sessionStorage.getItem("userRole") || localStorage.getItem("userRole");

  return { accessToken, userName, userRole };
};

//  유저 전용 문지기: 마이페이지 등 "로그인 필수" 라우트 보호
const PrivateRoute = ({ children }) => {
  const { accessToken } = getStoredAuth();
  if (!accessToken) {
    alert("로그인이 필요합니다 ⚾️");
    return <Navigate to="/login" replace />;
  }
  return children;
};

const Header = () => {
  const userName = localStorage.getItem("userName");

  return (
    <header className="header">
      <h1>⚾ KBOLike</h1>

      {userName ? (
        <div className="login-user">
          반갑습니다, {userName}님.
        </div>
      ) : (
        <Link to="/login">로그인</Link>
      )}
    </header>
  );
};


//  관리자 전용 문지기
const AdminRoute = ({ children }) => {
  const { accessToken, userRole } = getStoredAuth();

  if (!accessToken || userRole !== "ADMIN") {
    alert("관리자 권한이 필요합니다. 로그인 페이지로 이동합니다. ⚾️");
    return <Navigate to="/admin/login" replace />;
  }

  return children;
};

// --- Home 컴포넌트 (기존 UI 유지) ---
const Home = ({ sortedProducts }) => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");

  const teamLinks = [
    { name: "삼성", bg: "url('./assets/sa_card_main.jpg') no-repeat center center / cover" },
    { name: "두산", bg: "url('./assets/ds_card_main.jpg') no-repeat center center / cover" },
    { name: "롯데", bg: "url('./assets/lt_card_main.jpg') no-repeat center center / cover" },
    { name: "LG", bg: "url('./assets/lg_card_main.jpg') no-repeat center center / cover" },
    { name: "기아", bg: "url('./assets/ki_card_main.jpg') no-repeat center center / cover" },
    { name: "KT", bg: "url('./assets/kt_card_main.jpg') no-repeat center center / cover" },
    { name: "SSG", bg: "url('./assets/ss_card_main.jpg') no-repeat center center / cover" },
    { name: "한화", bg: "url('./assets/hh_card_main.jpg') no-repeat center center / cover" },
    { name: "NC", bg: "url('./assets/nc_card_main.jpg') no-repeat center center / cover" },
    { name: "키움", bg: "url('./assets/kw_card_main.jpg') no-repeat center center / cover" },
  ];

  const handleVote = () => {
    const { accessToken } = getStoredAuth();
    if (!accessToken) {
      alert("인증이 필요합니다.");
      navigate("/login");
      return;
    }
    alert("투표가 완료되었습니다! ⚾️");
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchTerm.trim()) {
      navigate(`/product?search=${encodeURIComponent(searchTerm.trim())}`);
    }
  };

  return (
    <div className="home-wrapper">
      <section className="hero-section">
        <div className="hero-content">
          <span className="hero-subtitle">PREMIUM KBO GOODS STORE</span>
          <h1 className="hero-title">
            WIN THE <br /> GAME
          </h1>
          <p className="hero-desc">전설적인 기록, 그 이상의 가치를 소장하세요.</p>
          <Link to="/product" className="hero-btn">
            <span>SHOP⚾️NOW </span>
          </Link>
        </div>

        <div className="team-slider-container reveal">
          <form onSubmit={handleSearch} className="naver-styled-form">
            <div className="search-brand-label">KBOLike</div>
            <input
              type="text"
              placeholder="구단명, 선수명, 굿즈 검색"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="search-main-input"
            />
            <button type="submit" className="search-main-btn">
              <Search size={20} color="#2b59a2" strokeWidth={2.5} className="search-icon-anim" />
            </button>
          </form>
        </div>
      </section>
      <section className="main-vote-hero">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="vote-inner-box"
        >
          <div className="hero-subtitle2">2026 Korean Series </div>
          <h1 className="main-title2">WHO IS THE MVP?</h1>
          <div className="vote-scroll-container">
            {teamLinks.map((team, idx) => (
              <div
                key={idx}
                className="vote-card"
                onClick={handleVote}
                style={{ background: team.bg }}
              >
                <button className="vote-action-btn"></button>
              </div>
            ))}
          </div>
        </motion.div>
      </section>

      {/*  메인 하단 상품 노출 영역 */}
      <section className="main-products-section">
        <ProductList items={sortedProducts.slice(0, 4)} />
      </section>

      <section className="main-kbo-news-section">
      <KboNewsStrip />
      </section>
    </div>
  );
};

function App() {
  const [products, setProducts] = useState([]);
  const [userName, setUserName] = useState(null);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem("kboCart");
    return saved ? JSON.parse(saved) : [];
  });

  //  앱 시작 시 저장된 로그인 정보 복원 (헤더 표시용)
  useEffect(() => {
    const { accessToken, userName: storedName } = getStoredAuth();
    if (accessToken && storedName) setUserName(storedName);
    else setUserName(null);
  }, []);

  //  상품 데이터 로드 (비회원도 볼 수 있어야 함)
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // 공개 상품 목록은 토큰 없어도 OK
        const res = await instance.get("/api/products/all");
        console.log("⚾️ 상품 로드 성공:", res.data);

        const mappedData = res.data.map((p) => {
          let team = "기타";
          const n = p.name || "";
          if (n.includes("기아") || n.includes("KIA")) team = "KIA";
          else if (n.includes("롯데") || n.includes("Lotte")) team = "Lotte";
          else if (n.includes("삼성") || n.includes("Samsung")) team = "Samsung";
          return { ...p, teamName: team };
        });

        setProducts(mappedData);
      } catch (error) {
        console.error(" 상품 로드 실패:", error);
      }
    };

    fetchProducts();
  }, []);

  //  정렬 원칙 반영
  const sortedProducts = useMemo(() => {
    const teamOrder = ["KIA", "Lotte", "LG", "Doosan", "KT", "SSG", "Hanwha", "NC", "Kiwoom", "Samsung"];
    return [...products].sort((a, b) => {
      const idxA = teamOrder.indexOf(a.teamName);
      const idxB = teamOrder.indexOf(b.teamName);
      return (idxA === -1 ? 99 : idxA) - (idxB === -1 ? 99 : idxB);
    });
  }, [products]);

  const addToCart = (product) => {
    setCart((prevCart) => {
      const isExist = prevCart.find((item) => item.id === product.id);
      const updatedCart = isExist
        ? prevCart.map((item) =>
            item.id === product.id ? { ...item, quantity: (item.quantity || 1) + 1 } : item
          )
        : [...prevCart, { ...product, quantity: 1 }];

      localStorage.setItem("kboCart", JSON.stringify(updatedCart));
      return updatedCart;
    });
  };

const handleLoginSuccess = (user) => {
  const resolvedName =
    user?.name ||
    sessionStorage.getItem("userName") ||
    localStorage.getItem("userName") ||
    null;

  setUserName(resolvedName);
};

  const handleLogout = () => {
    //  로그인 정보만 지우고, 장바구니는 정책에 따라 유지/삭제 선택 가능
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userName");
    localStorage.removeItem("userRole");
    sessionStorage.removeItem("accessToken");
    sessionStorage.removeItem("userName");
    sessionStorage.removeItem("userRole");

    setUserName(null);

    // 장바구니까지 초기화하고 싶으면 유지
    setCart([]);
    localStorage.setItem("kboCart", JSON.stringify([]));

    window.location.href = "/";
  };

  return (
    <Router>
      <div className="app-container">
        <header className="premium-header">
          <div className="header-top">
            <Link to="/" className="brand-logo" onClick={() => setIsMenuOpen(false)}>
              KBO⚾️LiKe
            </Link>
            <button
              className={`hamburger ${isMenuOpen ? "active" : ""}`}
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
          </div>

          <nav className={`main-nav ${isMenuOpen ? "open" : ""}`}>
            <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              HOME
            </Link>
            <Link to="/product" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              PRODUCTS
            </Link>
            <Link to="/board" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              BOARD
            </Link>
            <Link to="/cart" className="nav-link" onClick={() => setIsMenuOpen(false)}>
              CART ({cart.length})
            </Link>

            <div className="utility-nav">
              {userName && <span className="welcome-user-text">반갑습니다, {userName}님</span>}

              {userName ? (
                <button onClick={handleLogout} className="util-link logout-btn">
                  Logout
                </button>
              ) : (
                <>
                  <Link to="/signup" className="util-link" onClick={() => setIsMenuOpen(false)}>
                    Signup
                  </Link>
                  <Link to="/login" className="util-link" onClick={() => setIsMenuOpen(false)}>
                    Login
                  </Link>
                </>
              )}

              {/*  마이페이지는 링크는 보여도, 들어가면 PrivateRoute가 막음 */}
              <Link to="/mypage" className="util-link" onClick={() => setIsMenuOpen(false)}>
                MyPage
              </Link>

              <Link to="/admin" className="util-link" onClick={() => setIsMenuOpen(false)}>
                admin
              </Link>
            </div>
          </nav>
        </header>

        <main className="content-area">
          <Routes>
            <Route path="/" element={<Home sortedProducts={sortedProducts} />} />
            <Route path="/product" element={<ProductList items={sortedProducts} onAddToCart={addToCart} />} />
            <Route path="/product/:id" element={<ProductDetailPage items={products} onAddToCart={addToCart} />} />
            <Route path="/cart" element={<CartPage cart={cart} setCart={setCart} />} />
            <Route path="/success" element={<SuccessPage setCart={setCart} />} />
            <Route path="/login" element={<LoginPage onLoginSuccess={handleLoginSuccess} />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/board" element={<BoardPage />} />
            <Route path="/kbo-news" element={<KboNewsPage />} />
            <Route path="/kbo-news/:id" element={<KboNewsDetail />} />
            <Route path="/admin/kbo-news" element={ <AdminRoute> <AdminKboNewsPage /> </AdminRoute> }/>
            {/*  마이페이지: 로그인 후만 */}
            <Route path="/mypage"  element={ <PrivateRoute>  <MyPage /> </PrivateRoute> } />
            {/*  관리자 */}
            <Route path="/admin/login" element={<AdminLogin />} />
            <Route path="/admin" element={ <AdminRoute>
            <AdminProductPage products={products} setProducts={setProducts} /> </AdminRoute> } />
          
          </Routes>
        </main>

        <LogoBanner />
        <Footer />
      </div>
    </Router>
  );
}

export default App;