package com.example.LikeKBO.dto.response;

import com.example.LikeKBO.entity.Product;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse {

    private Long id;
    private String name;
    private String description;
    private Long price;
    private Integer stockQuantity;
    private String categoryName;
    private String imageUrl;
    private String team;

    public static ProductResponse from(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stockQuantity(product.getStockQuantity())
                .categoryName("기타")
                .team(product.getTeam())
                .imageUrl(product.getImageUrl())
                .build();
    }
}