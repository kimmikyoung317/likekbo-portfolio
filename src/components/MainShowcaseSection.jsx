import { useState } from "react";
import mainImage from "../assets/main.png";

function MainShowcaseSection() {
  const [open, setOpen] = useState(false);

  const points = [
    "강한 히어로 비주얼로 첫인상 강화",
    "KBO 브랜딩을 전면에 배치한 메인 구조",
    "MVP 섹션, 상품 섹션, 소식 섹션을 한 화면에 연결",
    "전자상거래와 커뮤니티 확장 가능성을 동시에 보여주는 메인 설계",
  ];

  return (
    <section className="section">
      <div className="container">
        <h2>대표 화면</h2>
        <p className="section-intro">
          가장 공을 들인 메인 페이지입니다. 서비스의 분위기, 브랜딩, 핵심 기능 흐름이
          한 화면에서 드러나도록 구성했습니다.
        </p>

        <div className="main-showcase-card">
          <div className="main-showcase-image-wrap" onClick={() => setOpen(true)}>
            <img src={mainImage} alt="LikeKBO 메인 페이지" className="main-showcase-image" />
            {/* <div className="main-showcase-overlay">클릭해서 크게 보기</div> */}
          </div>

          <div className="main-showcase-content">
            <h3>메인 페이지 설계 포인트</h3>
            <ul className="trouble-list">
              {points.map((point) => (
                <li key={point}>{point}</li>
              ))}
            </ul>
             <a
                href="https://likekbo.vercel.app"
                target="_blank"
                rel="noopener noreferrer"
                className="project-link-btn"
            >
                 실제 서비스 보러가기
            </a>

            

          </div>
        </div>

        {open && (
          <div className="modal" onClick={() => setOpen(false)}>
            <div className="modal-content modal-content-wide">
              <img src={mainImage} alt="LikeKBO 메인 페이지 확대" />
              <p>LikeKBO 메인 페이지</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default MainShowcaseSection;