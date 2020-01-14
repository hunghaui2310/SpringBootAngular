package com.spring.angular.repository;

import java.math.BigInteger;
import java.util.List;

public interface CartRepo {

    BigInteger getNumCart(Long userId) throws Exception;

    void updateNumCart(Long userId, BigInteger cartNum) throws Exception;

    List<Object[]> getCartByUser(Long userId) throws Exception;

    List<Object[]> checkDuplicate(Long userId, Long productId) throws Exception;
}
