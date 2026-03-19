package com.example.LikeKBO.service;

import com.example.LikeKBO.entity.User;
import com.example.LikeKBO.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
public class LoginService {

    @Autowired
    private UserRepository userRepository;

    /**
     * 패스워드리스: 이메일로 등록된 사용자인지 확인 ⚾️
     */
    public boolean verifyUser(String email) {
        // 1. DB에서 해당 이메일을 가진 사용자를 찾습니다.
        Optional<User> userOptional = userRepository.findByEmail(email);

        // 2. 존재하면 true, 없으면 false 반환 ㅋ
        return userOptional.isPresent();
    }
}