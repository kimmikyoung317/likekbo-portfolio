package com.example.LikeKBO.config;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;
import lombok.Getter;
import lombok.Setter;

@Configuration
@ConfigurationProperties(prefix = "x1280")
@Getter
@Setter
public class X1280Properties {
    private String baseUrl;
    private String serverKey;
    private boolean useMock = false;
}
