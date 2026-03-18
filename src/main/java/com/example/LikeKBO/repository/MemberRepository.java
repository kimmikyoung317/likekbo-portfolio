package com.example.LikeKBO.repository;

import com.example.LikeKBO.entity.Member;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface MemberRepository extends JpaRepository<Member, Long> {

    // ⚾️ 관리자 로그인용: 아이디로 회원 찾기
    Optional<Member> findByLoginId(String loginId);

    // ⚾️ [에러 해결] 이메일 중복 체크용: 이메일 존재 여부 확인
    // 이 한 줄이 추가되어야 MemberService의 에러가 사라집니다.
    boolean existsByEmail(String email);

    Optional<Member> findByEmail(String email);
}