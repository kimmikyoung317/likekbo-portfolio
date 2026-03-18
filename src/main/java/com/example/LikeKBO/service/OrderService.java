package com.example.LikeKBO.service;


import com.example.LikeKBO.Enum.DeliveryStatus;
import com.example.LikeKBO.entity.Delivery;
import com.example.LikeKBO.entity.Order;
import com.example.LikeKBO.entity.OrderItem;
import com.example.LikeKBO.entity.Product;
import com.example.LikeKBO.repository.OrderRepository;
import com.example.LikeKBO.repository.ProductRepository;
import com.example.LikeKBO.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import com.example.LikeKBO.entity.User;
import org.springframework.stereotype.Service;


@Service
@Transactional//트랜젝션
@RequiredArgsConstructor
public class OrderService {

    private final OrderRepository orderRepository;
    private final ProductRepository productRepository;

    private final UserRepository userRepository;

    public  Long createOrder(Long userId, Long productId, int quantity,String receiverName, String address, String phone){
      //1.상품 및 재고 확인
        User user = userRepository.findById(userId)
                .orElseThrow(() -> new RuntimeException("사용자를 찾을수 없습니다"));

      Product product  = productRepository.findById(productId)
              .orElseThrow(() ->
                      new RuntimeException("상품을 찾을수 없습니다"));

      //2. 배송정보생성
      Delivery delivery = Delivery.builder()
            .receiverName(receiverName)
            .address(address)
            .phone(phone)
            .status(DeliveryStatus.READY)
            .build();




      //3.재고 차감(Product)
        product.removeStock(quantity);

      //4.주문 상세(OrderItem)
        OrderItem orderItem = OrderItem.createOrderItem(product, Math.toIntExact(product.getPrice()), quantity);
      //5.주문(Order) 생성 및 연결  User 정도 등은 생략
        Order order = Order.createOrder(user,delivery, orderItem);

        orderRepository.save(order);

        return order.getId();
    }
}
