function TroubleShootingSection() {
  const issues = [
    {
      title: "관리자 로그인 오류",
      problem: "관리자 계정으로 로그인되지 않는 문제 발생",
      cause: "인증 로직과 DB 데이터 불일치 가능성",
      solution: "로그인 로직 및 테이블 구조 점검 후 수정 방향 설계",
    },
    {
      title: "회원가입 데이터 충돌",
      problem: "기존 데이터와 화면이 섞이는 문제",
      cause: "상태 관리 및 데이터 초기화 문제",
      solution: "상태 관리 로직 수정으로 정상 동작 처리",
    },
    {
      title: "404 라우팅 문제",
      problem: "페이지 이동 시 404 오류 발생",
      cause: "라우터 경로 설정 오류",
      solution: "React Router 경로 재정의 및 구조 수정",
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <h2>문제 해결 경험</h2>
        <div className="grid">
          {issues.map((item) => (
            <div className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p><strong>문제:</strong> {item.problem}</p>
              <p><strong>원인:</strong> {item.cause}</p>
              <p><strong>해결:</strong> {item.solution}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TroubleShootingSection;