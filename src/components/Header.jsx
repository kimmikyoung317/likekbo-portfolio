import "./Header.css";

export default function Header() {
  return (
    <header className="portfolio-header">
      <nav className="portfolio-nav">
        <a href="#dev">개발</a>
        <a href="#server">서버</a>
        <a href="#design">디자인</a>
      </nav>
    </header>
  );
}