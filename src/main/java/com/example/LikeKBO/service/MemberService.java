package com.example.LikeKBO.service;

import com.example.LikeKBO.dto.MemberDto;
import com.example.LikeKBO.entity.Member;
import com.example.LikeKBO.entity.Role;
import com.example.LikeKBO.entity.User;
import com.example.LikeKBO.repository.MemberRepository;
import com.example.LikeKBO.repository.UserRepository;
import jakarta.transaction.Transactional;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Service
public class MemberService {

    @Autowired
    private MemberRepository memberRepository;

    @Autowired
    private UserRepository userRepository;

    private final Map<String, String> authStorage = new ConcurrentHashMap<>();

    @Transactional
    public void join(MemberDto memberDto) {
        String phoneNumber = memberDto.getPhoneNumber() == null ? "" : memberDto.getPhoneNumber().trim();
        String name = memberDto.getName() == null ? "" : memberDto.getName().trim();

        if (phoneNumber.isBlank()) {
            throw new IllegalArgumentException("전화번호는 필수입니다.");
        }

        if (name.isBlank()) {
            throw new IllegalArgumentException("이름은 필수입니다.");
        }

        if (userRepository.findByPhoneNumber(phoneNumber).isPresent()) {
            throw new IllegalArgumentException("이미 가입된 전화번호입니다.");
        }

        String loginId = phoneNumber;
        String email = phoneNumber + "@phone.local";

        User user = new User();
        user.setEmail(email);
        user.setName(name);
        user.setAuthProvider("PHONE");
        user.setPhoneNumber(phoneNumber);
        user.setRole(Role.USER);

        User savedUser = userRepository.save(user);

        Member member = new Member();
        member.setLoginId(loginId);
        member.setPassword("PHONE_LOGIN_USER");
        member.setRole("USER");
        member.setName(name);
        member.setEmail(email);
        member.setUser(savedUser);

        memberRepository.save(member);
    }

    public boolean checkMemberExists(String email) {
        return memberRepository.existsByEmail(email);
    }

    public void saveVerificationCode(String email, String authCode) {
        authStorage.put(email, authCode);
        System.out.println("⚾️ [인증번호 저장됨] 이메일: " + email + ", 번호: " + authCode);
    }

    public boolean verifyCode(String email, String code) {
        String savedCode = authStorage.get(email);
        boolean isMatch = savedCode != null && savedCode.equals(code);

        if (isMatch) {
            authStorage.remove(email);
        }

        return isMatch;
    }
}