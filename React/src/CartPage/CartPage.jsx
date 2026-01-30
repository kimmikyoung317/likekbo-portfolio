import React, { useMemo } from 'react';
import './CartPage.css';

const CartPage = ({ cart, setCart }) => {
  // 1. 장바구니 내에서도 우리만의 정렬 규칙 적용 (KIA -> Lotte -> Samsung)
  const sortedCart = useMemo(() => {
    const order = { 'KIA': 1, 'Lotte': 2, 'Samsung': 3 };
    return [...cart].sort((a, b) => (order[a.team] || 99) - (order[b.team] || 99));
  }, [cart]);

  // 2. 총 결제 금액 계산
  const totalPrice = useMemo(() => {
    return cart.reduce((sum, item) => sum + (Number(item.price) || 0), 0);
  }, [cart]);

  const removeItem = (id) => {
    if (window.confirm("장바구니에서 삭제할까요?")) {
      setCart(cart.filter(item => item.id !== id));
    }
  };

  return (
    <div className="cart-container">
      <h2 className="cart-title">SHOPPING CART</h2>
      
      {cart.length === 0 ? (
        <div className="empty-cart">
          <p>장바구니가 비어있습니다. ⚾️</p>
        </div>
      ) : (
        <>
          <div className="cart-list">
            {sortedCart.map(item => (
              <div key={item.id} className="cart-item">
                <img src={item.image} alt={item.name} className="cart-img" />
                <div className="item-info">
                  <span className="team-tag">{item.team}</span>
                  <h4>{item.name}</h4>
                  <p className="item-price">{item.price?.toLocaleString()}원</p>
                </div>
                <button className="delete-btn" onClick={() => removeItem(item.id)}>Remove</button>
              </div>
            ))}
          </div>

          <div className="cart-footer">
            <div className="total-section">
              <span>TOTAL</span>
              <span className="total-price">{totalPrice.toLocaleString()}원</span>
            </div>
            <button className="checkout-btn">CHECKOUT NOW</button>
          </div>
        </>
      )}
    </div>
  );
};

export default CartPage;