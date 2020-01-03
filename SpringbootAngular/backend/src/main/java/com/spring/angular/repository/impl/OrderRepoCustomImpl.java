package com.spring.angular.repository.impl;

import com.spring.angular.dto.OrderDTO;
import com.spring.angular.repository.OrderRepoCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

public class OrderRepoCustomImpl implements OrderRepoCustom {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Object[]> getListOrder(Long userId) {
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("select p.product_id, p.num_like,p.price,p.product_name,p.des,p.discount,c.category_name, f.url,o.order_code" +
                " from product p, `order` o, category c, user u, user_order uo, file_info f, order_product op" +
                " where p.category_id = c.category_id" +
                " and o.id = uo.order_id" +
                " and f.product_id = p.product_id" +
                " and u.id = uo.user_id" +
                " and op.product_id = p.product_id" +
                " and op.order_id = o.id" +
                " and u.id = :userId");
        Query query = entityManager.createNativeQuery(sqlBuilder.toString());
        query.setParameter("userId",userId);
        return query.getResultList();
    }
}
