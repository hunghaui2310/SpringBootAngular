package com.spring.angular.repository;

import com.spring.angular.dto.OrderDTO;

import java.util.List;

public interface OrderRepoCustom {

    List<Object[]> getListOrder(Long userId);
}
