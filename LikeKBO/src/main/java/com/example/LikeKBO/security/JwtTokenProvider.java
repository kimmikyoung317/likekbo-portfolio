package com.example.LikeKBO.config;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.nio.charset.StandardCharsets;
import java.util.Date;
import java.util.function.Function;

@Component
public class JwtTokenProvider {

    private static final String SECRET_KEY = "kbolike_premium_money_making_system_secret_key_2026";

    // ⚾️ 1. [생성] 로그인 시 토큰을 발행합니다.
    public String createToken(String email) {
        return Jwts.builder()
                .subject(email)
                .issuedAt(new Date(System.currentTimeMillis()))
                .expiration(new Date(System.currentTimeMillis() + 1000 * 60 * 60 * 24)) // 24시간
                .signWith(getSignInKey())
                .compact();
    }

    // ⚾️ 2. [에러 해결] 필터가 찾는 그 메서드! 토큰 유효성을 검증합니다.
    public boolean isTokenValid(String token, UserDetails userDetails) {
        final String email = extractEmail(token);
        return (email.equals(userDetails.getUsername())) && !isTokenExpired(token);
    }

    // ⚾️ 3. [추출] 토큰에서 이메일을 꺼냅니다.
    public String extractEmail(String token) {
        return extractClaim(token, Claims::getSubject);
    }

    // ⚾️ 4. 만료 여부 확인
    private boolean isTokenExpired(String token) {
        return extractClaim(token, Claims::getExpiration).before(new Date());
    }

    // ⚾️ 5. 공통 추출 로직
    public <T> T extractClaim(String token, Function<Claims, T> claimsResolver) {
        final Claims claims = Jwts.parser()
                .verifyWith(getSignInKey())
                .build()
                .parseSignedClaims(token)
                .getPayload();
        return claimsResolver.apply(claims);
    }

    // ⚾️ 6. 키 생성 로직 (Base64 에러 방어 완료)
    private SecretKey getSignInKey() {
        return Keys.hmacShaKeyFor(SECRET_KEY.getBytes(StandardCharsets.UTF_8));
    }
}