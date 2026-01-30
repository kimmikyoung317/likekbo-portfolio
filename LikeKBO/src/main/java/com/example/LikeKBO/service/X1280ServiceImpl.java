package com.example.LikeKBO.service;

import com.example.LikeKBO.config.X1280Properties;
import com.example.LikeKBO.crypto.AESUtil;
import com.example.LikeKBO.dto.request.JoinRequest;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestClient;
import org.springframework.beans.factory.annotation.Value;

import java.util.UUID;

@Service
@org.springframework.boot.autoconfigure.condition.ConditionalOnProperty(name = "x1280.use-mock", havingValue = "false", matchIfMissing = true)
public class X1280ServiceImpl implements X1280Service {

    private final RestClient.Builder restClientBuilder;
    private final X1280Properties properties;
    private final ObjectMapper objectMapper = new ObjectMapper();

    public X1280ServiceImpl(RestClient.Builder restClientBuilder, X1280Properties properties) {
        this.restClientBuilder = restClientBuilder;
        this.properties = properties;
    }

    /**
     * [Core Logic] RestClient를 지역 변수로 생성하는 공통 메서드
     */
    private RestClient getClient() {
        return restClientBuilder
                .baseUrl(properties.getBaseUrl())
                .defaultHeader("X-Server-Key", properties.getServerKey())
                .build();
    }

    @Override
    public String isAp(String userId) {
        return getClient().post()
                .uri("/ap/rest/auth/isAp")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body("userId=" + userId)
                .retrieve()
                .body(String.class);
    }

    @Override
    public String joinAp(String userId) {
        return getClient().post()
                .uri("/ap/rest/auth/joinAp")
                .contentType(MediaType.APPLICATION_JSON)
                .body(new JoinRequest(userId))
                .retrieve()
                .body(String.class);
    }

    @Override
    public String getToken(String userId) {
        return getClient().post()
                .uri("/ap/rest/auth/getTokenForOneTime")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body("userId=" + userId)
                .retrieve()
                .body(String.class);
    }

    @Override
    public String getSp(String userId, String clientIp) {
        try {
            String tokenResponse = getToken(userId);
            JsonNode root = objectMapper.readTree(tokenResponse);
            JsonNode dataNode = root.get("data");

            if (dataNode == null || !dataNode.has("token")) return tokenResponse;

            String encryptedToken = dataNode.get("token").asText();
            String decryptedToken = AESUtil.decrypt(encryptedToken, properties.getServerKey());
            String sessionId = UUID.randomUUID().toString();
            String randomValue = UUID.randomUUID().toString().substring(0, 8);

            return getClient().post()
                    .uri("/ap/rest/auth/getSp")
                    .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                    .body("userId=" + userId +
                            "&token=" + decryptedToken +
                            "&random=" + randomValue +
                            "&sessionId=" + sessionId + // 'sessionId' 오타 수정 완료
                            "&clientip=" + clientIp)
                    .retrieve()
                    .body(String.class);

        } catch (Exception e) {
            return "{\"result\":false, \"msg\":\"Internal Error: " + e.getMessage() + "\"}";
        }
    }

    @Override
    public String checkResult(String userId) {
        return getClient().post()
                .uri("/ap/rest/auth/result")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body("userId=" + userId)
                .retrieve()
                .body(String.class);
    }

    @Override
    public String cancel(String userId, String sessionId) {
        return getClient().post()
                .uri("/ap/rest/auth/cancel")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body("userId=" + userId + "&sessionId=" + sessionId)
                .retrieve()
                .body(String.class);
    }

    @Override
    public String withdrawalAp(String userId) {
        return getClient().post()
                .uri("/ap/rest/auth/withdrawalAp")
                .contentType(MediaType.APPLICATION_FORM_URLENCODED)
                .body("userId=" + userId)
                .retrieve()
                .body(String.class);
    }
}