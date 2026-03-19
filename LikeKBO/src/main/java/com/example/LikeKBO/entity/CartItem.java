package com.example.LikeKBO.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter
@NoArgsConstructor
public class CartItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    // 유저 식별용 이메일 [cite: 2026-01-20]
    private String email;

    private Long productId;

    private int quantity;

    // 팀 정보 (KIA, Lotte, Samsung 정렬을 위해 필요) [cite: 2026-01-27]
    private String teamName;
}