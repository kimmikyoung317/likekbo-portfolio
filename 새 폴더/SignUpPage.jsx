import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './App.css'; 

const SignUpPage = () => {
    
    // 1. 상태값에서 번호는 미련 없이 삭제! ㅋ
    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
    });
    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        // 🚨 중요: 5173(리액트)이 아니라 8080(스프링부트) 주소여야 합니다! ⚾️
        const BACKEND_URL = 'http://localhost:8080/api/auth/signup'; 

        try {
            console.log("⚾️ 전송 데이터:", formData);
            const response = await axios.post(BACKEND_URL, formData);
            
            if (response.status === 200 || response.status === 201) {
                alert("⚾️ 가입 성공! 이제 패스워드 없는 로그인을 체험해보세요. ㅋ");
                navigate('/login');
            }
        } catch (error) {
            console.error("회원가입 실패:", error.response?.data);
            // 번호 관련 멘트도 삭제! ㅋ
            alert("가입 중 오류 발생! 이미 등록된 이메일인지 확인해주세요.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title">⚾️ JOIN KBOLike</h2>
                <form onSubmit={handleSubmit} className="auth-form">
                    <div className="input-group">
                        
                        <input type="text" name="username" placeholder="아이디를 입력하세요" onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        
                        <input type="text" name="name" placeholder="실명을 입력하세요" onChange={handleChange} required />
                    </div>
                    <div className="input-group">
                        
                        <input type="email" name="email" placeholder="email@example.com" onChange={handleChange} required />
                    </div>
                    
                    {/* 번호 입력란은 과감하게 주석도 지워버렸습니다! ㅋ */}
                    
                    <button type="submit" className="view-detail-btn" style={{marginTop: '20px'}}>
                        가입 완료 ⚾️
                    </button>
                </form>
            </div>
        </div>
    );
};

export default SignUpPage;