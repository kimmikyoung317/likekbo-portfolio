package com.example.LikeKBO.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter @Setter // ⚾️ 이 녀석이 getPassword(), getRole() 등을 자동으로 만들어줍니다!
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String loginId;

    // ⚾️ 핵심: 비밀번호 필드가 반드시 'password'라는 이름으로 있어야 합니다.
    @Column(nullable = false)
    private String password;

    @Column(nullable = false)
    private String role; // ADMIN 또는 USER

    private String name;
    private String email;

    @OneToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user;
}