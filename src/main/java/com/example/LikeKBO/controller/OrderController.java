package com.example.LikeKBO.controller;

import com.example.LikeKBO.service.OrderService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import java.util.Map;

@RestController
@RequestMapping("/api/orders")
@RequiredArgsConstructor
@CrossOrigin(origins = "http://localhost:5173")
public class OrderController {

    private final OrderService orderService;

    //주문생성 API, POST /api/orders
    @PostMapping
    public ResponseEntity<Long> createOrder(@RequestBody Map<String, Object> request){

        //1.프론트에 넘어온 JSON 데이터 추출
        Long productId = Long.valueOf(request.get("productId").toString());
        int quantity = Integer.parseInt(request.get("quantity").toString());

        //추가된 배송정보 추출
        String receiverName =request.get("receiverName").toString();
        String address = request.get("address").toString();
        String phone =  request.get("phone").toString();

        //현재 로그인한 사용자 ID
        //실제로는 시큐리티 세션에서 가져와야 하지만, 일단 1L로 고정
        Long userId = 1L;

        //2.서비스 호출(주문생성 + 재고 차감 트랜잭션 + 배송정보)
        Long orderId = orderService.createOrder(
                userId, productId, quantity, receiverName, address, phone
        );
        return ResponseEntity.ok(orderId);
    }
}
