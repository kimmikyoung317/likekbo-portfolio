package com.example.LikeKBO.dto.request;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class JoinRequest {
    private String userId;
    private String phoneNumber;
    private String name;
    private String email;

    public JoinRequest(String userId) {
        this.userId = userId;
    }
}
