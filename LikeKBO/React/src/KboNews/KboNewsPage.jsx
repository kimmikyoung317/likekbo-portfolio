import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import "./kboNews.css";

const STORAGE_KEY = "kboNews";

function readNews() {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    const parsed = raw ? JSON.parse(raw) : [];
    return Array.isArray(parsed) ? parsed : [];
  } catch {
    return [];
  }
}

export default function KboNewsPage() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    setItems(readNews());
  }, []);

  return (
    <div className="kbo-page">
      <div className="kbo-page-head">
        <h1 className="kbo-page-title">KBO 소식</h1>
        <p className="kbo-page-sub">관리자에서 등록한 링크를 한 곳에서 모아봅니다.</p>
      </div>

      <ul className="kbo-page-list">
        {items
          .slice()
          .sort((a, b) => (String(b.createdAt || "")).localeCompare(String(a.createdAt || "")))
          .map((n) => (
            <li key={n.id} className="kbo-page-item">
              <Link to={`/kbo-news/${n.id}`} className="kbo-page-link">
                <div className="kbo-page-row">
                  <span className="kbo-badge">{n.badge || "NEWS"}</span>
                  <strong className="kbo-title">{n.title}</strong>
                </div>
                <span className="kbo-meta">{n.createdAt} · {n.source || "KBO"}</span>
              </Link>
            </li>
          ))}
      </ul>
    </div>
  );
}