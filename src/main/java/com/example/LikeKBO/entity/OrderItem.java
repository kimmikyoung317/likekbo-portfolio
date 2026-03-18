package com.example.LikeKBO.entity;


import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Entity
@Getter
@NoArgsConstructor
@Table(name = "order_Items")
public class OrderItem {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "product_id")
    private Product product;//주문상품

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name ="order_id")
    private Order order;//연결된주문

    private  int orderPrice;//주문가격
    private  int quantity;//주문수량

    public void setOrder(Order order) {
        this.order = order;
    }


    public static OrderItem createOrderItem(Product product, int orderPrice, int quantity){
        OrderItem orderItem = new OrderItem();
        orderItem.product = product;
        orderItem.orderPrice = orderPrice;
        orderItem.quantity = quantity;

        return orderItem;
    }
}
