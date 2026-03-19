package com.example.LikeKBO.dto.request;

import lombok.Getter;
import lombok.Setter;

@Getter @Setter
public class AdminLoginRequest {
    private String loginId;  // 관리자 아이디
    private String password; // 관리자 비밀번호
}