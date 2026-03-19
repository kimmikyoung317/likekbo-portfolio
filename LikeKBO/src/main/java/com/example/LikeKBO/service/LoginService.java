package com.example.LikeKBO.service;

import com.example.LikeKBO.entity.Admin;
import com.example.LikeKBO.entity.User;
import com.example.LikeKBO.repository.AdminRepository;
import com.example.LikeKBO.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class LoginService {

    private final UserRepository userRepository;
    private final AdminRepository adminRepository;
    private final PasswordEncoder passwordEncoder;

    public boolean verifyAdmin(String username, String rawPassword) {
        Admin admin = adminRepository.findByUsername(username).orElse(null);
        if (admin == null) return false;

        if (!passwordEncoder.matches(rawPassword, admin.getPassword())) return false;

        return "ADMIN".equals(admin.getRole());
    }

    public boolean verifyUserByEmail(String email) {
        return userRepository.findByEmail(email).isPresent();
    }

    public boolean verifyUserByPhone(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber).isPresent();
    }

    public User findUserByPhone(String phoneNumber) {
        return userRepository.findByPhoneNumber(phoneNumber).orElse(null);
    }
}
