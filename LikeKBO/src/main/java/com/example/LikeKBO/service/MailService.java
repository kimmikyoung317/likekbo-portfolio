package com.example.LikeKBO.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class MailService {

    private final JavaMailSender mailSender;

    @Value("${spring.mail.username}")
    private String from;

    public void sendLoginCode(String to, String code) {
        SimpleMailMessage msg = new SimpleMailMessage();
        msg.setFrom(from);   // ⚠️ 반드시 spring.mail.username과 동일
        msg.setTo(to);
        msg.setSubject("[KBOLike] 로그인 인증번호");
        msg.setText("인증번호: " + code + "\n5분 이내에 입력해주세요.");

        mailSender.send(msg);
        System.out.println("✅ 메일 발송 성공: " + to);
    }
}