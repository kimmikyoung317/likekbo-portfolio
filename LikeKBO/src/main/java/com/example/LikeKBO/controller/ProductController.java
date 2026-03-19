package com.example.LikeKBO.controller;

import com.example.LikeKBO.dto.request.ProductCreateRequest;
import com.example.LikeKBO.dto.request.ProductUpdateRequest;
import com.example.LikeKBO.dto.response.ProductResponse;
import com.example.LikeKBO.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api") // ⚾️ 공통 주소를 위로 빼서 관리를 편하게 합니다.
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class ProductController {

    private final ProductService productService;

    // ⚾️ 1. 전체 리스트 조회 (로그인 없이 가능)
    // 주소: http://localhost:8080/api/products/all
    @GetMapping("/products/all")
    public ResponseEntity<List<ProductResponse>> getAllProducts() {
        List<ProductResponse> responses = productService.getAllProducts();
        return ResponseEntity.ok(responses);
    }

    // ⚾️ 2. 상세 조회
    // 주소: http://localhost:8080/api/products/{id}
    @GetMapping("/products/{id}")
    public ResponseEntity<ProductResponse> getProduct(@PathVariable Long id) {
        ProductResponse response = productService.getProduct(id);
        return ResponseEntity.ok(response);
    }

    // ⚾️ 3. 관리자 전용: 상품 등록
    // 주소: http://localhost:8080/api/admin/product/upload
    @PostMapping("/admin/product/upload")
    public ResponseEntity<ProductResponse> createProduct(
            @ModelAttribute ProductCreateRequest request) {
        // 기존 서비스 로직 유지
        ProductResponse response = productService.createProduct(request, null);
        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }

    // ⚾️ 4. 관리자 전용: 상품 수정
    @PutMapping("/admin/product/{id}")
    public ResponseEntity<ProductResponse> updateProduct(
            @PathVariable Long id,
            @RequestBody ProductUpdateRequest<Object> request) {
        ProductResponse response = productService.updateProduct(id, request);
        return ResponseEntity.ok(response);
    }

    // ⚾️ 5. 관리자 전용: 상품 삭제
    @DeleteMapping("/admin/product/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}