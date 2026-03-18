package com.example.LikeKBO.controller;

import com.example.LikeKBO.entity.User;
import com.example.LikeKBO.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/mypage")
@RequiredArgsConstructor
public class MyPageController {

    private final UserRepository userRepository;

    // 로그인 후에만 접근 가능 (SecurityConfig에서 /api/mypage/** authenticated)
    @GetMapping("/me")
    public ResponseEntity<?> me(Authentication authentication) {
        String email = authentication.getName(); // JWT subject
        User user = userRepository.findByEmail(email).orElse(null);
        if (user == null) {
            return ResponseEntity.status(404).body(Map.of("message", "사용자 정보를 찾을 수 없습니다."));
        }
        return ResponseEntity.ok(Map.of(
                "email", user.getEmail(),
                "name", user.getName(),
                "phoneNumber", user.getPhoneNumber(),
                "role", user.getRole() != null ? user.getRole().name() : "USER"
        ));
    }
}
