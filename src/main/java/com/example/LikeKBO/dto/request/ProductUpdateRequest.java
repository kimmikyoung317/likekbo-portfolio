package com.example.LikeKBO.dto.request;

import lombok.*;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder

// 여기에 <T>를 붙여야 아래 detail 인식됩니다.
public class ProductUpdateRequest<T> {
    private String name;
    private String description;
    private Long price;
    private Integer stockQuantity;

    // 이 'detail' 때문에 우리가 이 고생을 하지만,
    // 나중에 유니폼 사이즈, 야구공 재질 등을 다 담을 수 있는 마법의 필드가 됩니다.
    private T detail;
}