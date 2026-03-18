import React from 'react';
import './Footer.css';

const Footer = () => {
  return (
    <footer className="kbo-footer">
      <div className="footer-content">
        <div className="footer-brand">
          <span className="footer-logo"> KBOLiKe</span>
          <p className="footer-slogan">당신의 팀, 당신의 열정, 그 이상의 가치</p>
        </div>
        
        <div className="footer-info">
          <div className="info-item">
            <span>사업주</span>
            <strong>라이크베이스볼코리아</strong>
          </div>
          <div className="info-item">
            <span>사업자 등록번호</span>
            <strong>123-456-78</strong>
          </div>
          <div className="info-item">
            <span>전화번호</span>
            <strong>070-1234-5678</strong>
          </div>
          <div className="info-item">
            <span>사업장</span>
            <strong>대구광역시 중구 남일로 10 16층</strong>
          </div>
        </div>
        
        <div className="footer-bottom">
          <p>© 2026 KBOLiKe Korea. All rights reserved. ⚾</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;