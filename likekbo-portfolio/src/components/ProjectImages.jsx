import { useState } from "react";
import login from "../assets/login.png";
import admin from "../assets/admin.png";
import payment from "../assets/payment.png";
import product from "../assets/product.png";

function ProjectImages() {
  const [selectedImage, setSelectedImage] = useState(null);

  const images = [
    {
      src: login,
      title: "로그인 화면",
      desc: "사용자 로그인 및 인증 흐름",
    },
    {
      src: product,
      title: "상품 목록",
      desc: "상품 리스트 및 카드형 UI 구성",
    },
    {
      src: payment,
      title: "결제 페이지",
      desc: "구매 흐름과 결제 단계 화면",
    },
    {
      src: admin,
      title: "관리자 페이지",
      desc: "관리자 전용 상품 관리 화면",
    },
  ];

  const openModal = (image) => {
    setSelectedImage(image);
  };

  const closeModal = () => {
    setSelectedImage(null);
  };

  return (
    <section className="section">
      <div className="container">
        <h2>서비스 화면</h2>
        <p className="section-intro">
          실제 구현한 주요 화면입니다. 이미지를 클릭하면 크게 볼 수 있습니다.
        </p>

        <div className="grid">
          {images.map((img) => (
            <div
              className="card image-card clickable-card"
              key={img.title}
              onClick={() => openModal(img)}
            >
              <img src={img.src} alt={img.title} className="service-thumb" />
              <h3>{img.title}</h3>
              <p>{img.desc}</p>
            </div>
          ))}
        </div>

        {selectedImage && (
          <div className="image-modal" onClick={closeModal}>
            <div
              className="image-modal-content"
              onClick={(e) => e.stopPropagation()}
            >
              <button className="image-modal-close" onClick={closeModal}>
                ×
              </button>

              <img
                src={selectedImage.src}
                alt={selectedImage.title}
                className="image-modal-img"
              />

              <div className="image-modal-text">
                <h3>{selectedImage.title}</h3>
                <p>{selectedImage.desc}</p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}

export default ProjectImages;