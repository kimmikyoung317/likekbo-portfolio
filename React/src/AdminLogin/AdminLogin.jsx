import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./AdminLogin.css";

function AdminLogin() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://localhost:8080/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      console.log("status:", res.status);
      console.log("data:", data);

      if (data.result) {
        //  토큰/권한 저장
        localStorage.setItem("accessToken", data.accessToken);
        localStorage.setItem("userRole", data.role); // "ADMIN"

        navigate("/admin");
      } else {
        alert(data.message || "로그인 실패");
      }
    } catch (err) {
      console.error("admin login error:", err);
      alert("서버 연결 또는 요청 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-box">
        <h2>ADMIN LOGIN</h2>

        <form className="admin-login-form" onSubmit={handleLogin}>
          <input
            type="text"
            placeholder="아이디"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />

          <input
            type="password"
            placeholder="비밀번호"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button type="submit">로그인</button>
        </form>
      </div>
    </div>
  );
}

export default AdminLogin;