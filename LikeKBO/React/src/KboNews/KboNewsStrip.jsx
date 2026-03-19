import React, { useEffect, useMemo, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./kboNews.css";

const STORAGE_KEY = "kboNews";

const seedNews = () => ([
  {
    id: String(Date.now() - 600000),
    title: "오늘의 라인업 업데이트",
    source: "KBO",
    url: "https://www.koreabaseball.com/",
    createdAt: "2026-03-05",
    badge: "HOT",
  },
  {
    id: String(Date.now() - 500000),
    title: "시범경기 일정 공개",
    source: "KBO",
    url: "https://www.koreabaseball.com/",
    createdAt: "2026-03-05",
    badge: "NEWS",
  },
  {
    id: String(Date.now() - 400000),
    title: "부상자 엔트리 변동 소식",
    source: "KBO",
    url: "https://www.koreabaseball.com/",
    createdAt: "2026-03-05",
    badge: "UPDATE",
  },
  {
    id: String(Date.now() - 300000),
    title: "구단별 이벤트/프로모션 모음",
    source: "KBO",
    url: "https://www.koreabaseball.com/",
    createdAt: "2026-03-05",
    badge: "EVENT",
  },
  {
    id: String(Date.now() - 200000),
    title: "주간 MVP 후보 발표",
    source: "KBO",
    url: "https://www.koreabaseball.com/",
    createdAt: "2026-03-05",
    badge: "MVP",
  },
  {
    id: String(Date.now() - 100000),
    title: "기록실 업데이트: 타격/투구 TOP",
    source: "KBO",
    url: "https://www.koreabaseball.com/",
    createdAt: "2026-03-05",
    badge: "STATS",
  },
]);

function readNews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) {
      const seeded = seedNews();
      localStorage.setItem(STORAGE_KEY, JSON.stringify(seeded));
      return seeded;
    }
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function KboNewsStrip() {
  const viewportRef = useRef(null);
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(readNews());
    const onStorage = (e) => {
      if (e.key === STORAGE_KEY) setItems(readNews());
    };
    window.addEventListener("storage", onStorage);
    return () => window.removeEventListener("storage", onStorage);
  }, []);

  // 화면에는 6개만 “보이게” (CSS에서 6등분), 슬라이드는 스크롤로 자연스럽게
  const cards = useMemo(() => items.slice(0, 30), [items]);

  const scrollByCards = (dir) => {
    const el = viewportRef.current;
    if (!el) return;
    const card = el.querySelector(".kbo-card");
    if (!card) return;
    const gap = 10;
    const w = card.getBoundingClientRect().width + gap;
    el.scrollBy({ left: dir * w * 6, behavior: "smooth" });
  };

  return (
    <section className="kbo-strip" aria-label="KBO 소식">
      <div className="kbo-strip-head">
        <h2 className="kbo-strip-title">KBO 소식</h2>
        <Link className="kbo-strip-all" to="/kbo-news">전체보기</Link>
      </div>

      <div className="kbo-strip-rail">
        <button
          type="button"
          className="kbo-nav"
          aria-label="이전"
          onClick={() => scrollByCards(-1)}
        >
          ‹
        </button>

        <div className="kbo-viewport" ref={viewportRef}>
          <ul className="kbo-list">
            {cards.map((n) => (
              <li className="kbo-card" key={n.id}>
                <Link to={`/kbo-news/${n.id}`} className="kbo-link">
                  <span className="kbo-badge">{n.badge || "NEWS"}</span>
                  <strong className="kbo-title">{n.title}</strong>
                  <span className="kbo-meta">{n.createdAt} · {n.source || "KBO"}</span>
                </Link>
              </li>
            ))}

            {/* + 카드: 전체 목록 이동 */}
            <li className="kbo-card kbo-add">
              <Link to="/kbo-news" className="kbo-link kbo-add-link" aria-label="전체 소식 보기">
                <span className="kbo-plus">＋</span>
                <span className="kbo-add-text">전체 소식</span>
              </Link>
            </li>
          </ul>
        </div>

        <button
          type="button"
          className="kbo-nav"
          aria-label="다음"
          onClick={() => scrollByCards(1)}
        >
          ›
        </button>
      </div>
    </section>
  );
}