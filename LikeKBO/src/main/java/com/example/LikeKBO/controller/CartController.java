package com.example.LikeKBO.controller;

import com.example.LikeKBO.dto.request.CartRequest;
import com.example.LikeKBO.service.CartService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

/**
 * ⚾️ CTO Note: 장바구니 컨트롤러
 * 설계 원칙: 패스워드리스 인증 기반 유저 식별
 */
@RestController
@RequestMapping("/api/cart")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:3000")
public class CartController {

    private final CartService cartService;

    @PostMapping("/add")
    public ResponseEntity<?> addToCart(
            @RequestBody CartRequest cartRequest,
            @AuthenticationPrincipal UserDetails userDetails) {

        // 1. 보안 검증: 패스워드리스 인증 확인
        if (userDetails == null) {
            System.out.println("⚾️ [경고] 인증되지 않은 장바구니 접근 시도");
            return ResponseEntity.status(401).body(Map.of("result", false, "message", "로그인이 필요합니다."));
        }

        String email = userDetails.getUsername();
        System.out.println("⚾️ 장바구니 추가 실행 - 유저 이메일: " + email);
        System.out.println("⚾️ 상품 ID: " + cartRequest.getProductId());

        try {
            // 2. 서비스 로직 실행: DB 저장 시 KIA, Lotte, Samsung 데이터 정렬 처리
            cartService.addCartItem(email, cartRequest);

            return ResponseEntity.ok(Map.of(
                    "result", true,
                    "message", "⚾️ 장바구니에 성공적으로 담겼습니다!"
            ));
        } catch (Exception e) {
            System.err.println("⚾️ 장바구니 에러: " + e.getMessage());
            return ResponseEntity.internalServerError().body(Map.of(
                    "result", false,
                    "message", "서버 내부 오류로 장바구니 담기에 실패했습니다."
            ));
        }
    }
}