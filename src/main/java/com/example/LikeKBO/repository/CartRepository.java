package com.example.LikeKBO.repository;

import com.example.LikeKBO.entity.CartItem;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import java.util.List;

@Repository
public interface CartRepository extends JpaRepository<CartItem, Long> {

    // ⚾️ [중요] 필드명이 email이므로 findByEmail로 수정해야 에러가 사라집니다.
    // 기존의 findByUserEmail 메서드는 삭제하거나 주석 처리하세요!
    List<CartItem> findByEmail(String email);
}