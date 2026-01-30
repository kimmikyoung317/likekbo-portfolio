package com.example.LikeKBO.repository;

import com.example.LikeKBO.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {


    //Optional<Member> findByLoginId(String email);

    Optional<Member> findByEmail(String email);
}
