package com.example.LikeKBO.controller;

import com.example.LikeKBO.service.LoginService;
import com.example.LikeKBO.service.MemberService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/auth") // SecurityConfig에서 허용한 경로로 맞춤 [cite: 2026-01-20]
public class MemberController {

    @Autowired
    private LoginService loginService;


    @Autowired
    private MemberService memberService;

    //1.회원가입(리액트 /signup요청받는곳
//    @PostMapping("/signup")
//    public ResponseEntity<?> join(@RequestBody MemberDto memberDto){
//        memberService.join(memberDto);
//        return ResponseEntity.ok(Map.of("message","회원가입 성공!"));
//    }

    //2.로그인 확인(passwordless 확인)
    @PostMapping("/verify")
    public ResponseEntity<?> verifyEmail(@RequestBody Map<String, String> request) {
        // 리액트가 보낸 JSON { "email": "..." } 에서 꺼내기
        String email = request.get("email");

        boolean exists = loginService.verifyUser(email);

        if (exists) {
            return ResponseEntity.ok(Map.of("message", "사용자 확인 완료."));
        } else {
            return ResponseEntity.status(401).body(Map.of("message", "등록되지 않은 이메일입니다."));
        }
    }
}