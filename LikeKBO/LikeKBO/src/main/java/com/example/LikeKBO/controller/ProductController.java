package com.example.LikeKBO.controller;

import com.example.LikeKBO.dto.request.ProductCreateRequest;
import com.example.LikeKBO.dto.request.ProductUpdateRequest;
import com.example.LikeKBO.dto.request.StockUpdateRequest;
import com.example.LikeKBO.dto.response.ProductResponse;
import com.example.LikeKBO.service.ProductService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.autoconfigure.ssl.SslProperties;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.io.File;
import java.util.List;

@RestController
@RequestMapping("/api/product")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class ProductController {

    private final ProductService productService;

    /**
     * 상품 등록: 타입 매개변수를 통해 상세 정보(T)를 포함할 수 있음
     */
    @PostMapping
    public ResponseEntity<ProductResponse<?>> createProduct(
            @RequestBody @Valid ProductCreateRequest<?> request) {
        return ResponseEntity.status(HttpStatus.CREATED)
                .body(productService.createProduct(request));
    }

  //상품조화
    @GetMapping("/{id}")
    public ResponseEntity<ProductResponse<?>> getProduct(@PathVariable Long id) {
        return ResponseEntity.ok(productService.getProduct(id));
    }

   //전체조회
    @GetMapping
    public ResponseEntity<Page<ProductResponse<?>>> getProducts(
            @PageableDefault(size = 20, sort = "createdAt", direction = Sort.Direction.DESC) Pageable pageable) {
        return ResponseEntity.ok(productService.getProducts(pageable));
    }


  //전체리스트조회
    @GetMapping("/all")
    public ResponseEntity<List<ProductResponse<?>>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }

   //상품정보수정
    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse<?>> updateProduct(
            @PathVariable Long id,
            @RequestBody @Valid ProductUpdateRequest<?> request) {
        return ResponseEntity.ok(productService.updateProduct(id, request));
    }

  //재고수량만 부분수정
    @PatchMapping("/{id}/stock")
    public ResponseEntity<ProductResponse<?>> updateStock(
            @PathVariable Long id,
            @RequestBody @Valid StockUpdateRequest request) {
        return ResponseEntity.ok(productService.updateStock(id, request));
    }
//상품삭제
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteProduct(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
//    String uploadDir = "uploads/";
//    SslProperties.Bundles.Watch.File dir = new File(uploadDir);
//


}