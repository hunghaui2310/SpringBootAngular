package com.spring.angular.repository;

import com.spring.angular.dto.OrderDTO;
import com.spring.angular.model.Order;

import java.math.BigInteger;
import java.util.List;

public interface OrderRepoCustom {

    BigInteger createOrder(OrderDTO orderDTO) throws Exception;

    Object[] getOrder(String orderCode) throws Exception;

    void updateOrder(OrderDTO orderDTO) throws Exception;

    void saveOrder(Order order) throws Exception;

    List<Object[]> getByUser(Long userId) throws Exception;

    void deleteOrder(String order) throws Exception;
}
