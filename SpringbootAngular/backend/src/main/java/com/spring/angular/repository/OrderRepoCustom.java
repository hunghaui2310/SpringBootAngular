package com.spring.angular.repository;

import com.spring.angular.dto.OrderDTO;
import com.spring.angular.model.Order;

import java.util.List;

public interface OrderRepoCustom {

    void createOrder(OrderDTO orderDTO) throws Exception;

    Object[] getOrder(String orderCode) throws Exception;

    boolean checkExistOrder(String orderCode) throws Exception;

    void updateOrder(OrderDTO orderDTO) throws Exception;
}
