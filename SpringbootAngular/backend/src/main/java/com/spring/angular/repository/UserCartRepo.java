package com.spring.angular.repository;

import com.spring.angular.dto.OrderDTO;
import com.spring.angular.model.User;

public interface UserCartRepo {

    Long findCartByUserId(Long userId) throws Exception;

    void saveUserCart(User user, Long cartId) throws Exception;

    Long getLastCartId() throws Exception;

    void updateUser(OrderDTO orderDTO) throws Exception;

}
