package com.example.LikeKBO.entity;

import com.example.LikeKBO.Enum.DeliveryStatus;
import jakarta.persistence.*;
import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name ="delivery")
public class Delivery {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String receiverName;
    private String address;
    private String phone;

    @Enumerated(EnumType.STRING)
    private DeliveryStatus status; // READY, COMP

    @OneToOne(mappedBy = "delivery")
    private Order order;

    @Builder
    public Delivery(String receiverName, String address, String phone, DeliveryStatus status){
        this.receiverName = receiverName;
        this.address = address;
        this.phone = phone;
        this.status = status;//기본 READY
    }
//    public void updateStaus(DeliveryStatus) {
//        this.status = status;
//    }
}
