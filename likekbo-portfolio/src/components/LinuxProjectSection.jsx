function LinuxProjectSection() {
  const skills = [
    "nmap / OpenVAS를 활용한 취약점 진단",
    "iptables 및 UFW 기반 방화벽 정책 점검",
    "MySQL 외부 접근 차단 및 바인딩 제한",
    "SSH Key 기반 인증 및 Fail2Ban 적용",
    "bash + cron 기반 로그 분석 자동화",
  ];

  const points = [
    {
      title: "프로젝트 개요",
      desc: "Ubuntu 20.04 LTS 환경에서 Apache2, MySQL, FTP 서버를 구성하고, 네트워크 및 시스템 보안 취약점을 분석한 뒤 대응 정책을 적용한 프로젝트입니다.",
    },
    {
      title: "수행 내용",
      desc: "nmap, OpenVAS, logwatch 등을 활용해 취약점을 식별하고, SSH 인증 강화, MySQL 외부 접근 차단, FTP 익명 로그인 점검, Apache 보안 설정 조정 등 실제 보안 강화 작업을 수행했습니다.",
    },
    {
      title: "핵심 성과",
      desc: "단순 진단에 그치지 않고 로그 분석 자동화, 방화벽 정책 정비, 계정 및 인증 강화까지 연결하며 서버 운영과 보안 관리 관점의 문제 해결 경험을 쌓았습니다.",
    },
  ];

  return (
    <section className="section">
      <div className="container">
        <h2>리눅스 기반 보안 네트워크 구축 프로젝트</h2>
        <p className="section-intro">
          서버 취약점 분석부터 보안 정책 적용, 로그 분석 자동화까지 직접 수행한
          인프라·보안 프로젝트입니다.
        </p>

        <div className="linux-project-layout">
          <div className="card linux-project-main">
            <h3>프로젝트 요약</h3>
            <p>
              Ubuntu 20.04 LTS 기반 환경에서 서버 및 네트워크 보안 상태를 점검하고,
              로그 기반 분석과 취약점 진단 도구를 활용해 고위험 항목을 식별한 뒤
              보안 정책을 개선했습니다.
            </p>
            <p>
              특히 FTP 익명 로그인, Apache 버전 노출, MySQL 원격 접근, SSH 약한 인증
              문제와 같은 보안 이슈를 점검하고, 방화벽 및 인증 정책 강화를 통해
              대응 방향을 정리했습니다.
            </p>
          </div>

          <div className="card linux-project-skill">
            <h3>핵심 수행 항목</h3>
            <ul className="trouble-list">
              {skills.map((skill) => (
                <li key={skill}>{skill}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="grid" style={{ marginTop: "22px" }}>
          {points.map((item) => (
            <div className="card" key={item.title}>
              <h3>{item.title}</h3>
              <p>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default LinuxProjectSection;