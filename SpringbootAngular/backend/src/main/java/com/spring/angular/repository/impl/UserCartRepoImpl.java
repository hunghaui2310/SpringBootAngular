package com.spring.angular.repository.impl;

import com.spring.angular.dto.CartDTO;
import com.spring.angular.dto.OrderDTO;
import com.spring.angular.model.User;
import com.spring.angular.repository.UserCartRepo;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.math.BigInteger;

@Repository
public class UserCartRepoImpl implements UserCartRepo {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public Long findCartByUserId(Long userId) throws Exception {
        try {
            StringBuilder sqlBuilder = new StringBuilder();
            sqlBuilder.append("select uc.cart_id from user_cart uc, user u where u.id = uc.user_id" +
                    " and u.id = :userId");
            Query query = entityManager.createNativeQuery(sqlBuilder.toString());
            query.setParameter("userId", userId);
            return null;
        }catch (NoResultException e){
            e.printStackTrace();
            return null;
        }
    }

    @Transactional
    @Override
    public void saveUserCart(User user, Long cartId) throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("insert into user_cart(user_id, cart_id) values (:userId, :cartId)");
        Query query = entityManager.createNativeQuery(stringBuilder.toString());
        query.setParameter("userId", user.getId());
        query.setParameter("cartId", cartId);
        query.executeUpdate();
    }

    @Override
    public Long getLastCartId() throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("select cart_id from user_cart order by id desc limit 1");
        Query query = entityManager.createNativeQuery(stringBuilder.toString());
        BigInteger cartId = (BigInteger) query.getSingleResult();
        return cartId.longValue();
    }

    @Transactional
    @Override
    public void updateUser(OrderDTO orderDTO) throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("update user set full_name = :fullName, address = :address, phone_number = :phoneNumber where id = :userId");
        Query query = entityManager.createNativeQuery(stringBuilder.toString());
        query.setParameter("fullName", orderDTO.getFullName());
        query.setParameter("address", orderDTO.getAddress());
        query.setParameter("phoneNumber", orderDTO.getPhoneNumber());
        query.setParameter("userId", orderDTO.getUserId());
        query.executeUpdate();
    }
}
