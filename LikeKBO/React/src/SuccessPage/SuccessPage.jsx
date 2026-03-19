import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SuccessPage.css";

const SuccessPage = ({ setCart }) => { // ⚾️ setCart를 props로 받습니다.
  const navigate = useNavigate();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const paymentKey = params.get("paymentKey");
    const orderId = params.get("orderId");
    const amount = params.get("amount");

    if (!paymentKey || !orderId || !amount) return;

    // 1. 헤더에 토큰을 실어서 '익명 사용자' 문제를 해결합니다. [cite: 2026-01-20]
    const token = localStorage.getItem("accessToken");

    fetch("/api/payment/confirm", {
      method: "POST",
      headers: { 
        "Content-Type": "application/json",
        "Authorization": token ? `Bearer ${token}` : "" // ✅ 인증 헤더 추가
      },
      body: JSON.stringify({ paymentKey, orderId, amount }),
    })
    .then(res => {
      if (res.ok) return res.json();
      throw new Error("결제 승인 실패");
    })
    .then(data => {
      console.log("결제 승인 완료:", data);

      // ✅ 2. 장바구니 초기화 (성공 시에만 실행)
      localStorage.removeItem("kboCart");
      if (setCart) setCart([]); 

      alert("결제가 완료되었습니다! 장바구니를 비웠습니다. ⚾️");
      
      // 메인 페이지로 이동
      navigate("/");
    })
    .catch(err => {
      console.error("승인 실패:", err);
      alert("결제 승인 중 오류가 발생했습니다.");
      navigate("/cart");
    });

  }, [setCart, navigate]);

  return (
    <div className="success-container">
      <h2>⚾️ 결제 승인 처리 중...</h2>
      <p>잠시만 기다려 주세요.</p>
    </div>
  );
};

export default SuccessPage;