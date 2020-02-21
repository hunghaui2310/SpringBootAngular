package com.spring.angular.service;

import com.spring.angular.dto.CartDTO;

import java.math.BigInteger;
import java.util.List;

public interface CartService {

    String updateCart(CartDTO cartDTO) throws Exception;

    CartDTO getCartByUser(Long userId) throws Exception;

    String removeProFromCart(CartDTO cartDTO) throws Exception;

    String updateNumCart(List<CartDTO> list) throws Exception;

    Long getNumAndUpdate(CartDTO cartDTO) throws Exception;
}
