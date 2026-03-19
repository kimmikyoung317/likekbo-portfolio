package com.example.LikeKBO.config;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Override
    public void addResourceHandlers(ResourceHandlerRegistry registry) {
        // 1. /uploads/** 로 들어오는 모든 요청을
        // 2. 실제 프로젝트 루트의 uploads 폴더와 연결합니다.
        // 🚨 주의: 시큐리티 설정(SecurityConfig)에서 /uploads/** 는 반드시 permitAll() 되어 있어야 합니다!
        registry.addResourceHandler("/uploads/**")
                .addResourceLocations("file:uploads/");
    }
}