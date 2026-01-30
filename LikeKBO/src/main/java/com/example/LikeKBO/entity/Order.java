package com.example.LikeKBO.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter; // Setter 추가
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter // 롬복 세터를 열어주어 하이버네이트가 자유롭게 접근하게 합니다.
@NoArgsConstructor
@Table(name="orders")
public class Order {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "user_id")
    private User user; // 필드명이 user입니다.

    @OneToMany(mappedBy = "order", cascade = CascadeType.ALL)
    private List<OrderItem> orderItems = new ArrayList<>();

    @OneToOne(fetch = FetchType.LAZY, cascade = CascadeType.ALL)
    @JoinColumn(name = "delivery_id")
    private Delivery delivery;

    private String status;
    private LocalDateTime createdAt;
    private String paymentKey;

    // [수정] 메서드 이름을 필드명과 일치시킵니다. (setMember -> setUser)
    public void setUser(User user){
        this.user = user;
    }

    public void addOrderItem(OrderItem orderItem){
        orderItems.add(orderItem);
        orderItem.setOrder(this);
    }

    // [수정] 생성 메서드 내에서도 setUser를 호출합니다.
    public static Order createOrder(User user, Delivery delivery, OrderItem... orderItems){
        Order order = new Order();
        order.setUser(user);
        order.setDelivery(delivery);

        for(OrderItem orderItem : orderItems) {
            order.addOrderItem(orderItem);
        }
        order.status = "ORDERED";
        order.createdAt = LocalDateTime.now();
        return order;
    }
}