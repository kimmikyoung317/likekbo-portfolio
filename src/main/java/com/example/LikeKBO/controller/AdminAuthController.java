package com.example.LikeKBO.controller;

import com.example.LikeKBO.entity.Admin;
import com.example.LikeKBO.repository.AdminRepository;
import com.example.LikeKBO.security.JwtTokenProvider;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
public class AdminAuthController {

    private final AdminRepository adminRepository;
    private final JwtTokenProvider jwtTokenProvider;
    private final org.springframework.security.crypto.password.PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> req) {
        String username = req.get("username");
        String password = req.get("password");

        if (username == null || password == null || username.isBlank() || password.isBlank()) {
            return ResponseEntity.ok(Map.of(
                    "result", false,
                    "message", "아이디 또는 비밀번호가 올바르지 않습니다."
            ));
        }

        Admin admin = adminRepository.findByUsername(username).orElse(null);

        if (admin == null || !passwordEncoder.matches(password, admin.getPassword())) {
            return ResponseEntity.ok(Map.of(
                    "result", false,
                    "message", "아이디 또는 비밀번호가 올바르지 않습니다."
            ));
        }

        String token = jwtTokenProvider.createToken(admin.getUsername(), List.of("ROLE_ADMIN"));

        return ResponseEntity.ok(Map.of(
                "result", true,
                "message", "로그인 성공",
                "accessToken", token,
                "username", admin.getUsername(),
                "role", "ADMIN"
        ));
    }
}