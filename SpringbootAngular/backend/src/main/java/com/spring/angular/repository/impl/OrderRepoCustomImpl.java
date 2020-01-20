package com.spring.angular.repository.impl;

import com.spring.angular.dto.OrderDTO;
import com.spring.angular.model.Order;
import com.spring.angular.repository.OrderRepoCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.List;

public class OrderRepoCustomImpl implements OrderRepoCustom {

    @PersistenceContext
    EntityManager entityManager;

    /**
     * thuc hien them moi sau do lay id ban ghi vua them moi
     *
     * @param orderDTO
     * @return id ban ghi vua them moi
     * @throws Exception
     */
    @Transactional
    @Override
    public BigInteger createOrder(OrderDTO orderDTO) throws Exception {
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
        Query query1 = entityManager.createNativeQuery("SELECT LAST_INSERT_ID()");
        BigInteger bigInteger = (BigInteger) query1.getSingleResult();
        return bigInteger;
    }

    @Override
    public Object[] getOrder(Long id) throws Exception {
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("select * from `order` o where o.id = :id");
        Query query = entityManager.createNativeQuery(sqlBuilder.toString());
        query.setParameter("id", id);
        List<Object[]> list = query.getResultList();
        if(list.size() > 0){
            return list.get(0);
        } else
        return null;
    }

    @Override
    public boolean checkExistOrder(Long id) throws Exception {
        Object[] order = getOrder(id);
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
