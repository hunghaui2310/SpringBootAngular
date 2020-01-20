package com.spring.angular.repository;

import com.spring.angular.dto.OrderDTO;
import com.spring.angular.model.Order;

import java.math.BigInteger;
import java.util.List;

public interface OrderRepoCustom {

    BigInteger createOrder(OrderDTO orderDTO) throws Exception;

    Object[] getOrder(Long id) throws Exception;

    boolean checkExistOrder(Long id) throws Exception;

    void updateOrder(OrderDTO orderDTO) throws Exception;
}
