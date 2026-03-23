function FeatureSection() {
  const features = [
    {
      title: "회원 기능",
      desc: "회원가입, 로그인, 사용자 흐름 설계 및 인증 처리",
    },
    {
      title: "상품 기능",
      desc: "상품 목록, 상세 페이지, 상품 UI 구성",
    },
    {
      title: "장바구니 / 결제",
      desc: "구매 흐름과 결제 페이지 구성",
    },
    {
      title: "관리자 페이지",
      desc: "관리자 로그인과 상품 관리 기능 정리",
    },
    {
      title: "커뮤니티 확장",
      desc: "게시판 및 KBO 소식 영역 확장 가능성 반영",
    },
    {
      title: "실전 문제 해결",
      desc: "라우팅, 인증, DB 연결, 오류 수정 경험 반영",
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <h2>주요 구현 기능</h2>
        <div className="grid">
          {features.map((item) => (
            <article className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

export default FeatureSection;