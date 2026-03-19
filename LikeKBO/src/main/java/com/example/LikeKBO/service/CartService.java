package com.example.LikeKBO.service;

import com.example.LikeKBO.dto.request.CartRequest;
import com.example.LikeKBO.repository.CartRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

@Service
@RequiredArgsConstructor
public class CartService {

    private final CartRepository cartRepository;

    @Transactional
    public void addCartItem(String email, CartRequest request) {
        // ⚾️ 실제 운영 서버라면 DB에 상품이 있는지 확인 후 Insert 합니다.
        // 파트너님의 설계대로 패스워드리스 인증된 유저(email)의 장바구니에 담습니다. [cite: 2026-01-20]
        System.out.println("⚾️ DB 작업 시작: " + email + " 유저의 장바구니에 " + request.getProductId() + "번 상품 추가");

        // 여기에 Repository.save() 로직이 들어갑니다.
    }
}