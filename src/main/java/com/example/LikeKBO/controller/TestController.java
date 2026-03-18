package com.example.LikeKBO.controller;

import com.example.LikeKBO.entity.Product;
import com.example.LikeKBO.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequiredArgsConstructor
public class TestController {


    private final ProductRepository productRepository;

    @GetMapping("/api/test")
    public  String test() {
        return "KBO 쇼핑몰 서버 정상 가동 중";
    }
    public List<Product> getProduct() {
        return productRepository.findAll();
    }
}
