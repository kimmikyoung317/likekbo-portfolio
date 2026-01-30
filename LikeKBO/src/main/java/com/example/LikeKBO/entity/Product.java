package com.example.LikeKBO.entity;

import jakarta.persistence.*;
import lombok.*;
import org.springframework.data.annotation.CreatedDate;
import org.springframework.data.jpa.domain.support.AuditingEntityListener;

import java.time.LocalDateTime;

@Entity
@Getter
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor
@Builder
@EntityListeners(AuditingEntityListener.class) // [필수] 이게 있어야 생성시간이 자동 기록됩니다.
@Table(name="product")
public class Product {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "name")
    private String name;

    @Column(name = "description")
    private String description;

    @Column(name = "price")
    private Long price;

    @Column(name = "stock") // 사진 속 DB 컬럼명이 'stock'이므로 맞춰줍니다.
    private Integer stockQuantity;

    @Column(name = "team_name") // 사진 속 컬럼명 'team_name'과 연결
    private String teamName; // [주의] 한글 데이터를 받기 위해 잠시 String으로 변경 추천

    @Column(name = "image_url") // 사진에 있는 이미지 경로 컬럼
    private String imageUrl;

    @CreatedDate
    @Column(name = "created_at", updatable = false)
    private java.time.LocalDateTime createdAt;

    // --- 비즈니스 로직 ---

    public void updateInfo(String name, String description, Long price) {
        this.name = name;
        this.description = description;
        this.price = price;
    }

    public void updateStock(Integer stockQuantity) {
        this.stockQuantity = stockQuantity;
    }

    public void removeStock(int quantity) {
        int restStock = this.stockQuantity - quantity;
        if (restStock < 0) {
            throw new IllegalArgumentException("재고가 부족합니다. (현재 재고: " + this.stockQuantity + ")");
        }
        this.stockQuantity = restStock;
    }

    public void addStock(int quantity) {
        this.stockQuantity += quantity;
    }

    // 임시 카테고리 메서드 (에러 방지용)
    public Object getCategory() {
        return null;
    }

    public enum TeamName {
        SAMSUNG, LG, DOOSAN, KIA, LOTTE, SSG, KT, HANWHA, KIWOOM, NC, ALL
    }
}