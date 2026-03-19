package com.example.LikeKBO.dto.response;

import com.example.LikeKBO.entity.Category;
import com.example.LikeKBO.entity.Product;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class ProductResponse<T> {

    private Long id;
    private String name;
    private String description;
    private Long price;
    private Integer stockQuantity;
    private String categoryName; // 엔티티에서 이름을 가져와서 담는 경우가 많음

    // Entity를 DTO로 변환하는 정적 팩토리 메서드 (선택 사항이나 권장)
    public static ProductResponse from(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .stockQuantity(product.getStockQuantity())
                .categoryName(null)
                .build();

    }
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "category_id")
    public Class<Object> getCategory() { // 혹은 public Object getCategory()
        return null;

    }
}