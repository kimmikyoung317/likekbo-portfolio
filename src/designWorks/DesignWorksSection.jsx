import { useState } from "react";
import { Link } from "react-router-dom";
import "./DesignWorksSection.css";

import img1 from "../assets/DesignDetailPage1.jpg";
import img2 from "../assets/DesignDetailPage2.jpg";
import img3 from "../assets/DesignDetailPage3.jpg";
import img4 from "../assets/DesignDetailPage4.jpg";

export default function DesignWorksSection() {
  const works = [
    {
      id: 1,
      image: img1,
      title: "여성 골프웨어",
      desc: "프리미엄 무드의 패션 상세페이지",
      path: "/design/detail-1",
    },
    {
      id: 2,
      image: img2,
      title: "감자탕",
      desc: "식욕을 자극하는 푸드 상세페이지",
      path: "/design/detail-2",
    },
    {
      id: 3,
      image: img3,
      title: "전기차 충전기",
      desc: "기능 설명 중심의 홍보형 상세페이지",
      path: "/design/detail-3",
    },
    {
      id: 4,
      image: img4,
      title: "자연산 송이",
      desc: "프리미엄 식재료 상세페이지",
      path: "/design/detail-4",
    },
  ];

  const [startIndex, setStartIndex] = useState(0);
  const visibleCount = 3;

  const nextSlide = () => {
    if (startIndex < works.length - visibleCount) {
      setStartIndex((prev) => prev + 1);
    }
  };

  const prevSlide = () => {
    if (startIndex > 0) {
      setStartIndex((prev) => prev - 1);
    }
  };

  const visibleWorks = works.slice(startIndex, startIndex + visibleCount);

  return (
    <section className="design-works-section">
      <div className="design-works-header">
        <p className="design-works-label">Design Archive</p>
        <h2>상세페이지 작업</h2>
        <p className="design-works-subtitle">
          다양한 상품군의 상세페이지 작업을 카드형 슬라이드로 정리했습니다.
        </p>
      </div>

      <div className="design-slider-wrap">
        <button className="design-nav-btn" onClick={prevSlide}>
          ‹
        </button>

        <div className="design-card-track">
          {visibleWorks.map((work) => (
            <Link
              to={work.path}
              className="design-card"
              key={work.id}
            >
              <div className="design-card-image-wrap">
                <img src={work.image} alt={work.title} className="design-card-image" />
              </div>

              <div className="design-card-content">
                <h3>{work.title}</h3>
                <p>{work.desc}</p>
              </div>
            </Link>
          ))}
        </div>

        <button className="design-nav-btn" onClick={nextSlide}>
          ›
        </button>
      </div>
    </section>
  );
}