package com.example.LikeKBO.controller;

import com.example.LikeKBO.dto.MemberDto;
import com.example.LikeKBO.service.LoginService;
import com.example.LikeKBO.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/member") // SecurityConfig에서 허용한 경로로 맞춤 [cite: 2026-01-20]
public class MemberController {

    @Autowired
    private LoginService loginService;

    @Autowired
    private MemberService memberService;

   // 1.회원가입(리액트 /signup요청받는곳
    @PostMapping("/signup")
    public ResponseEntity<?> join(@RequestBody MemberDto memberDto){
        memberService.join(memberDto);
        return ResponseEntity.ok(Map.of("message","회원가입 성공!"));
    }

    //2. 사용자 존재 확인(폰번호 기준)
    @PostMapping("/verify")
    public ResponseEntity<?> verifyPhone(@RequestBody Map<String, String> request) {
        String phoneNumber = request.get("phoneNumber");

        if (phoneNumber == null || phoneNumber.isBlank()) {
            return ResponseEntity.badRequest().body(Map.of("message", "phoneNumber는 필수입니다."));
        }

        boolean exists = loginService.verifyUserByPhone(phoneNumber.trim());

        if (exists) {
            return ResponseEntity.ok(Map.of("exists", true, "message", "사용자 확인 완료."));
        } else {
            return ResponseEntity.status(401).body(Map.of("exists", false, "message", "등록되지 않은 휴대폰 번호입니다."));
        }
    }
}
