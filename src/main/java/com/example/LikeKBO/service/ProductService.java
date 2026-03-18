package com.example.LikeKBO.service;

import com.example.LikeKBO.dto.request.ProductCreateRequest;
import com.example.LikeKBO.dto.request.ProductUpdateRequest;
import com.example.LikeKBO.dto.request.StockUpdateRequest;
import com.example.LikeKBO.dto.response.ProductResponse;
import com.example.LikeKBO.entity.Product;
import com.example.LikeKBO.repository.ProductRepository;
import com.example.LikeKBO.repository.OrderItemRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.stream.Collectors;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final OrderItemRepository orderItemRepository;

    /**
     * 상품 등록 (이미지 URL 포함)
     * 파트너님의 정렬 정책(KIA-Lotte-Samsung)을 위해 팀명을 자동 추출합니다.
     */
    @Transactional
    public ProductResponse createProduct(ProductCreateRequest request, String savedUrl) {
        // ⚾️ 안전장치: savedUrl이 null이면 기본 이미지 설정
        String finalImageUrl = (savedUrl != null) ? savedUrl : "/images/default_goods.png";

        // ⚾️ 정렬 정책 준수: team 값이 비어있다면 상품명에서 추출 시도
        String teamName = request.getTeam();
        if (teamName == null || teamName.isEmpty()) {
            String n = request.getName();
            if (n.contains("기아") || n.contains("KIA")) teamName = "KIA";
            else if (n.contains("롯데") || n.contains("Lotte")) teamName = "Lotte";
            else if (n.contains("삼성") || n.contains("Samsung")) teamName = "Samsung";
            else teamName = "기타";
        }

        Product product = Product.builder()
                .name(request.getName())
                .price(request.getPrice())
                .stockQuantity(request.getStockQuantity() != null ? request.getStockQuantity() : 0)
                .team(teamName)
                .imageUrl(finalImageUrl)
                .description(request.getDescription())
                .build();

        Product savedProduct = productRepository.save(product);
        return convertToResponse(savedProduct);
    }

    /**
     * 전체 상품 조회 (리스트 형식)
     */
    public List<ProductResponse> getAllProducts() {
        return productRepository.findAll().stream()
                .map(this::convertToResponse)
                .collect(Collectors.toList());
    }

    /**
     * 단일 상품 상세 조회
     */
    public ProductResponse getProduct(Long id) {
        Product product = findProductById(id);
        return convertToResponse(product);
    }

    /**
     * 페이징 처리된 상품 조회
     */
    public Page<ProductResponse> getProducts(Pageable pageable) {
        return productRepository.findAll(pageable)
                .map(this::convertToResponse);
    }

    /**
     * 상품 정보 수정
     */
    @Transactional
    public ProductResponse updateProduct(Long id, ProductUpdateRequest<Object> request) {
        Product product = findProductById(id);
        product.updateInfo(request.getName(), request.getDescription(), request.getPrice());
        return convertToResponse(product);
    }

    /**
     * 재고 수정
     */
    @Transactional
    public ProductResponse updateStock(Long id, StockUpdateRequest request) {
        Product product = findProductById(id);
        product.updateStock(request.getStockQuantity());
        return convertToResponse(product);
    }

    /**
     * 상품 삭제
     */
    @Transactional
    public void deleteProduct(Long id) {
        Product product = findProductById(id);

        // 주문 이력이 있는 상품은 무결성(FK) 때문에 바로 삭제가 막힐 수 있습니다.
        if (orderItemRepository.existsByProduct_Id(id)) {
            throw new IllegalStateException("주문 이력이 있는 상품은 삭제할 수 없습니다. (관리자: 숨김 처리로 전환 추천)");
        }

        productRepository.delete(product);
    }

    // --- 내부 헬퍼 메서드 ---

    private Product findProductById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("해당 상품이 존재하지 않습니다. ID: " + id));
    }

    private ProductResponse convertToResponse(Product product) {
        return ProductResponse.builder()
                .id(product.getId())
                .name(product.getName())
                .description(product.getDescription())
                .price(product.getPrice())
                .imageUrl(product.getImageUrl())
                .stockQuantity(product.getStockQuantity())
                .team(product.getTeam())
                .build();
    }
}