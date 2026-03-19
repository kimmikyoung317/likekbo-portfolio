package com.example.LikeKBO.service;

import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.File;
import java.io.IOException;
import java.util.UUID;

@Service
public class ImageUploadService {

    // 이미지가 저장될 실제 경로 (본인 컴퓨터 경로로 수정 가능 ㅋ)
    private final String uploadPath = System.getProperty("user.dir") + "/src/main/resources/static/uploads/";

    public String saveFile(MultipartFile file) {
        if (file.isEmpty()) return null;

        // 1. 폴더가 없으면 생성 [cite: 2026-01-07]
        File folder = new File(uploadPath);
        if (!folder.exists()) folder.mkdirs();

        // 2. 파일명 중복 방지를 위해 랜덤 ID 생성 (UUID) ㅋ
        String originalName = file.getOriginalFilename();
        String uuid = UUID.randomUUID().toString();
        String extension = originalName.substring(originalName.lastIndexOf("."));
        String savedName = uuid + extension;

        // 3. 파일 저장
        try {
            file.transferTo(new File(uploadPath + savedName));
        } catch (IOException e) {
            throw new RuntimeException("이미지 저장 실패!", e);
        }

        // 4. 리액트에서 접근할 수 있는 URL 경로 반환
        return "/uploads/" + savedName;
    }
}