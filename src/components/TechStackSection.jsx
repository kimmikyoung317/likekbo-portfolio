function TechStackSection() {
  const stacks = [
    "React",
    "Vite",
    "JavaScript",
    "Spring Boot",
    "Java",
    "MySQL",
    "JWT",
    "REST API",
  ];

  return (
    <section className="section">
      <div className="container">
        <h2>기술 스택</h2>
        <div className="stack-wrap">
          {stacks.map((stack) => (
            <span className="stack-badge" key={stack}>
              {stack}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}

export default TechStackSection;