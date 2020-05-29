package com.spring.angular.service;

import com.spring.angular.dto.OrderDTO;
import com.spring.angular.model.Order;

import java.util.List;

public interface OrderService {

    OrderDTO getOderByCode(String orderCode) throws Exception;

    String updateOrder(OrderDTO orderDTO) throws Exception;

//    OrderDTO accessOrderByUser(OrderDTO orderDTO) throws Exception;

    String saveOrder(OrderDTO orderDTO) throws Exception;

    List<OrderDTO> getAllOrder(Long userId) throws Exception;

    String deleteOrder(String orderCode) throws Exception;
}
