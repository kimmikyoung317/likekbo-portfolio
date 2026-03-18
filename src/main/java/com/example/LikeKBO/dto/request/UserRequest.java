package com.example.LikeKBO.dto.request;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
@Data
public class UserRequest {
    private String id;
    private String pw;
}
