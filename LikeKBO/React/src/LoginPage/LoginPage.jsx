import React, { useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "./LoginPage.css";

const BACKEND_URL = "http://localhost:8080";

const onlyDigits = (v) => String(v ?? "").replace(/[^0-9]/g, "");
const isValidKoreanPhone = (p) => /^010\d{8}$/.test(p);

const LoginPage = ({ onLoginSuccess }) => {
  const navigate = useNavigate();

  const [step, setStep] = useState(1);
  const [phoneNumber, setPhoneNumber] = useState("");
  const cleanPhone = useMemo(() => onlyDigits(phoneNumber), [phoneNumber]);

  const [code, setCode] = useState("");
  const cleanCode = useMemo(() => onlyDigits(code), [code]);

  const [loading, setLoading] = useState(false);
  const [devCode, setDevCode] = useState("");

  const requestOtp = async (e) => {
    e.preventDefault();

    if (!cleanPhone || !isValidKoreanPhone(cleanPhone)) {
      alert("휴대폰 번호는 010으로 시작하는 11자리 숫자만 가능합니다. (예: 01012345678)");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${BACKEND_URL}/api/auth/phone/request`,
        { phoneNumber: cleanPhone },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = res.data;

      const codeFromServer = data?.devCode || data?.code || data?.authCode || "";
      setDevCode(codeFromServer);

      alert(data?.message || "인증번호가 발송되었습니다!");
      setStep(2);
    } catch (error) {
      console.error("인증번호 요청 에러:", error?.response?.status, error?.response?.data);

      const msg =
        error?.response?.data?.message ||
        (typeof error?.response?.data === "string" ? error.response.data : null) ||
        `인증번호 요청 실패 (status: ${error?.response?.status ?? "unknown"})`;

      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const verifyOtp = async (e) => {
    e.preventDefault();

    if (!cleanPhone || !isValidKoreanPhone(cleanPhone)) {
      alert("휴대폰 번호가 올바르지 않습니다.");
      return;
    }

    if (!cleanCode || cleanCode.length < 4) {
      alert("인증번호를 입력해주세요.");
      return;
    }

    try {
      setLoading(true);

      const res = await axios.post(
        `${BACKEND_URL}/api/auth/phone/verify`,
        { phoneNumber: cleanPhone, code: cleanCode },
        { headers: { "Content-Type": "application/json" } }
      );

      const data = res.data;

      const accessToken = data?.accessToken || data?.token;
      const name = data?.name || data?.userName || data?.username;
      const role = data?.role || data?.userRole || "USER";

      if (!accessToken) {
        console.error("verify 응답에 토큰이 없습니다:", data);
        alert("로그인에 실패했습니다. (토큰 없음)");
        return;
      }

      if (!name) {
        console.error("verify 응답에 name이 없습니다:", data);
        alert("로그인에 실패했습니다. (이름 없음)");
        return;
      }

      localStorage.setItem("accessToken", accessToken);
      localStorage.setItem("userName", name);
      localStorage.setItem("userRole", role);

      onLoginSuccess?.();

      alert(`반갑습니다, ${name}님!`);
      navigate("/");
    } catch (error) {
      console.error("인증번호 검증 에러:", error?.response?.status, error?.response?.data);

      const msg =
        error?.response?.data?.message ||
        (typeof error?.response?.data === "string" ? error.response.data : null) ||
        `로그인 실패 (status: ${error?.response?.status ?? "unknown"})`;

      alert(msg);
    } finally {
      setLoading(false);
    }
  };

  const goBackToStep1 = () => {
    setStep(1);
    setCode("");
    setDevCode("");
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2>LOGIN⚾️KBOLike</h2>

        {step === 1 && (
          <form className="login-form" onSubmit={requestOtp}>
            <div className="input-wrapper">
              <input
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="휴대폰 번호 (예: 01012345678)"
                autoComplete="tel"
                inputMode="numeric"
              />
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "전송 중..." : "인증번호 받기"}
            </button>

            <div className="signup-prompt">
              <p>처음이신가요?</p>
              <Link className="go-signup-link" to="/signup">
                회원가입
              </Link>
            </div>
          </form>
        )}

        {step === 2 && (
          <form className="login-form" onSubmit={verifyOtp}>
            <div className="input-wrapper">
              <input value={cleanPhone} disabled placeholder="휴대폰 번호" />
            </div>

            <div className="input-wrapper">
              <input
                value={code}
                onChange={(e) => setCode(e.target.value)}
                placeholder="인증번호 입력"
                inputMode="numeric"
              />

              {devCode ? (
                <p className="be_member">
                  (개발용) 인증코드: <b>{devCode}</b>
                </p>
              ) : (
                <p className="be_member">인증번호가 안 오면 번호를 다시 확인해주세요.</p>
              )}
            </div>

            <button type="submit" disabled={loading}>
              {loading ? "확인 중..." : "로그인"}
            </button>

            <div className="login-footer">
              <a
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  goBackToStep1();
                }}
              >
                번호 다시 입력
              </a>
              <span> | </span>
              <a
                href="#!"
                onClick={(e) => {
                  e.preventDefault();
                  requestOtp(e);
                }}
              >
                인증번호 재전송
              </a>
            </div>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginPage;