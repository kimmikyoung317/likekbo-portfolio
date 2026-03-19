function MyRoleSection() {
  const roles = [
    "서비스 전체 기획 및 구조 설계",
    "React 기반 프론트엔드 개발",
    "Spring Boot 백엔드 연동",
    "MySQL DB 구조 이해 및 데이터 점검",
    "관리자 기능 구현",
    "로그인 및 인증 흐름 설계",
    "실제 서비스 흐름 기반 기능 구현",
  ];

  return (
    <section className="section">
      <div className="container">
        <h2>내 역할</h2>
        <div className="card">
          <ul className="trouble-list">
            {roles.map((role) => (
              <li key={role}>{role}</li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}

export default MyRoleSection;