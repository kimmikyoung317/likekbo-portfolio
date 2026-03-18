package com.example.LikeKBO.controller;

import com.example.LikeKBO.dto.response.ProductResponse;
import com.example.LikeKBO.service.ProductService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/admin/products")
@RequiredArgsConstructor
public class AdminProductManagementController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<List<ProductResponse>> list() {

        return ResponseEntity.ok(productService.getAllProducts());
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        productService.deleteProduct(id);
        return ResponseEntity.noContent().build();
    }
}
