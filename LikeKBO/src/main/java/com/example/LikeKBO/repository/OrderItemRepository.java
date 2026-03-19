package com.example.LikeKBO.repository;

import com.example.LikeKBO.entity.OrderItem;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderItemRepository extends JpaRepository<OrderItem, Long> {
    boolean existsByProduct_Id(Long productId);
}
