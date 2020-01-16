package com.spring.angular.repository.impl;

import com.spring.angular.dto.CartDTO;
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
     * thuc hien cap nhat lai gio hang theo user dang nhap
     *
     * @param cartDTO
     * @throws Exception
     */
    @Transactional
    @Override
    public void updateNumCart(CartDTO cartDTO) {
        StringBuilder sql = new StringBuilder();
        sql.append("update cart_product cp set cp.num_pro = :numPro" +
                " where cp.product_id = :productId" +
                " and cp.cart_id = (select uc.cart_id from user_cart uc where uc.user_id = :userId)");
        Query query = entityManager.createNativeQuery(sql.toString());
        query.setParameter("numPro", cartDTO.getNumCart());
        query.setParameter("productId", cartDTO.getProductId());
        query.setParameter("userId", cartDTO.getUserId());
        query.executeUpdate();
    }

    /**
     * lay du lieu cua product theo user dang nhap
     *
     * @param userId, cartNum
     * @throws Exception
     */
    @Override
    public List<Object[]> getCartByUser(Long userId) throws Exception {
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("select cp.product_id, cp.num_pro from cart_product cp" +
                " where cp.cart_id = (select uc.cart_id from user_cart uc where uc.user_id = :userId)");
        Query query = entityManager.createNativeQuery(sqlBuilder.toString());
        query.setParameter("userId",userId);
        return query.getResultList();
    }

    @Override
    public List<Object[]> checkDuplicate(Long userId, Long productId) throws Exception {
        try {
            StringBuilder sqlBuilder = new StringBuilder();
            sqlBuilder.append("select * from cart_product cp where" +
                    " cp.product_id = :productId" +
                    " and cp.cart_id = (select cart_id from user_cart where user_id = :userId)");
            Query query = entityManager.createNativeQuery(sqlBuilder.toString());
            query.setParameter("userId", userId);
            query.setParameter("productId", productId);
            return query.getResultList();
        }catch (NoResultException e){
            e.printStackTrace();
            return null;
        }
    }

    @Transactional
    @Override
    public void deleteProInCart(CartDTO cartDTO) throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("delete from cart_product cp" +
                " where cp.product_id = :productId" +
                " and cp.cart_id = (select uc.cart_id from user_cart uc where uc.user_id = :userId)");
        Query query = entityManager.createNativeQuery(stringBuilder.toString());
        query.setParameter("productId", cartDTO.getProductId());
        query.setParameter("userId", cartDTO.getUserId());
        query.executeUpdate();
    }

    @Transactional
    @Override
    public void createProInCart(CartDTO cartDTO) throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("insert into cart_product(product_id, cart_id, num_pro) values(:productId, :cartId, :numPro)");
        Query query = entityManager.createNativeQuery(stringBuilder.toString());
        query.setParameter("productId", cartDTO.getProductId());
        query.setParameter("cartId", cartDTO.getId());
        query.setParameter("numPro", cartDTO.getNumCart());
        query.executeUpdate();
    }

    /**
     * lay ra cart cua user dang nhap
     *
     * @param userId
     * @return so luong san pham trong gio hang
     * @throws Exception
     */
    @Override
    public Long getCartIdByUser(Long userId) throws Exception {
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("select cartId from UserCart where userId = :userId");
        Query query = entityManager.createQuery(sqlBuilder.toString());
        query.setParameter("userId", userId);
        return (Long) query.getSingleResult();
    }

}
