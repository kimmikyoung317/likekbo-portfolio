package com.example.LikeKBO.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter @Setter
@NoArgsConstructor
public class Board {

    @Id @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // [수정] 게시글의 고유 PK는 Long 타입이어야 합니다.

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User writer; // [수정] 작성자는 User 엔티티와의 다대일 관계입니다.

    @Column(nullable = false)
    private String category;

    @Column(nullable = false)
    private String title;

    @Column(columnDefinition = "TEXT", nullable = false)
    private String content;

    private boolean isSecret;

    @Column(columnDefinition = "TEXT")
    private String adminReady;

    private LocalDateTime createdAt = LocalDateTime.now();
}