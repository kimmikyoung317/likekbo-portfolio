package com.example.LikeKBO.controller;

import com.example.LikeKBO.entity.Board;
import com.example.LikeKBO.repository.BoardRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/board")
public class BoardController {
    @Autowired private BoardRepository boardRepository;

    // 1. 등록 (게시글/댓글/대댓글 공통 - parentId 유무로 결정)
    @PostMapping("/write")
    public Board write(@RequestBody Board board) {
        return boardRepository.save(board);
    }

    // 2. 게시글 수정 (원글만 허용, parentId가 null인 경우만)
    @PutMapping("/update/{id}")
    public Board update(@PathVariable Long id, @RequestBody Board newData) {
        Board post = boardRepository.findById(id).orElseThrow();
        if (post.getParentId() != null) throw new RuntimeException("댓글은 수정할 수 없습니다.");
        post.setTitle(newData.getTitle());
        post.setContent(newData.getContent());
        return boardRepository.save(post);
    }

    // 3. 게시글 삭제 (원글만 허용)
    @DeleteMapping("/delete/{id}")
    public void delete(@PathVariable Long id) {
        Board post = boardRepository.findById(id).orElseThrow();
        if (post.getParentId() != null) throw new RuntimeException("댓글은 삭제할 수 없습니다.");
        boardRepository.deleteById(id);
    }


    @GetMapping("/all")
    public List<Board> getAllPosts(){
        return boardRepository.findAll();
    }
}