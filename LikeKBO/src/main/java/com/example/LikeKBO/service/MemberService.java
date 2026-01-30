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

@Service
public class MemberService {
    @Autowired private MemberRepository memberRepository;
    @Autowired private UserRepository userRepository;

    @Transactional
    public void join(MemberDto memberDto) {
        // 1. 공통 User 정보 저장 (이메일 위주!) ㅋ
        User user = new User();
        user.setEmail(memberDto.getEmail());
        user.setName(memberDto.getName());
        user.setAuthProvider("EMAIL");
        user.setRole(Role.USER);
        User savedUser = userRepository.save(user);

        // 2. 앱 전용 Member 정보 저장 (심플하게!) ⚾️
        Member member = new Member();
        member.setLoginId(memberDto.getUsername());
        member.setEmail(memberDto.getEmail()); // 이메일만 있으면 로그인 가능! ㅋ
        member.setUser(savedUser);

        memberRepository.save(member);
    }

    // 🚨 폰 번호 대신 그냥 아이디만 확인하는 용도로 남겨두거나, 아예 지우셔도 됩니다! ㅋ
    public boolean checkUserExists(String email) {
        return memberRepository.findByEmail(email).isPresent();
    }
}