package com.example.LikeKBO.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
@Entity
@Getter @Setter
@NoArgsConstructor
@Table(name = "users")
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String email;

    @Column(nullable = false)
    private String name;

    @Column(nullable = false)
    private String authProvider = "EMAIL"; // 초기값 설정 ㅋ

    @Enumerated(EnumType.STRING)
    private Role role ;

    @Column(name = "phone_number", unique = true)
    private String phoneNumber;
}