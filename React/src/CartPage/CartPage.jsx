import React, { useMemo, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import SubVisual from '../SubVisual/SubVisual';
import './CartPage.css';

const BACKEND_URL = 'http://localhost:8080';

const CartPage = ({ cart = [], setCart }) => {
  const navigate = useNavigate();

  const getToken = () =>
    sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');

  const getUserName = () =>
    sessionStorage.getItem('userName') || localStorage.getItem('userName') || '회원';

  const getImageSrc = (imageUrl) => {
    if (!imageUrl) return '/images/default-product.png';
    if (imageUrl.startsWith('http')) return imageUrl;
    if (imageUrl.startsWith('/')) return `${BACKEND_URL}${imageUrl}`;
    return `${BACKEND_URL}/${imageUrl}`;
  };

  // ✅ 장바구니 복구 로직 (마운트 시 실행)
  useEffect(() => {
    const token = getToken();
    if (!token) return;

    const savedCart = localStorage.getItem('kboCart');
    if (savedCart) setCart(JSON.parse(savedCart));
  }, [setCart]);

  // ⚾️ 정렬 로직: KIA(1) -> Lotte(2) -> ... -> Samsung(100)
  const sortedCart = useMemo(() => {
    if (!Array.isArray(cart)) return [];
    const orderMap = { KIA: 1, Lotte: 2, Samsung: 100 };
    return [...cart].sort(
      (a, b) =>
        (orderMap[a.teamName || a.team] || 50) -
        (orderMap[b.teamName || b.team] || 50)
    );
  }, [cart]);

  const totalPrice = useMemo(
    () =>
      cart.reduce(
        (sum, item) => sum + (Number(item.price) * (item.quantity || 1) || 0),
        0
      ),
    [cart]
  );

  // ✅ 결제 로직
  const handlePayment = async () => {
    const token = getToken();
    if (!token) {
      alert('로그인이 필요합니다. 로그인 페이지로 이동합니다. ⚾️');
      navigate('/login');
      return;
    }

    if (!cart || cart.length === 0) {
      alert('⚾️ 장바구니가 비어 있습니다.');
      return;
    }

    if (!window.TossPayments) {
      alert('⚾️ 결제 모듈이 아직 로드되지 않았습니다. 잠시 후 다시 시도해주세요.');
      return;
    }

    const clientKey = 'test_ck_P9BRQmyarYYzpQLKnL6NrJ07KzLN';
    const tossPayments = window.TossPayments(clientKey);
    const orderId = `order_${Date.now()}_${Math.floor(Math.random() * 1000)}`;

    const orderName =
      sortedCart.length > 1
        ? `${sortedCart[0]?.name ?? 'KBO 굿즈'} 외 ${sortedCart.length - 1}건`
        : sortedCart[0]?.name ?? 'KBO 굿즈';

    try {
      await tossPayments.requestPayment('카드', {
        amount: Number(totalPrice),
        orderId,
        orderName,
        customerName: getUserName(),
        successUrl: `${window.location.origin}/success`,
        failUrl: `${window.location.origin}/cart`,
      });
    } catch (error) {
      console.error('결제 호출 에러:', error);
      alert(`⚾️ 결제 요청 실패: ${error.message}`);
    }
  };

  return (
    <div className="cart-page-wrapper">
      <SubVisual title="SHOPPING CART" subtitle="나만의 프리미엄 KBO 굿즈 리스트" />

      <div className="cart-container">
        <h2 className="cart-title">SHOPPING CART</h2>

        {cart.length === 0 ? (
          <div className="empty-msg">장바구니가 비어있습니다. ⚾️</div>
        ) : (
          <div className="cart-layout-grid">
            <div className="cart-list-area">
              {sortedCart.map((item, idx) => (
                <div key={`${item.id}-${idx}`} className="cart-item-card">
                  <img
                    src={getImageSrc(item.imageUrl || item.image)}
                    alt={item.name}
                    className="cart-img"
                    onError={(e) => {
                      e.currentTarget.src = '/images/default-product.png';
                    }}
                  />

                  <div className="item-info">
                    <span className={`team-badge ${item.teamName || item.team}`}>
                      {item.teamName || item.team}
                    </span>
                    <h4>{item.name}</h4>
                    <p>
                      ₩{Number(item.price).toLocaleString()} (수량: {item.quantity || 1})
                    </p>
                  </div>

                  <button
                    className="item-remove-btn"
                    onClick={() => {
                      const newCart = cart.filter((_, i) => i !== idx);
                      setCart(newCart);
                      localStorage.setItem('kboCart', JSON.stringify(newCart));
                    }}
                  >
                    ✕
                  </button>
                </div>
              ))}
            </div>

            <div className="summary-card">
              <h3 className="summary-title">TOTAL</h3>
              <div className="summary-row total">
                <span>결제금액</span>
                <span className="final-price">₩{totalPrice.toLocaleString()}원</span>
              </div>
              <button className="checkout-action-btn" onClick={handlePayment}>
                CHECKOUT NOW ⚾️
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default CartPage;