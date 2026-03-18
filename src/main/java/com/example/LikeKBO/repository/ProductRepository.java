package com.example.LikeKBO.repository;

import com.example.LikeKBO.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Repository
@Transactional(readOnly = true)
public interface ProductRepository extends JpaRepository<Product, Long> {


    //특정 팀의 굿즈(상품) 조회
    //[무결점 보정] 엔티티의 team 필드가 String이므로 인자도 String으로 맞춤
    List<Product> findByTeam(String team);


        //키워드로 상품 검색
    List<Product> findByNameContaining(String keyword);
}