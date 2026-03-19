function ProjectSummary() {
  return (
    <section className="section">
      <div className="container">
        <h2>프로젝트 개요</h2>
        <div className="card">
          <p>
            LikeKBO는 야구 컨셉을 기반으로 한 전자상거래 프로젝트입니다.
            단순한 상품 진열 페이지가 아니라 회원가입, 로그인, 상품 조회,
            장바구니, 결제, 관리자 기능까지 하나의 서비스 흐름으로 연결하는 것을 목표로 했습니다.
          </p>
          <p>
            특히 프론트엔드 화면 구성에 그치지 않고, Spring Boot 백엔드와 MySQL 구조를 함께 다루며
            실제 서비스처럼 동작하는 구조를 구현하고 문제를 해결하는 경험에 집중했습니다.
          </p>
        </div>
      </div>
    </section>
  );
}

export default ProjectSummary;