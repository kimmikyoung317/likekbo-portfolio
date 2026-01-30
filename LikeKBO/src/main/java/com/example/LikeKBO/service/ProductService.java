package com.example.LikeKBO.service;

import com.example.LikeKBO.dto.request.ProductCreateRequest;
import com.example.LikeKBO.dto.request.ProductUpdateRequest;
import com.example.LikeKBO.dto.request.StockUpdateRequest;
import com.example.LikeKBO.dto.response.ProductResponse;
import com.example.LikeKBO.entity.Product;
import com.example.LikeKBO.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;

    @Transactional
    public ProductResponse<?> createProduct(ProductCreateRequest<?> request) {
        Product product = Product.builder()
                .name(request.getName())
                .description(request.getDescription())
                .price(request.getPrice())
                .stockQuantity(request.getStockQuantity())
                .build();

        Product savedProduct = productRepository.save(product);
        return convertToResponse(savedProduct);
    }

    public ProductResponse<?> getProduct(Long id) {
        Product product = findProductById(id);
        return convertToResponse(product);
    }

    public List<ProductResponse<?>> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    public Page<ProductResponse<?>> getProducts(Pageable pageable) {
        return productRepository.findAll(pageable)
                .map(this::convertToResponse);
    }

    @Transactional
    public ProductResponse<?> updateProduct(Long id, ProductUpdateRequest<?> request) {
        Product product = findProductById(id);
        product.updateInfo(request.getName(), request.getDescription(), request.getPrice());
        return convertToResponse(product);
    }

    @Transactional
    public ProductResponse<?> updateStock(Long id, StockUpdateRequest request) {
        Product product = findProductById(id);
        product.updateStock(request.getStockQuantity());
        return convertToResponse(product);
    }

    @Transactional
    public void deleteProduct(Long id) {
        Product product = findProductById(id);
        productRepository.delete(product);
    }

    private Product findProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품이 존재하지 않습니다. ID: " + id));
    }

    private ProductResponse<?> convertToResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stockQuantity(product.getStockQuantity())
                .build();
    }
}