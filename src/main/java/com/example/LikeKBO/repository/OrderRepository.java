package com.example.LikeKBO.repository;

import com.example.LikeKBO.entity.Order;
import org.springframework.data.jpa.repository.JpaRepository;

public interface OrderRepository extends JpaRepository<Order, Long> {
}
