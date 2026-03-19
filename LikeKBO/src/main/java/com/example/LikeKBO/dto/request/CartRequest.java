package com.example.LikeKBO.dto.request;

import lombok.*;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class CartRequest {
    private Long productId;
    private int quantity;
}