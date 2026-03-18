package com.example.LikeKBO;

import com.example.LikeKBO.entity.Product;
import com.example.LikeKBO.repository.ProductRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.boot.context.event.ApplicationReadyEvent;
import org.springframework.context.event.EventListener;
import org.springframework.stereotype.Component;

@Component
@RequiredArgsConstructor
public class DataInit {

    private final ProductRepository productRepository;

    @EventListener(ApplicationReadyEvent.class)
    @Transactional
    public void initData() {

        if(productRepository.count() > 0) {
            System.out.println("기존 데이터가 존재하여 초기화를 하지 않습니다");
            return;
        }

//        productRepository.save(new Product("KIA 타이거즈 모자", Product.TeamName.KIA, 59000, 100, "kia_url"));
//        productRepository.save(new Product("삼성 라이온즈 모자", Product.TeamName.SAMSUNG, 59000, 100, "samsung_url"));
//        productRepository.save(new Product("LG 트윈스 모자", Product.TeamName.LG, 59000, 100, "lg_url"));
//        productRepository.save(new Product("두산 베어스 모자", Product.TeamName.DOOSAN, 59000, 100, "doosan_url"));
//        productRepository.save(new Product("SSG 랜더스 모자", Product.TeamName.SSG, 59000, 100, "ssg_url"));
//        productRepository.save(new Product("롯데 자이언츠 모자", Product.TeamName.LOTTE, 59000, 100, "lotte_url"));
//        productRepository.save(new Product("NC 다이노스 모자", Product.TeamName.NC, 59000, 100, "nc_url"));
//        productRepository.save(new Product("KT 위즈 모자", Product.TeamName.KT, 59000, 100, "kt_url"));
//        productRepository.save(new Product("한화 이글스 모자", Product.TeamName.HANWHA, 59000, 100, "hanwha_url"));
//        productRepository.save(new Product("키움 히어로즈 모자", Product.TeamName.KIWOOM, 59000, 100, "kiwoom_url"));

        System.out.println("test product finish");

    }
}

