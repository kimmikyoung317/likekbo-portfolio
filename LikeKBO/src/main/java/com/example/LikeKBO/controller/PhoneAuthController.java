package com.example.LikeKBO.controller;

import com.example.LikeKBO.entity.User;
import com.example.LikeKBO.repository.UserRepository;
import com.example.LikeKBO.security.JwtTokenProvider;
import com.example.LikeKBO.service.AuthCodeService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Map;

@RestController
@RequestMapping("/api/auth/phone")
@RequiredArgsConstructor
public class PhoneAuthController {

    private final UserRepository userRepository;
    private final AuthCodeService authCodeService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/request")
    public ResponseEntity<?> requestCode(@RequestBody Map<String, String> req) {
        String phoneNumber = req.get("phoneNumber");
        if (phoneNumber == null || phoneNumber.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("result", false, "message", "phoneNumber는 필수입니다."));
        }

        User user = userRepository.findByPhoneNumber(phoneNumber.trim()).orElse(null);
        if (user == null) {
            return ResponseEntity.ok(Map.of("result", false, "message", "가입되지 않은 휴대폰 번호입니다."));
        }

        String code = String.format("%06d", (int) (Math.random() * 1_000_000));
        authCodeService.save(phoneNumber.trim(), code);

        // TODO 운영: SMS 서비스 연동
        return ResponseEntity.ok(Map.of(
                "result", true,
                "message", "인증번호가 발급되었습니다.",
                "devCode", code
        ));
    }

    /**
     * 2) 인증번호 검증 후 JWT 발급
     */
    @PostMapping("/verify")
    public ResponseEntity<?> verify(@RequestBody Map<String, String> req) {
        String phoneNumber = req.get("phoneNumber");
        String code = req.get("code");

        if (phoneNumber == null || code == null || phoneNumber.isBlank() || code.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("result", false, "message", "phoneNumber/code는 필수입니다."));
        }

        boolean ok = authCodeService.verify(phoneNumber.trim(), code.trim());
        if (!ok) {
            return ResponseEntity.ok(Map.of("result", false, "message", "인증번호가 올바르지 않습니다."));
        }

        User user = userRepository.findByPhoneNumber(phoneNumber.trim()).orElse(null);
        if (user == null) {
            return ResponseEntity.ok(Map.of("result", false, "message", "가입된 사용자 정보가 없습니다."));
        }

        String token = jwtTokenProvider.createToken(user.getEmail(), List.of("ROLE_USER"));

        return ResponseEntity.ok(Map.of(
                "result", true,
                "accessToken", token,
                "email", user.getEmail(),
                "name", user.getName(),
                "role", "USER"
        ));
    }
}
