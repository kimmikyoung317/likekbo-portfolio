import { useState } from "react";
import { Link } from "react-router-dom";
import "./DesignDetailPage.css";

import img1 from "../assets/DesignDetailPage1.jpg";
import img2 from "../assets/DesignDetailPage2.jpg";
import img3 from "../assets/DesignDetailPage3.jpg";
import img4 from "../assets/DesignDetailPage4.jpg";

export default function DesignDetailPage1() {
  const works = [
    {
      image: img1,
      title: "여성 골프웨어 상세페이지",
      desc: "프리미엄 이미지를 강조하기 위해 시각적 여백과 컬러 밸런스를 조정한 상세페이지 작업입니다."
    },
    {
      image: img2,
      title: "감자탕 상세페이지",
      desc: "음식의 식욕 자극 요소를 강조하고 정보 전달력을 높이기 위해 이미지 중심으로 구성했습니다."
    },
    {
      image: img3,
      title: "전기차 충전기 홍보 페이지",
      desc: "기능 설명과 신뢰도를 강조하기 위해 구조적인 정보 배치와 강조 요소를 적용했습니다."
    },
    {
      image: img4,
      title: "자연산 송이 상세페이지",
      desc: "고급 식재료 이미지를 살리기 위해 자연 친화적인 톤과 간결한 레이아웃을 적용했습니다."
    }
  ];

  const [current, setCurrent] = useState(0);

  const next = () => {
    setCurrent((prev) => (prev + 1) % works.length);
  };

  const prev = () => {
    setCurrent((prev) => (prev === 0 ? works.length - 1 : prev - 1));
  };

  return (
    <main className="design-detail-page">
      <div className="design-detail-container">
        <Link to="/" className="design-detail-back">
          ← 메인으로 돌아가기
        </Link>

        <section className="design-detail-hero">
          <p className="design-detail-category">Design Works</p>
          <h1>상세페이지 작업 모음</h1>
          <p className="design-detail-summary">
            다양한 상품군의 특성에 맞춰 정보 전달 방식과 시각적 흐름을 설계한 상세페이지 작업입니다.
          </p>
        </section>

        <div className="slider">
          <button className="slider-btn left" onClick={prev}>
            ‹
          </button>

          <img
            src={works[current].image}
            alt={works[current].title}
            className="slider-image"
          />

          <button className="slider-btn right" onClick={next}>
            ›
          </button>
        </div>

        <div className="slide-info">
          <h2>{works[current].title}</h2>
          <p>{works[current].desc}</p>
        </div>

        <div className="thumbnail-wrap">
          {works.map((work, index) => (
            <img
              key={index}
              src={work.image}
              alt={work.title}
              className={`thumbnail ${current === index ? "active" : ""}`}
              onClick={() => setCurrent(index)}
            />
          ))}
        </div>
      </div>
    </main>
  );
}