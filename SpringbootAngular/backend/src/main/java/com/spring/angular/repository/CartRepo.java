package com.spring.angular.repository;

import com.spring.angular.dto.CartDTO;

import java.math.BigInteger;
import java.util.List;

public interface CartRepo {

    void updateNumCart(CartDTO cartDTO) throws Exception;

    List<Object[]> getCartByUser(Long userId) throws Exception;

    List<Object[]> checkDuplicate(Long userId, Long productId) throws Exception;

    void deleteProInCart(CartDTO cartDTO) throws Exception;

    void createProInCart(CartDTO cartDTO) throws Exception;

    Long getCartIdByUser(Long userId) throws Exception;
}
