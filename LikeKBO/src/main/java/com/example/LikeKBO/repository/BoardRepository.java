package com.example.LikeKBO.repository;

import com.example.LikeKBO.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface BoardRepository extends JpaRepository<Board, Long> {
    // 기본 CRUD 기능이 자동으로 생성됩니다. [cite: 2026-01-07]
}