import React, { useEffect, useMemo, useState } from "react";
import { Link, useParams } from "react-router-dom";
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

export default function KboNewsDetail() {
  const { id } = useParams();
  const [items, setItems] = useState([]);

  useEffect(() => setItems(readNews()), []);

  const item = useMemo(() => items.find((x) => String(x.id) === String(id)), [items, id]);

  if (!item) {
    return (
      <div className="kbo-page">
        <h1 className="kbo-page-title">소식을 찾을 수 없어요 🥲</h1>
        <Link to="/kbo-news" className="kbo-back">← 목록으로</Link>
      </div>
    );
  }

  return (
    <div className="kbo-page">
      <Link to="/kbo-news" className="kbo-back">← 목록으로</Link>

      <div className="kbo-detail">
        <div className="kbo-detail-top">
          <span className="kbo-badge">{item.badge || "NEWS"}</span>
          <h1 className="kbo-detail-title">{item.title}</h1>
          <div className="kbo-meta">{item.createdAt} · {item.source || "KBO"}</div>
        </div>

        <a className="kbo-open" href={item.url} target="_blank" rel="noreferrer">
          원문 링크 열기 →
        </a>
      </div>
    </div>
  );
}