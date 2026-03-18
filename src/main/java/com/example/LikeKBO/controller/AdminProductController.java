package com.example.LikeKBO.controller;

import com.example.LikeKBO.dto.request.ProductCreateRequest;
import com.example.LikeKBO.dto.response.ProductResponse;
import com.example.LikeKBO.service.ImageUploadService;
import com.example.LikeKBO.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;


@RestController
@RequestMapping("/api/admin") // 상품 등록 등 관리자 기능용
@RequiredArgsConstructor
@CrossOrigin(origins = {"http://localhost:3000", "http://localhost:5173"})
public class AdminProductController {

    private final ImageUploadService imageUploadService;
    private final ProductService productService;
    @PostMapping("/upload")
    public ResponseEntity<ProductResponse> createProduct(
            @RequestPart("image") MultipartFile image,
            @RequestPart("product") @Valid ProductCreateRequest request
    ) {
        String savedUrl = imageUploadService.saveFile(image);


        ProductResponse response = productService.createProduct(request, savedUrl);

        return ResponseEntity.status(HttpStatus.CREATED).body(response);
    }
}
