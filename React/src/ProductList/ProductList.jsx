import React, { useState } from 'react';
import { Link } from 'react-router-dom';


const ProductList = ({ items = [], onAddToCart }) => {
  const [visibleCount, setVisibleCount] = useState(9);
  const handleViewMore = () => setVisibleCount(prev => prev + 9);

  // 1. 데이터 정렬 로직 (KIA -> Lotte -> Samsung 순서 준수)
  const sortedItems = [...items].sort((a, b) => {
    const order = { 'KIA': 1, 'Lotte': 2, 'Samsung': 3 };
    return (order[a.team] || 99) - (order[b.team] || 99);
  });

  return (
    <section className="product-all-section">
      <header className="product-list-header">
        <h2 className="product-title">KBOlike Editorial</h2>
        <p className="product-subtitle">abcdefg</p>
      </header>

      <div className="product-grid">
        {sortedItems.slice(0, visibleCount).map((item) => (
          <article key={item.id} className="product-card">
            <div className="product-img-wrapper">
              <Link to={`/product/${item.id}`}>
                <img 
                  src={item.imageUrl ? `http://localhost:8080${item.imageUrl}` : 'https://via.placeholder.com/400x533'} 
                  alt={item.name} 
                  loading="lazy" 
                />
              </Link>
              <button className="quick-cart-btn" onClick={() => onAddToCart(item)}>
                ADD TO CART
              </button>
            </div>

            <div className="product-info">
              <span className="product-team-tag">{item.team}</span>
              <h3 className="product-name">
                <Link to={`/product/${item.id}`}>{item.name}</Link>
              </h3>
              <div className="price-container">
                <p className="product-price">₩{item.price?.toLocaleString()}</p>
                <div className="action-icons">
                  <button className="wish-btn" aria-label="Wishlist">♡</button>
                </div>
              </div>
            </div>
          </article>
        ))}
      </div>

      {visibleCount < sortedItems.length && (
        <div className="view-more-container">
          <button className="view-more-btn" onClick={handleViewMore}>
            EXPLORE MORE ⚾️
          </button>
        </div>
      )}
    </section>
  );
};

export default ProductList;