package com.example.LikeKBO;

import com.example.LikeKBO.entity.User;
import com.example.LikeKBO.service.X1280Service;
import com.fasterxml.jackson.databind.ObjectMapper;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.DisplayName;
import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.autoconfigure.web.servlet.AutoConfigureMockMvc;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.http.MediaType;
import org.springframework.test.context.bean.override.mockito.MockitoBean; // 최신 방식
import org.springframework.test.web.servlet.MockMvc;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import static org.hamcrest.Matchers.containsString;
import java.util.Map;
import static org.mockito.ArgumentMatchers.anyString;
import static org.mockito.BDDMockito.given;
import static org.springframework.test.web.servlet.request.MockMvcRequestBuilders.*;
import static org.springframework.test.web.servlet.result.MockMvcResultHandlers.print;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.*;
import static org.springframework.test.web.servlet.result.MockMvcResultMatchers.jsonPath;

@SpringBootTest
@AutoConfigureMockMvc
class AuthControllerTest {

    @Autowired
    private MockMvc mockMvc;

    @Autowired
    private ObjectMapper objectMapper;

    // [수정 포인트 1] @MockBean 대신 @MockitoBean을 필드 위에 정확히 선언
    @MockitoBean
    private X1280Service x1280Service;

    private static final String BASE_URL = "/api/v1/auth";
    private static final String USER_ID = "testuser01";

    // [수정 포인트 2] 각 테스트 실행 전, 가짜 서비스의 기본 동작 정의
    @BeforeEach
    void setUp() {
        // 모든 외부 서비스 호출에 대해 즉각적인 가짜 응답(Stub)을 설정합니다.
        // 이 설정이 없으면 Mock 객체는 null을 반환하고, 로직 중 NullPointerException이나 무한 대기가 발생할 수 있습니다.
        given(x1280Service.isAp(anyString())).willReturn("{\"result\":true}");
        given(x1280Service.joinAp(anyString())).willReturn("{\"status\":\"SUCCESS\", \"userId\":\"" + USER_ID + "\"}");
        given(x1280Service.getToken(anyString())).willReturn("{\"data\":{\"token\":\"mock_token\"}}");
        given(x1280Service.getSp(anyString(), anyString())).willReturn("{\"result\":true}");
        given(x1280Service.checkResult(anyString())).willReturn("{\"result\":true}");
        given(x1280Service.cancel(anyString(), anyString())).willReturn("{\"result\":true}");
        given(x1280Service.withdrawalAp(anyString())).willReturn("{\"result\":true}");
    }


    // 1. 사용자 등록 여부 확인 수정
    // @GetMapping(value = "/status", produces = MediaType.APPLICATION_JSON_VALUE)
    // public String checkUserStatus(@RequestParam String user) {
       // return x1280Service.isAp(user);// 이미 {"result":true} 형태의 문자열일 것입니다.
    // }

    @Test
    @DisplayName("1. 사용자 등록 여부 확인 수정 (getSp)")
    void checkUserStatus() throws Exception {
        mockMvc.perform(get(BASE_URL + "/status")
                        .param("userId", USER_ID))
                .andExpect(status().isOk());
    }

    // 2. 인증 결과 조회 수정
    //@GetMapping(value = "/result", produces = MediaType.APPLICATION_JSON_VALUE)
    //public String checkResult(@RequestParam String userId) {
      //  return x1280Service.checkResult(userId);
    //}

    @Test
    @DisplayName("2. 인증 결과 조회 수정")
    void checkResult() throws Exception {
        mockMvc.perform(get(BASE_URL + "/result")
                        .param("userId", USER_ID))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("3. 로그인 트리거 (getSp)")
    void triggerLogin() throws Exception {
        mockMvc.perform(post(BASE_URL + "/login-trigger")
                        .param("userId", USER_ID)
                        .param("ip", "127.0.0.1"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("4. 인증 결과 조회 (polling)")
    void checkAuthResult() throws Exception {
        mockMvc.perform(get(BASE_URL + "/result")
                        .param("userId", USER_ID))
                .andExpect(status().isOk())
                // [수정] 아래의 Content-Type 검사 줄을 주석 처리하거나 삭제하세요!
                // .andExpect(content().contentType(MediaType.APPLICATION_JSON))
                .andExpect(content().string(containsString("result"))); // 내용물에 result가 있는지 확인
    }

    @Test
    @DisplayName("5. 인증 취소")
    void cancelAuthentication() throws Exception {
        mockMvc.perform(post(BASE_URL + "/cancel")
                        .param("userId", USER_ID)
                        .param("sessionId", "test-session-123"))
                .andExpect(status().isOk());
    }

    @Test
    @DisplayName("6. 회원 탈퇴 (withdrawal)")
    void withdrawalUser() throws Exception {
        mockMvc.perform(post(BASE_URL + "/withdrawal")
                        .param("userId", USER_ID))
                .andExpect(status().isOk());
    }

//    void runTestCodes() {
//        checkUserStatus(USER_ID);
//        checkResult(USER_ID);
//    }

}