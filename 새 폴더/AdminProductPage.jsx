import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './AdminProductPage.css';

const AdminProductPage = () => {
    // 1. 상태 관리: 새로고침 시에도 금고(localStorage)를 확인 ⚾️
    const [isLoggedIn, setIsLoggedIn] = useState(() => {
        return localStorage.getItem('isLoggedIn') === 'true';
    });

    const [loginData, setLoginData] = useState({ loginId: '', password: '' });
    const [products, setProducts] = useState([]);
    const [file, setFile] = useState(null);
    const [preview, setPreview] = useState(null);
    const [isEditing, setIsEditing] = useState(false);
    const [editId, setEditId] = useState(null);
    const [newProduct, setNewProduct] = useState({ 
        name: '', price: 0, stockQuantity: 0, teamName: '', description: ''
    });

    // 2. 로그인 핸들러 (인증 증표 저장)
    const handleLogin = async (e) => {
        if (e) e.preventDefault();
        try {
            const response = await axios.post('http://localhost:8080/api/admin/login', {
                loginId: loginData.loginId,
                password: loginData.password
            });

            localStorage.setItem('isLoggedIn', 'true');
            localStorage.setItem('adminToken', response.data.token); 

            alert(response.data.message);
            setIsLoggedIn(true);
        } catch (error) {
            alert("로그인 실패: 아이디와 비밀번호를 확인하세요! ⚾️");
        }
    };

    // 3. 로그아웃 핸들러 ㅋ
    const handleLogout = () => {
        if (!window.confirm("로그아웃 하시겠습니까?")) return;
        localStorage.removeItem('isLoggedIn');
        localStorage.removeItem('adminToken');
        setIsLoggedIn(false);
        alert("안전하게 로그아웃 되었습니다.");
    };

    // 4. 상품 목록 로드
    const fetchProducts = async () => {
        try {
            const res = await axios.get('http://localhost:8080/api/product/list');
            setProducts(res.data);
        } catch (err) { console.error("로드 실패", err); }
    };

    useEffect(() => {
        if (isLoggedIn) fetchProducts();
    }, [isLoggedIn]);

    // 5. 상품 등록 & 수정 (헤더에 토큰 장착! 🚀)
    const handleSubmit = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        if (file) formData.append('file', file);
        
        const productData = {
            ...newProduct,
            price: Number(newProduct.price),
            stockQuantity: Number(newProduct.stockQuantity)
        };
        formData.append('data', new Blob([JSON.stringify(productData)], { type: 'application/json' }));

        try {
            const token = localStorage.getItem('adminToken');
            const config = {
                headers: {
                    'Authorization': `Bearer ${token}`,
                    'Content-Type': 'multipart/form-data'
                }
            };

            if (isEditing) {
                await axios.put(`http://localhost:8080/api/admin/product/${editId}`, formData, config);
                alert("수정 완료! ㅋ");
            } else {
                if (!file) return alert("📸 이미지를 선택해주세요!");
                await axios.post('http://localhost:8080/api/admin/product/upload', formData, config);
                alert("등록 성공! ⚾️");
            }
            resetForm();
            fetchProducts();
        } catch (err) { alert("요청 실패! 권한이 없거나 서버 에러입니다."); }
    };

    // 6. 기타 보조 함수 (수정, 초기화, 삭제)
    const startEdit = (p) => {
        setIsEditing(true);
        setEditId(p.id);
        setNewProduct({
            name: p.name, price: p.price, stockQuantity: p.stockQuantity,
            teamName: p.teamName, description: p.description
        });
        setPreview(`http://localhost:8080${p.imageUrl}`);
        window.scrollTo(0, 0);
    };

    const resetForm = () => {
        setNewProduct({ name: '', price: 0, stockQuantity: 0, teamName: '', description: '' });
        setFile(null); setPreview(null); setIsEditing(false); setEditId(null);
    };

    const handleDelete = async (id) => {
        if (!window.confirm("정말 삭제할까요?")) return;
        try {
            const token = localStorage.getItem('adminToken');
            await axios.delete(`http://localhost:8080/api/admin/product/${id}`, {
                headers: { 'Authorization': `Bearer ${token}` }
            });
            fetchProducts();
        } catch (err) { alert("삭제 실패"); }
    };

    // 7. UI 렌더링
    if (!isLoggedIn) {
        return (
            <div className="admin-login-container">
                <h2>🔐 관리자 로그인</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" value={loginData.loginId} onChange={e => setLoginData({...loginData, loginId: e.target.value})} />
                    <input type="password" placeholder="Password" value={loginData.password} onChange={e => setLoginData({...loginData, password: e.target.value})} />
                    <button type="submit">로그인 ⚾️</button>
                </form>
            </div>
        );
    }

    return (
        <div className="admin-page-container">
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h1 className="admin-title">🚀 상품 통합 관리 센터</h1>
                <button onClick={handleLogout} className="logout-btn" style={{ padding: '8px 16px', backgroundColor: '#ff4d4f', color: 'white', border: 'none', borderRadius: '4px', cursor: 'pointer' }}>로그아웃</button>
            </div>

            <div className="admin-upload-section">
                <h3>{isEditing ? "📝 상품 정보 수정" : "➕ 새 상품 등록"}</h3>
                <div className="preview-frame" style={{width: '200px', height: '141px', border: '1px dashed #ccc', margin: '10px auto', overflow: 'hidden'}}>
                    {preview ? <img src={preview} alt="preview" style={{width: '100%', height: '100%', objectFit: 'cover'}} /> : "800x566"}
                </div>
                <div className="admin-input-group">
                    <input type="text" placeholder="상품명" value={newProduct.name} onChange={e => setNewProduct({...newProduct, name: e.target.value})} />
                    <input type="number" placeholder="가격" value={newProduct.price} onChange={e => setNewProduct({...newProduct, price: e.target.value})} />
                    <input type="text" placeholder="구단명 (예: KI, SS)" value={newProduct.teamName} onChange={e => setNewProduct({...newProduct, teamName: e.target.value})} />
                </div>
                <div className="file-input-wrapper">
                    <input id="file-upload" type="file" style={{ display: 'none' }} 
                        onChange={e => {
                            if (e.target.files[0]) {
                                setFile(e.target.files[0]);
                                setPreview(URL.createObjectURL(e.target.files[0]));
                            }
                        }} />
                    <label htmlFor="file-upload" className="custom-file-label">
                        {file ? `📂 ${file.name}` : "📸 이미지 선택"}
                    </label>
                </div>
                <button className="admin-submit-btn" onClick={handleSubmit}>
                    {isEditing ? "정보 수정하기 ⚾️" : "상품 등록하기 ⚾️"}
                </button>
                {isEditing && <button onClick={resetForm} className="cancel-btn">취소</button>}
            </div>

            <div className="admin-table-wrapper">
                <table className="admin-table">
                    <thead>
                        <tr><th>ID</th><th>이미지</th><th>상품명</th><th>가격</th><th>관리</th></tr>
                    </thead>
                    <tbody>
                        {products.map(p => (
                            <tr key={p.id}>
                                <td>{p.id}</td>
                                <td><img src={`http://localhost:8080${p.imageUrl}`} alt="img" className="admin-prod-img" style={{width: '50px'}} /></td>
                                <td>{p.name}</td>
                                <td>₩{p.price?.toLocaleString()}</td>
                                <td>
                                    <button onClick={() => startEdit(p)}>수정</button>
                                    <button className="delete-btn" onClick={() => handleDelete(p.id)}>삭제</button>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default AdminProductPage;