import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './SignUpPage.css';

const SignUpPage = () => {

    const [formData, setFormData] = useState({
        username: '',
        name: '',
        email: '',
        phoneNumber: ''   // 🔴 전화번호 상태 추가
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const BACKEND_URL = 'http://localhost:8080/api/member/signup';

        try {
            console.log("⚾️ 전송 데이터:", formData);

            const response = await axios.post(BACKEND_URL, formData);

            if (response.status === 200 || response.status === 201) {
                alert("⚾️ 가입 성공!");
                navigate('/login');
            }

        } catch (error) {
            console.error("회원가입 실패:", error.response?.data);
            alert("가입 실패! 이메일 또는 전화번호가 이미 존재할 수 있습니다.");
        }
    };

    return (
        <div className="auth-container">
            <div className="auth-box">
                <h2 className="auth-title"> JOIN ⚾️KBOLike</h2>

                <form onSubmit={handleSubmit} className="auth-form">

                    <div className="input-group">
                        <input
                            type="text"
                            name="username"
                            placeholder="아이디를 입력하세요"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="text"
                            name="name"
                            placeholder="실명을 입력하세요"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    <div className="input-group">
                        <input
                            type="email"
                            name="email"
                            placeholder="email@example.com"
                            onChange={handleChange}
                            required
                        />
                    </div>

                    {/* 🔴 여기 새로 추가된 전화번호 입력칸 */}
                    <div className="input-group">
                        <input
                            type="tel"
                            name="phoneNumber"
                            placeholder="전화번호 (01012345678)"
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <button
                        type="submit"
                        className="view-detail-btn"
                        style={{ marginTop: '20px' }}
                    >
                        가입 완료 ⚾️
                    </button>

                </form>
            </div>
        </div>
    );
};

export default SignUpPage;