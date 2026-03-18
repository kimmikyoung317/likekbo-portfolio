package com.example.LikeKBO;

import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

public class PwTest {
    public static void main(String[] args) {
        BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
        String encoded = encoder.encode("1234");
        System.out.println(encoded);
    }
}