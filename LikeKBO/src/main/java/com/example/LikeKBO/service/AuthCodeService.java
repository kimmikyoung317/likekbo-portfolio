package com.example.LikeKBO.service;

import org.springframework.stereotype.Service;

import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

/**
 * 인증코드 임시 저장소 (개발용)
 * 운영에서는 Redis 등으로 대체 추천
 */
@Service
public class AuthCodeService {

    private final Map<String, String> storage = new ConcurrentHashMap<>();

    public void save(String key, String code) {
        storage.put(key, code);
    }

    public boolean verify(String key, String code) {
        String saved = storage.get(key);
        boolean ok = saved != null && saved.equals(code);
        if (ok) storage.remove(key);
        return ok;
    }
}
