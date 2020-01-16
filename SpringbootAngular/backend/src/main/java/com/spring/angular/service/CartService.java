package com.spring.angular.service;

import com.spring.angular.dto.CartDTO;

import java.math.BigInteger;

public interface CartService {

    String updateNumCart(CartDTO cartDTO) throws Exception;

    CartDTO getCartByUser(Long userId) throws Exception;

    String removeProFromCart(CartDTO cartDTO) throws Exception;
}
