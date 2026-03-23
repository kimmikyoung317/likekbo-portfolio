function SummaryHighlight() {
  const items = [
    { title: "Frontend", desc: "React 기반 UI 및 상태 관리" },
    { title: "Backend", desc: "Spring Boot API 연동" },
    { title: "Database", desc: "MySQL 구조 이해 및 데이터 처리" },
    { title: "Auth", desc: "JWT 기반 인증 흐름 구현" },
  ];

  return (
    <section className="highlight">
      <div className="container highlight-grid">
        {items.map((item) => (
          <div className="highlight-card" key={item.title}>
            <h3>{item.title}</h3>
            <p>{item.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}

export default SummaryHighlight;