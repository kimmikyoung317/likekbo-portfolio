package com.example.LikeKBO.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;


@RestController
@RequestMapping("/api/auth")
@RequiredArgsConstructor
public class AuthController {

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> req) {
        return ResponseEntity.status(501).body(Map.of(
                "result", false,
                "message", "이메일 인증 로그인은 비활성화되었습니다. /api/auth/phone/request 를 사용하세요."
        ));
    }

    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody Map<String, String> req) {
        return ResponseEntity.status(501).body(Map.of(
                "result", false,
                "message", "이메일 인증 검증은 비활성화되었습니다. /api/auth/phone/verify 를 사용하세요."
        ));
    }
}
