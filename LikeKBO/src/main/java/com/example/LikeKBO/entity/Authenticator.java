package com.example.LikeKBO.entity;

import jakarta.persistence.Entity;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
public class Authenticator {
    @Id
    private String id;

    private String email;

    @Lob
    private String publicKey;

    public Authenticator(String id, String email, String publicKey) {
        this.id = id;
        this.email = email;
        this.publicKey = publicKey;
    }
}