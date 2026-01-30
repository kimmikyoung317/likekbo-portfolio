import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './LoginPage.css';

const LoginPage = () => {
    const [email, setEmail] = useState('');
    const [qrImage, setQrImage] = useState('');
    const [authCode, setAuthCode] = useState('');
    const [step, setStep] = useState(1); 
    const navigate = useNavigate();

    // [1단계] 로그인 시작 (백엔드 AuthController의 /login 타격! ⚾️)
    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            // 🚨 백엔드 컨트롤러 주소(/login)와 파라미터(email)를 정확히 맞춥니다! ㅋ
            const res = await axios.post('http://localhost:8080/api/auth/login', { email: email });
            
            // 업체 응답이 String으로 올 수 있어 파싱 처리 ⚾️
            const responseData = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;

            if (responseData.result) {
                setQrImage(responseData.data.qr); 
                setStep(2); // QR 화면으로 전환!
                
                // 2. 6자리 보안번호 요청 📱
                getSecurityNumber();
            }
        } catch (error) {
            console.error("로그인 시도 실패:", error);
            alert("사용자 정보를 확인할 수 없습니다. 이메일을 다시 확인해주세요! ㅋ");
        }
    };

    // [2단계] 보안번호 가져오기
    const getSecurityNumber = async () => {
        try {
            // 🚨 백엔드 컨트롤러 @PostMapping("/getSp") 주소와 일치!
            const res = await axios.post('http://localhost:8080/api/auth/getSp', { email: email });
            const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;
            
            if (data.result) {
                setAuthCode(data.data.servicePassword); 
                startPolling(); // 승인 감시 시작! ㅋ
            }
        } catch (err) {
            console.error("보안번호 로드 실패", err);
        }
    };

    // [3단계] 실시간 승인 확인 (폴링) ⚾️
    const startPolling = () => {
        const checkInterval = setInterval(async () => {
            try {
                // 🚨 백엔드 컨트롤러 @PostMapping("/checkResult") 주소와 일치!
                const res = await axios.post('http://localhost:8080/api/auth/checkResult', { email: email });
                const data = typeof res.data === 'string' ? JSON.parse(res.data) : res.data;

                if (data.result && data.data.auth === "S") {
                    clearInterval(checkInterval); 
                    alert("⚾️ KBOLike! 인증 성공! 환영합니다. ㅋ");
                    navigate('/'); // 메인으로 입장! [cite: 2026-01-20]
                }
            } catch (err) {
                console.error("승인 대기 중...", err);
            }
        }, 2000); 

        // 컴포넌트 언마운트 시 폴링 종료 (메모리 누수 방지 ㅋ)
        return () => clearInterval(checkInterval);
    };

    return (
        <div className="login-container">
            <div className="login-box">
                <h2 className="auth-title">{step === 1 ? "PREMIUM LOGIN" : "SECURITY AUTH"}</h2>
                
                {step === 1 ? (
                    <form onSubmit={handleLogin} className="auth-form">
                        <div className="input-group">
                            <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="이메일 주소를 입력하세요" required />
                        </div>
                        <button type="submit" className="view-detail-btn">passwordless ⚾️</button>
                    </form>
                ) : (
                    <div className="auth-step">
                        <p className="auth-desc">휴대폰에서 <strong>패스워드리스 앱</strong>을 실행하여<br/>아래 QR코드를 찍거나 보안번호를 확인하세요! ⚾️</p>
                        
                        <div className="qr-wrapper">
                            {qrImage && <img src={qrImage} alt="QR Code" className="qr-img" />}
                        </div>
                        
                        <div className="code-display">
                            <span className="code-label">보안번호 (6자리)</span>
                            <h1 className="code-number">{authCode}</h1>
                        </div>
                        
                        <div className="loading-dots">승인 대기 중입니다...</div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LoginPage;