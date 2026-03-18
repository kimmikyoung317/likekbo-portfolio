package com.example.LikeKBO.dto;


import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Pattern;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class MemberDto {

      private String username;
        //private String password;

      private String name;

      @NotBlank(message = "이메일은 필수입니다")
      @Email
      private String email;

      @Pattern(regexp = "^010\\d{8}$", message = "인증번호받을 본인명의 의휴대폰 번호를 입력하세요")
      @NotBlank(message = "폰 번호는 필수입니다")
      private String phoneNumber;

}
