package com.spring.angular.repository;

import com.spring.angular.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long>, OrderRepoCustom {

    Order findOrdersByOrderCode(String orderCode);

    List<Order> findAllByUserId(Long userId);
}
