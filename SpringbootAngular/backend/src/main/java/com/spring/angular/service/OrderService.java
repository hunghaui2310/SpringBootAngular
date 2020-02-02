package com.spring.angular.service;

import com.spring.angular.dto.OrderDTO;

public interface OrderService {

    OrderDTO getOderByUser(Long id, Long userId) throws Exception;

    Long updateOrder(OrderDTO orderDTO) throws Exception;

    OrderDTO accessOrderByUser(OrderDTO orderDTO) throws Exception;
}
