package com.example.LikeKBO.controller;

import com.example.LikeKBO.dto.MemberDto;
import com.example.LikeKBO.service.MemberService;
import com.example.LikeKBO.service.X1280Service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth")
@CrossOrigin(origins = "http://localhost:5173")
public class AuthController {

    @Autowired
    private MemberService memberService;

    @Autowired
    private X1280Service x1280Service;

    // 1. 회원가입: 이메일 기반 심플 가입 ㅋ
    @PostMapping("/signup")
    public ResponseEntity<?> signUp(@RequestBody MemberDto memberDto) {
        try {
            memberService.join(memberDto);
            return ResponseEntity.ok(Map.of("message", "회원가입 완료! ⚾️"));
        } catch (Exception e) {
            return ResponseEntity.status(500).body(Map.of("message", "가입 오류: " + e.getMessage()));
        }
    }

    // 2. 패스워드리스 로그인: 이메일만 사용! ⚾️
    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        try {
            // 🚨 번호 찾는 로직은 과감히 삭제! 업체가 준 대로 email만 보냅니다. ㅋ
            String qrResponse = x1280Service.joinAp(email);
            return ResponseEntity.ok(qrResponse);
        } catch (Exception e) {
            return ResponseEntity.status(404).body(Map.of("message", "사용자를 찾을 수 없습니다."));
        }
    }

    // 3. 6자리 보안번호 가져오기 API 📱
    @PostMapping("/getSp")
    public ResponseEntity<?> getSecurityCode(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        return ResponseEntity.ok(x1280Service.getSp(email, "127.0.0.1"));
    }

    // 4. 유저 승인 결과 확인 (폴링용) ⚾️
    @PostMapping("/checkResult")
    public ResponseEntity<?> checkAuthResult(@RequestBody Map<String, String> request) {
        String email = request.get("email");
        return ResponseEntity.ok(x1280Service.checkResult(email));
    }
}