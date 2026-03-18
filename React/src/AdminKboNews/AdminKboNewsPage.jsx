import React, { useEffect, useMemo, useState } from "react";
import "./adminKboNews.css";

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

function writeNews(list) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(list));
}

const isValidUrl = (v) => {
  try {
    const u = new URL(v);
    return u.protocol === "http:" || u.protocol === "https:";
  } catch {
    return false;
  }
};

export default function AdminKboNewsPage() {
  const [items, setItems] = useState([]);
  const [title, setTitle] = useState("");
  const [url, setUrl] = useState("");
  const [badge, setBadge] = useState("NEWS");
  const [source, setSource] = useState("KBO");

  useEffect(() => {
    setItems(readNews());
  }, []);

  const sorted = useMemo(() => {
    return items.slice().sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
  }, [items]);

  const addItem = (e) => {
    e.preventDefault();

    if (!title.trim()) return alert("제목을 입력하세요.");
    if (!isValidUrl(url.trim())) return alert("올바른 링크(URL)를 입력하세요. (https://...)");

    const today = new Date();
    const yyyy = today.getFullYear();
    const mm = String(today.getMonth() + 1).padStart(2, "0");
    const dd = String(today.getDate()).padStart(2, "0");

    const newItem = {
      id: String(Date.now()),
      title: title.trim(),
      url: url.trim(),
      badge: badge.trim() || "NEWS",
      source: source.trim() || "KBO",
      createdAt: `${yyyy}-${mm}-${dd}`,
    };

    const next = [newItem, ...items];
    setItems(next);
    writeNews(next);

    setTitle("");
    setUrl("");
    setBadge("NEWS");
    setSource("KBO");
    alert("등록 완료! 홈/목록에서 바로 보여요 ⚾️");
  };

  const removeItem = (id) => {
    const next = items.filter((x) => String(x.id) !== String(id));
    setItems(next);
    writeNews(next);
  };

  return (
    <div className="admin-news-wrap">
      <h1 className="admin-news-title">관리자 · KBO 소식 링크</h1>

      <form className="admin-news-form" onSubmit={addItem}>
        <input
          className="admin-news-input"
          placeholder="제목"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <input
          className="admin-news-input"
          placeholder="원문 링크 (https://...)"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
        />

        <div className="admin-news-row">
          <input
            className="admin-news-input"
            placeholder="배지 (예: HOT/NEWS/UPDATE)"
            value={badge}
            onChange={(e) => setBadge(e.target.value)}
          />
          <input
            className="admin-news-input"
            placeholder="출처 (예: KBO/구단명)"
            value={source}
            onChange={(e) => setSource(e.target.value)}
          />
          <button className="admin-news-btn" type="submit">등록</button>
        </div>
      </form>

      <div className="admin-news-list">
        {sorted.map((n) => (
          <div key={n.id} className="admin-news-item">
            <div className="admin-news-left">
              <span className="admin-badge">{n.badge || "NEWS"}</span>
              <div className="admin-news-texts">
                <div className="admin-news-tt">{n.title}</div>
                <div className="admin-news-meta">{n.createdAt} · {n.source} · {n.url}</div>
              </div>
            </div>
            <button className="admin-news-del" onClick={() => removeItem(n.id)}>
              삭제
            </button>
          </div>
        ))}
      </div>

      <p className="admin-news-note">
        ※ DB 없이 localStorage에 저장됩니다. (브라우저/기기 바뀌면 유지 안 됨)
      </p>
    </div>
  );
}