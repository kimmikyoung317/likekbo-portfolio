package com.example.LikeKBO.repository;

import com.example.LikeKBO.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional(readOnly = true)
public interface ProductRepository extends JpaRepository<Product, Long> {

    // 특정 팀의 굿즈(상품)만 모아볼 때 사용
    // Product 엔티티 안에 TeamName이라는 enum 혹은 필드가 있어야 작동합니다.
    List<Product> findByTeamName(Product.TeamName teamName);

    // 키워드로 상품 검색 (확장성 고려)
    List<Product> findByNameContaining(String keyword);
}