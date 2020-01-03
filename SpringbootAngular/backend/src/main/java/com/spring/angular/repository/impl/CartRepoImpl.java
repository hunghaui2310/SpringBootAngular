package com.spring.angular.repository.impl;

import com.spring.angular.repository.CartRepo;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.math.BigInteger;
import java.util.List;

@Repository
public class CartRepoImpl implements CartRepo {

    @PersistenceContext
    EntityManager entityManager;

    /**
     * lay ra so luong san pham cua user dang nhap trong gio hang
     *
     * @param userId
     * @return so luong san pham trong gio hang
     * @throws Exception
     */
    @Override
    public BigInteger getNumCart(Long userId){
        try {
            StringBuilder sqlBuilder = new StringBuilder();
            sqlBuilder.append("SELECT c.cart_num from cart c, user_cart uc, user u" +
                    " WHERE u.id = uc.user_id" +
                    " AND c.id = uc.cart_id" +
                    " AND u.id = :userId");
            Query query = entityManager.createNativeQuery(sqlBuilder.toString());
            query.setParameter("userId",userId);
            return (BigInteger) query.getSingleResult();
        }catch (NoResultException e){
            e.printStackTrace();
            return null;
        }
    }

    /**
     * thuc hien cap nhat lai gio hang theo user dang nhap
     *
     * @param userId, cartNum
     * @throws Exception
     */
    @Transactional
    @Override
    public void updateNumCart(Long userId, BigInteger cartNum) {
        StringBuilder sql = new StringBuilder();
        sql.append("update cart c set c.cart_num = :cartNum " +
                "where c.id = (select uc.cart_id from user_cart uc,user u where u.id = uc.user_id and u.id = :userId)");
        Query query = entityManager.createNativeQuery(sql.toString());
        query.setParameter("userId",userId);
        query.setParameter("cartNum",cartNum);
        query.executeUpdate();
    }

    /**
     * lay du lieu cua cart theo user dang nhap
     *
     * @param userId, cartNum
     * @throws Exception
     */
    @Override
    public List<Object[]> getCartByUser(Long userId) throws Exception {
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("select p.product_id,p.product_name,p.price,p.num_like,p.discount,f.url,c.category_name" +
                " from product p, file_info f, category c" +
                " where p.product_id = f.product_id" +
                " and c.category_id = p.category_id" +
                " and p.cart_id = (select uc.cart_id from user_cart uc where uc.user_id = :userId)");
        Query query = entityManager.createNativeQuery(sqlBuilder.toString());
        query.setParameter("userId",userId);
        return query.getResultList();
    }

    @Override
    public List<Object[]> checkDuplicate(Long userId, Long productId) throws Exception {
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("select p.product_id,p.product_name,p.price,p.num_like,p.discount,f.url,c.category_name" +
                " from product p, file_info f, category c" +
                " where p.product_id = f.product_id" +
                " and c.category_id = p.category_id" +
                " and p.cart_id = (select uc.cart_id from user_cart uc where uc.user_id = :userId)" +
                " and p.product_id = :productId");
        Query query = entityManager.createNativeQuery(sqlBuilder.toString());
        query.setParameter("userId",userId);
        query.setParameter("productId",productId);
        return query.getResultList();
    }

}
