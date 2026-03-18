package com.example.LikeKBO.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class VerifyRequest {
    // ⚾️ 파트너님 설계 준수: 이메일 기반 인증 [cite: 2026-01-20]
    private String email;
    private String code;
}