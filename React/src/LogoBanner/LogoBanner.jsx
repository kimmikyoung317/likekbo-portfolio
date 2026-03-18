import React, { useRef } from 'react';
import './LogoBanner.css';

const LogoBanner = () => {
  const scrollRef = useRef(null);

  // 버튼 클릭 시 수동 스크롤 로직
  const scroll = (direction) => {
    if (scrollRef.current) {
      const { scrollLeft, clientWidth } = scrollRef.current;
      const scrollTo = direction === 'left' ? scrollLeft - clientWidth : scrollLeft + clientWidth;
      scrollRef.current.scrollTo({ left: scrollTo, behavior: 'smooth' });
    }
  };

  // 구단 로고 데이터 (사이즈: 100x70 권장)
  const logos = [
    
    { name: '광고1', img: '/logos/kia.png' },
    { name: '광고2', img: '/logos/lotte.png' },
    { name: '광고3', img: '/logos/doosan.png' },
    { name: '광고4', img: '/logos/hanwha.png' }, 
    { name: '광고5', img: '/logos/lg.png' }, 
    { name: '광고6', img: '/logos/nc.png' }, 
    { name: '광고7', img: '/logos/kt.png' }, 
    { name: '광고8', img: '/logos/kiwoom.png' }, 
    { name: '광고9', img: '/logos/team.png' }, 
    { name: '광고10', img: '/logos/samsung.png', url:'https://samsunglionsmall.com/' } 
 
  ];

  return (
    <div className="logo-slider-wrapper">
      <p></p>
      <button className="nav-btn left" onClick={() => scroll('left')}>&lt;</button>
      
      <div className="logo-track" ref={scrollRef}>
        {/* 무한 루프 느낌을 위해 리스트를 복사해서 배치할 수도 있습니다 */}
        {logos.map((logo, idx) => (
          <div key={idx} className="logo-item">
            <img src={logo.img} alt={logo.name} />
          </div>
          
        ))}
      </div>

      <button className="nav-btn right" onClick={() => scroll('right')}>&gt;</button>
    </div>
  );
};

export default LogoBanner;