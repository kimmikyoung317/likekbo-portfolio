package com.example.LikeKBO.controller;

import com.example.LikeKBO.dto.request.AdminLoginRequest;
import com.example.LikeKBO.dto.request.ProductCreateRequest;
import com.example.LikeKBO.dto.response.ProductResponse;
import com.example.LikeKBO.service.ImageUploadService; // 임포트 확인!
import com.example.LikeKBO.service.ProductService;     // 임포트 확인!
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.HashMap;
import java.util.Map;
@RestController
@RequestMapping("/api/admin")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class AdminProductController {

    private final ImageUploadService imageUploadService;
    private final ProductService productService;

    @PostMapping("/login")
    public ResponseEntity<?> adminLogin(@RequestBody AdminLoginRequest request) {
        String inputId = (request.getLoginId() != null) ? request.getLoginId().trim() : "";
        String inputPassword = (request.getPassword() != null) ? request.getPassword() : "";

        String adminEmail = "rkfnsk10@naver.com";
        String adminPassword = "1234";

        if (adminEmail.equalsIgnoreCase(inputId) && adminPassword.equals(inputPassword)) {
            Map<String, Object> response = new HashMap<>();
            response.put("status", "success");
            response.put("message", "관리자 인증 성공! 룰루님 환영합니다!");
            // 🚨 이 'token'이 있어야 새로고침 문제를 해결할 수 있습니다.
            response.put("token", "ADMIN_ACCESS_TOKEN_KI_STATION");

            return ResponseEntity.ok(response);
        }

        // 실패 시 응답 (하나로 통일)
        return ResponseEntity.status(HttpStatus.UNAUTHORIZED)
                .body(Map.of("message", "아이디 또는 비밀번호가 일치하지 않습니다. 다시 확인해주세요! ㅋ"));
    }

    @PostMapping("/product/upload")
    public ResponseEntity<?> createProduct(
            @RequestPart("data") ProductCreateRequest<Object> request,
            @RequestPart("file") MultipartFile file) {

        String savedUrl = imageUploadService.saveFile(file);
        request.setImageUrl(savedUrl);

        ProductResponse<?> response = productService.createProduct(request);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
