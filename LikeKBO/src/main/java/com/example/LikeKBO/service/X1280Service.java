package com.example.LikeKBO.service;

public interface X1280Service {

    String isAp(String userId);

    String joinAp(String userId);

    String getToken(String userId);

    String getSp(String userId, String clientIp);

    String checkResult(String userId);

    String cancel(String userId, String sessionId);

    String withdrawalAp(String userId);


}
