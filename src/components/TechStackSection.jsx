import { Link } from "react-router-dom";
import "./DesignWorksSection.css";

import thumb1 from "../assets/DesignDetailPage1.jpg";
import thumb2 from "../assets/DesignDetailPage2.jpg";
import thumb3 from "../assets/DesignDetailPage3.jpg";

export default function DesignWorksSection() {
  const works = [
    {
      title: "상세페이지 작업 모음",
      description: "여성 골프웨어, 감자탕, 전기차 충전기, 자연산 송이 상세페이지 작업을 모아둔 섹션입니다.",
      image: thumb1,
      path: "/design/detail-1",
    },
    {
      title: "브랜드 상세페이지 작업",
      description: "상품군에 맞는 정보 구조와 시각 흐름을 설계한 작업입니다.",
      image: thumb2,
      path: "/design/detail-1",
    },
    {
      title: "프로모션 상세페이지 작업",
      description: "가독성과 전달력을 고려한 상세페이지 구성 작업입니다.",
      image: thumb3,
      path: "/design/detail-1",
    },
  ];

  return (
    <section className="design-works-section">
      <div className="design-works-container">
        <div className="design-works-header">
          <p className="design-works-label">Design</p>
          <h2>상세페이지 작업</h2>
          <p className="design-works-subtitle">
            다양한 카테고리의 상세페이지 작업물을 정리했습니다.
          </p>
        </div>

        <div className="design-works-grid">
          {works.map((work, index) => (
            <Link to={work.path} className="design-work-card" key={index}>
              <div className="design-work-image-wrap">
                <img src={work.image} alt={work.title} className="design-work-image" />
              </div>
              <div className="design-work-content">
                <h3>{work.title}</h3>
                <p>{work.description}</p>
                <span className="design-work-link">자세히 보기 →</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}