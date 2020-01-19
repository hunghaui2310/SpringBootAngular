package com.spring.angular.repository.impl;

import com.spring.angular.dto.OrderDTO;
import com.spring.angular.model.Order;
import com.spring.angular.repository.OrderRepoCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class OrderRepoCustomImpl implements OrderRepoCustom {

    @PersistenceContext
    EntityManager entityManager;

    @Transactional
    @Override
    public void createOrder(OrderDTO orderDTO) throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("insert into `order`(user_id,order_code,create_date,note,city) values" +
                " (:userId,:orderCode,:createDate,:note,:city)");
        Query query = entityManager.createNativeQuery(stringBuilder.toString());
        query.setParameter("userId", orderDTO.getUserId());
        query.setParameter("orderCode", orderDTO.getOrderCode());
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String format = simpleDateFormat.format(new Date());
        query.setParameter("createDate", format);
        query.setParameter("note", orderDTO.getNotes());
        query.setParameter("city", orderDTO.getCity());
        query.executeUpdate();
    }

    @Override
    public Object[] getOrder(String orderCode) throws Exception {
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("select * from `order` o where o.order_code = :orderCode");
        Query query = entityManager.createNativeQuery(sqlBuilder.toString());
        query.setParameter("orderCode", orderCode);
        List<Object[]> list = query.getResultList();
        if(list.size() > 0){
            return list.get(0);
        } else
        return null;
    }

    @Override
    public boolean checkExistOrder(String orderCode) throws Exception {
        Object[] order = getOrder(orderCode);
        if(order != null){
            return true;
        } else
        return false;
    }

    @Override
    public void updateOrder(OrderDTO orderDTO) throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("update `order` set note = :note, city = :city where order_code = :orderCode");
        Query query = entityManager.createNativeQuery(stringBuilder.toString());
        query.setParameter("note", orderDTO.getNotes());
        query.setParameter("city", orderDTO.getCity());
        query.setParameter("note", orderDTO.getOrderCode());
        query.executeUpdate();
    }
}
