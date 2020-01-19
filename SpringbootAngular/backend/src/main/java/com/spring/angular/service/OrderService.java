package com.spring.angular.service;

import com.spring.angular.dto.OrderDTO;

public interface OrderService {

    OrderDTO getOderByUser(String orderCode, Long userId) throws Exception;

    String updateOrder(OrderDTO orderDTO) throws Exception;
}
