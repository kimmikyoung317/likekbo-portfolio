import React, { useState, useRef, useEffect } from 'react';
import axios from 'axios';
import './AdminProductPage.css';

const BACKEND_URL = 'http://localhost:8080';

const getAuth = () => {
  const token = sessionStorage.getItem('accessToken') || localStorage.getItem('accessToken');
  const role = sessionStorage.getItem('userRole') || localStorage.getItem('userRole');
  return { token, role };
};

const AdminProductPage = ({ products = [], setProducts }) => {
  const [newProduct, setNewProduct] = useState({
    name: '',
    description: '',
    price: 0,
    stockQuantity: 0,
    team: 'KIA',
    categoryName: '기타',
  });

  const [imageFile, setImageFile] = useState(null);
  const [imagePreview, setImagePreview] = useState('');
  const fileInputRef = useRef(null);

  // ✅ 관리자 권한 체크
  useEffect(() => {
    const { token, role } = getAuth();
    if (!token || role !== 'ADMIN') {
      alert('관리자 권한이 필요합니다. 메인 페이지로 이동합니다. ⚾️');
      window.location.href = '/';
    }
  }, []);

  // ✅ 관리자 로그아웃 (필요한 것만 삭제)
  const handleAdminLogout = () => {
    if (!window.confirm('관리자 모드를 종료하시겠습니까?')) return;

    sessionStorage.removeItem('accessToken');
    sessionStorage.removeItem('userRole');
    sessionStorage.removeItem('userName');

    // 혹시 관리자 토큰을 localStorage에 저장한 적이 있다면 같이 제거
    localStorage.removeItem('accessToken');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');

    alert('안전하게 로그아웃 되었습니다.');
    window.location.href = '/';
  };

  // ✅ 입력 변경
  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === 'price' || name === 'stockQuantity') {
      const num = Number(value);
      setNewProduct((prev) => ({ ...prev, [name]: Number.isFinite(num) && num > 0 ? num : 0 }));
      return;
    }

    setNewProduct((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ 이미지 선택 + 미리보기
  const handleFileChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return; // 선택 취소

    setImageFile(file);

    const reader = new FileReader();
    reader.onloadend = () => setImagePreview(String(reader.result || ''));
    reader.readAsDataURL(file);
  };

  // ✅ 상품 등록
  const handleSubmit = async (e) => {
    e.preventDefault();

    const { token } = getAuth();
    if (!token) {
      alert('관리자 인증이 필요합니다. 다시 로그인해 주세요.');
      window.location.href = '/login';
      return;
    }

    if (!imageFile) {
      alert('상품 이미지를 업로드해 주세요!');
      return;
    }

    // FormData 구성
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append(
      'product',
      new Blob([JSON.stringify(newProduct)], { type: 'application/json' })
    );

    try {
      const res = await axios.post(`${BACKEND_URL}/api/admin/upload`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
          Authorization: `Bearer ${token}`,
        },
      });

      if (res.status === 200 || res.status === 201) {
        alert('상품이 성공적으로 시스템에 등록되었습니다!');

        // ✅ 목록 즉시 갱신 (안정적인 방식)
        if (setProducts) setProducts((prev) => [...prev, res.data]);

        // ✅ 폼 초기화
        setNewProduct({
          name: '',
          description: '',
          price: 0,
          stockQuantity: 0,
          team: 'KIA',
          categoryName: '기타',
        });
        setImageFile(null);
        setImagePreview('');
        if (fileInputRef.current) fileInputRef.current.value = '';
      }
    } catch (error) {
      console.error('등록 에러:', error);

      if (error.response?.status === 401 || error.response?.status === 403) {
        alert('권한이 만료되었거나 부족합니다. 다시 로그인해 주세요.');
      } else {
        alert('등록 중 오류가 발생했습니다. 서버 로그를 확인하세요.');
      }
    }
  };

  return (
    <div className="admin-container">
      <div className="admin-top-bar">
        <span className="admin-badge">ADMIN CONTROL CENTER</span>
        <button onClick={handleAdminLogout} className="admin-logout-btn">
          SYSTEM EXIT
        </button>
      </div>

      <div className="admin-header">
        <h1>KBOLike⚾INVENTORY</h1>
        <p>프리미엄 굿즈 관리 시스템 (Rule: KIA First)</p>
      </div>

      <form className="admin-form" onSubmit={handleSubmit}>
        <div className="input-row">
          <div className="input-group">
            <label>상품명</label>
            <input
              name="name"
              value={newProduct.name}
              onChange={handleChange}
              required
              placeholder="상품명 입력"
            />
          </div>

          <div className="input-group">
            <label>구단 선택 (정렬 가중치 적용)</label>
            <select name="team" value={newProduct.team} onChange={handleChange}>
              <option value="KIA">KIA 타이거즈</option>
              <option value="Lotte">Lotte 자이언츠</option>
              <option value="LG">LG 트윈스</option>
              <option value="Doosan">두산 베어스</option>
              <option value="KT">KT 위즈</option>
              <option value="SSG">SSG 랜더스</option>
              <option value="Hanwha">한화 이글스</option>
              <option value="NC">NC 다이노스</option>
              <option value="Kiwoom">키움 히어로즈</option>
              <option value="Samsung">삼성 라이온즈</option>
            </select>
          </div>
        </div>

        <div className="input-group">
          <label>상세 설명</label>
          <textarea
            name="description"
            value={newProduct.description}
            onChange={handleChange}
            placeholder="상품 상세 설명을 입력하세요"
          />
        </div>

        <div className="input-row">
          <div className="input-group">
            <label>가격 (₩)</label>
            <input type="number" name="price" value={newProduct.price} onChange={handleChange} required />
          </div>
          <div className="input-group">
            <label>재고 (EA)</label>
            <input
              type="number"
              name="stockQuantity"
              value={newProduct.stockQuantity}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="input-group">
          <label>이미지 업로드</label>
          <div className="image-drop-zone" onClick={() => fileInputRef.current?.click()}>
            <input
              type="file"
              accept="image/*"
              onChange={handleFileChange}
              ref={fileInputRef}
              style={{ display: 'none' }}
            />

            {imagePreview ? (
              <img src={imagePreview} alt="Preview" className="upload-preview" />
            ) : (
              <div className="upload-placeholder">📸 클릭하여 상품 사진 업로드</div>
            )}
          </div>
        </div>

        <button type="submit" className="submit-btn">
          상품 시스템 등록하기
        </button>
      </form>
    </div>
  );
};

export default AdminProductPage;