package com.example.LikeKBO.controller;

import com.example.LikeKBO.dto.request.UserRequest;
import com.example.LikeKBO.service.X1280Service;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/auth") // New clean path for React
@CrossOrigin(origins = "http://localhost:5173") // Add this line
public class X1280Controller {

    private final X1280Service service;

    public X1280Controller(X1280Service service) {
        this.service = service;
    }

    // React calls: GET /api/v1/auth/status?user=...
    @GetMapping("/status")
    public String checkUserStatus(@RequestParam("userId") String userId) {
//        return service.isAp(userId);
        String result = service.isAp(userId);
        System.out.println("/status : "+result);
        return result;
    }

    // React calls: POST /api/v1/auth/register
    @PostMapping("/register")
    public String registerUser(@RequestBody UserRequest user) {
        return service.joinAp(user.getId());
    }

    // React calls: POST /api/v1/auth/login-trigger
    @PostMapping("/login-trigger")
    public String triggerLogin(@RequestParam String userId, @RequestParam String ip) {
        // This handles the internal getToken -> AES -> getSp sequence privately
        return service.getSp(userId, ip);
    }

    // New: Check auth result
    @GetMapping("/result")
    public String checkResult(@RequestParam String userId) {
        return service.checkResult(userId);
    }

    // New: Cancel auth
    @PostMapping("/cancel")
    public String cancel(@RequestParam String userId, @RequestParam String sessionId) {
        return service.cancel(userId, sessionId);
    }

    // New: Withdrawal
    @PostMapping("/withdrawal")
    public String withdrawal(@RequestParam String userId) {
        return service.withdrawalAp(userId);
    }
}
