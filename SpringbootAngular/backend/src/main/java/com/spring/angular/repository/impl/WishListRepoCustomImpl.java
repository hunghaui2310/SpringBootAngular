package com.spring.angular.repository.impl;

import com.spring.angular.dto.WishListDTO;
import com.spring.angular.repository.WishListRepoCustom;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.math.BigInteger;
import java.util.List;

@Repository
public class WishListRepoCustomImpl implements WishListRepoCustom {

    @PersistenceContext
    EntityManager entityManager;

    @Transactional
    @Override
    public void insertWishList(WishListDTO wishListDTO) {
        StringBuilder sql = new StringBuilder();
        sql.append("insert into wishlist_product(wishlist_id, product_id) values (:wishListId, :productId)");
        Query query = entityManager.createNativeQuery(sql.toString());
        query.setParameter("wishListId", wishListDTO.getWishListId());
        query.setParameter("productId", wishListDTO.getProductId());
        query.executeUpdate();
    }

    @Override
    public Long findWishListByUser(Long userId) {
        StringBuilder sql = new StringBuilder();
        sql.append("select wishlist_id from user_wishlist where user_id = :userId");
        Query query = entityManager.createNativeQuery(sql.toString());
        query.setParameter("userId", userId);
        BigInteger wishListId = (BigInteger) query.getSingleResult();
        return wishListId.longValue();
    }

    @Override
    public boolean checkDuplicateWishList(WishListDTO wishListDTO) throws Exception {
        StringBuilder sql = new StringBuilder();
        sql.append("select * from wishlist_product where product_id = :productId");
        Query query = entityManager.createNativeQuery(sql.toString());
        query.setParameter("productId", wishListDTO.getProductId());
        List<Object[]> list = query.getResultList();
        if(list.size() > 0) {
            return true;
        } else
        return false;
    }

    @Override
    public List<Object[]> getWishListByUser(WishListDTO wishListDTO) throws Exception {
        StringBuilder sql = new StringBuilder();
        sql.append("select * from wishlist_product where wishlist_id = :wishListId order by id desc");
        Query query = entityManager.createNativeQuery(sql.toString());
        query.setParameter("wishListId", wishListDTO.getWishListId());
        return query.getResultList();
    }

    @Transactional
    @Override
    public void deleteProWishList(WishListDTO wishListDTO) throws Exception {
        StringBuilder sql = new StringBuilder();
        sql.append("delete from wishlist_product where wishlist_id = :wishListId and product_id = :productId");
        Query query = entityManager.createNativeQuery(sql.toString());
        query.setParameter("wishListId", wishListDTO.getWishListId());
        query.setParameter("productId", wishListDTO.getProductId());
        query.executeUpdate();
    }
}
