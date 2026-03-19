package com.example.LikeKBO.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Entity
@Getter @Setter @NoArgsConstructor
@Table(name = "member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "login_id", unique = true)
    private String loginId;

    @Column(name="email", unique = true)
    private String email;


    @Column(name="phone")
    private String phone;


    @OneToOne
    @JoinColumn(name = "user_id") //  "user_fk_id"
    private User user;

    //private String password;
}