package com.example.LikeKBO;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

import org.springframework.boot.CommandLineRunner;
import org.springframework.context.annotation.Bean;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;

@EnableJpaAuditing
@SpringBootApplication

public class LikeKboApplication {
    public static void main(String[] args) {

        SpringApplication.run(LikeKboApplication.class, args);
    }

    @Bean
    public CommandLineRunner printHash() {
        return args -> {
            BCryptPasswordEncoder encoder = new BCryptPasswordEncoder();
            String hash = encoder.encode("1234");

            System.out.println("========== ADMIN HASH ==========");
            System.out.println(hash);
            System.out.println("================================");
        };
    }


}