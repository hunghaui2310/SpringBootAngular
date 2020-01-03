package com.spring.angular.service;

import com.spring.angular.dto.OrderDTO;

import java.util.List;

public interface OrderService {

    List<OrderDTO> getList(Long userId);
}
