package com.example.LikeKBO.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.stereotype.Service;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender mailSender;

    //  인증번호 임시 저장소 (이메일 : 인증번호)
    private final Map<String, String> verificationCodes = new ConcurrentHashMap<>();

    public void sendVerificationEmail(String to, String code) {
        try {
            SimpleMailMessage message = new SimpleMailMessage();
            message.setTo(to);
            message.setSubject(" KBOLike! 인증번호 안내");
            message.setText("인증번호: [" + code + "]");
            mailSender.send(message);

            //  핵심: 발송 성공 시 메모리에 저장!
            verificationCodes.put(to, code);
            System.out.println(" [메디 발송 및 저장 완료] " + to + " : " + code);
        } catch (Exception e) {
            System.err.println(" 메일 발송 실패: " + e.getMessage());
        }
    }

    //  파트너님이 말씀하신 그 메서드! 번호 가져오기
    public String getVerificationCode(String email) {
        return verificationCodes.get(email);
    }

    //  인증 완료 후 번호 삭제 (보안을 위해!)
    public void removeCode(String email) {
        verificationCodes.remove(email);
    }
}