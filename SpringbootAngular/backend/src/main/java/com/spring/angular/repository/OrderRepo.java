package com.spring.angular.repository;

import com.spring.angular.model.Order;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface OrderRepo extends JpaRepository<Order, Long>, OrderRepoCustom {
}
