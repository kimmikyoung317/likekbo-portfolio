package com.example.LikeKBO.dto.request;

import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotNull;
import lombok.*;

@Getter @Setter
@NoArgsConstructor @AllArgsConstructor
@Builder
public class ProductCreateRequest<T> {
    @NotBlank(message = "상품명은 필수입니다.")
    private String name;

    private String description;

    @NotNull(message = "가격은 필수입니다.")
    @Min(0)
    private Long price;

    @Min(value = 0, message = "재고량은 0개 이상이어야 합니다.")
    @NotNull(message = "재고량 필드는 반드시 존재해야 합니다.")
    private Integer stockQuantity;

    private T detail; // 타입 매개변수 적용

    private String imageUrl;

    private String team;
}