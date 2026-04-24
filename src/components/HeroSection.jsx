function HeroSection() {
  return (
    <section className="hero">
      <div className="container">
        <p className="eyebrow">PORTFOLIO PROJECT</p>

        <h2>
          기획부터 구현, 문제 해결까지 직접 경험한
          <br /></h2>
          <h1>KBO⚾Like 전자상거래 프로젝트
        </h1>

        <p className="hero-desc">
          React, Spring Boot, MySQL을 활용해 사용자 기능과 관리자 기능을 구현하고,
          실제 서비스 흐름 안에서 발생한 오류를 직접 점검하고 수정하며 완성도를 높인 프로젝트입니다.
        </p>

        <button
          onClick={() => window.scrollTo({ top: window.innerHeight, behavior: "smooth" })}
          className="hero-btn"
        >
          프로젝트 보기 
        </button>
        

     <div className="hero-badges">
      <span>React</span>
      <span>Vite</span>
      <span>Spring Boot</span>
      <span>Spring Security</span>
      <span>MySQL</span>
      <span>JWT</span>
      <span>Linux</span>
      <span>GitHub</span>
      <span>Photoshop · Illustrator</span>
    </div>
      </div>
    </section>
  );
}

export default HeroSection;