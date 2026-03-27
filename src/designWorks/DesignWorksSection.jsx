import "./DesignWorksSection.css";

import { Link } from "react-router-dom";

import img1 from "../assets/DesignDetailPage1.jpg";
import img2 from "../assets/DesignDetailPage2.jpg";
import img3 from "../assets/DesignDetailPage3.jpg";
import img4 from "../assets/DesignDetailPage4.jpg";

export default function DesignWorksSection() {
  const works = [
    {
      id: 1,
      image: img1,
      title: "여성 골프웨어 상세페이지",
    },
    {
      id: 2,
      image: img2,
      title: "감자탕 상세페이지",
    },
    {
      id: 3,
      image: img3,
      title: "전기차 충전기 홍보 상세페이지",
    },
    {
      id: 4,
      image: img4,
      title: "자연산 송이 상세페이지",
    },
  ];

  return (
    <section className="design-works-section">
      <div className="design-works-header">
        <p className="design-works-label">Design Archive</p>
        <h2>상세페이지 작업</h2>
        <p className="design-works-subtitle">
          썸네일을 클릭하면 새 탭에서 원본 이미지를 크게 볼 수 있습니다.
        </p>
      </div>

            <div className="design-thumbnail-grid">
            {works.map((work) => (
                <Link
                key={work.id}
                to={`/design/view/${work.id}`}
                target="_blank"
                className="design-thumbnail-card"
                >
                <div className="design-thumbnail-image-wrap">
                    <img
                    src={work.image}
                    alt={work.title}
                    className="design-thumbnail-image"
                    />
                </div>

                <div className="design-thumbnail-content">
                    <h3>{work.title}</h3>
                    <span>새 창으로 보기 ↗</span>
                </div>
                </Link>
            ))}
            </div>
    </section>
  );
}