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
        query.executeUpdate();
        Query query1 = entityManager.createNativeQuery("SELECT LAST_INSERT_ID()");
        BigInteger bigInteger = (BigInteger) query1.getSingleResult();
        return bigInteger;
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

    @Transactional
    @Override
    public void updateOrder(OrderDTO orderDTO) throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("update `order` set status = :status where order_code = :orderCode");
        Query query = entityManager.createNativeQuery(stringBuilder.toString());
        query.setParameter("status", orderDTO.getStatus());
        query.setParameter("orderCode", orderDTO.getOrderCode());
        query.executeUpdate();
    }

    @Transactional
    @Override
    public void saveOrder(Order order) throws Exception {
        StringBuilder sql = new StringBuilder();
        if (order.getUserId() != null) {
            sql.append("INSERT INTO `order` (user_id, address, create_date, email, name_order, note, order_code, payment, phone_number, status) VALUES " +
                    "(:userId ,:address, :createDate, :email, :nameOrder, :note, :orderCode, :payment, :phoneNumber, :status)");
            Query query = entityManager.createNativeQuery(sql.toString());
            query.setParameter("userId", order.getUserId());
            query.setParameter("address", order.getAddress());
            query.setParameter("createDate", order.getCreateDate());
            query.setParameter("email", order.getEmail());
            query.setParameter("nameOrder", order.getNameOrder());
            query.setParameter("note", order.getNote());
            query.setParameter("orderCode", order.getOrderCode());
            query.setParameter("payment", order.getPayment());
            query.setParameter("phoneNumber", order.getPhoneNumber());
            query.setParameter("status", order.getStatus());
            query.executeUpdate();
        } else {
            sql.append("INSERT INTO `order` (address, create_date, email, name_order, note, order_code, payment, phone_number, status) VALUES " +
                    "(:address, :createDate, :email, :nameOrder, :note, :orderCode, :payment, :phoneNumber, :status)");
            Query query = entityManager.createNativeQuery(sql.toString());
            query.setParameter("address", order.getAddress());
            query.setParameter("createDate", order.getCreateDate());
            query.setParameter("email", order.getEmail());
            query.setParameter("nameOrder", order.getNameOrder());
            query.setParameter("note", order.getNote());
            query.setParameter("orderCode", order.getOrderCode());
            query.setParameter("payment", order.getPayment());
            query.setParameter("phoneNumber", order.getPhoneNumber());
            query.setParameter("status", order.getStatus());
            query.executeUpdate();
        }
    }

    @Override
    public List<Object[]> getByUser(Long userId) throws Exception {
        StringBuilder sql = new StringBuilder();
        sql.append("select * from `order` where user_id = :userId and `status` = 1");
        Query query = entityManager.createNativeQuery(sql.toString());
        query.setParameter("userId", userId);
        return query.getResultList();
    }

    @Transactional
    @Override
    public void deleteOrder(String orderCode) throws Exception {
        StringBuilder sql = new StringBuilder();
        sql.append("delete from `order` where order_code = :orderCode");
        Query query = entityManager.createNativeQuery(sql.toString());
        query.setParameter("orderCode", orderCode);
        query.executeUpdate();
    }
}
