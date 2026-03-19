package com.example.LikeKBO.security;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.List;
import java.util.function.Function;

@Component
public class JwtTokenProvider {

    // 파트너님의 시스템 자산을 보호할 시크릿 키
    private static final String SECRET_KEY = "kbolike_premium_money_making_system_secret_key_2026";

    // ⚾️ 1. [생성] 관리자/유저 로그인 시 토큰 발행 (권한 리스트 포함)
    // AuthController에서 호출하는 규격 (String, List)에 맞췄습니다.
    public String createToken(String loginId, List<String> roles) {
        return Jwts.builder()
                .subject(loginId)
                .claim("roles", roles) // 👈 이 부분이 있어야 ROLE_ADMIN 검사를 통과합니다!
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24시간
                .signWith(getSignInKey())
                .compact();
    }

    // ⚾️ 2. 토큰 유효성 및 소유자 검증
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String username = extractUsername(token);
        return (username.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    // ⚾️ 3. 토큰에서 유저 아이디(Subject) 추출
    public String extractUsername(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // ⚾️ 4. 만료 여부 확인
    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    // ⚾️ 5. 공통 추출 로직 (jjwt 0.12.x 최신 규격 적용)
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = Jwts.parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claimsResolver.apply(claims);
    }

    // ⚾️ 6. 키 생성 로직
    private SecretKey getSignInKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }
}