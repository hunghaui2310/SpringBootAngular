package com.spring.angular.repository.impl;

import com.spring.angular.repository.CompareRepo;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.math.BigInteger;
import java.util.List;

@Repository
public class CompareRepoImpl implements CompareRepo {

    @PersistenceContext
    EntityManager entityManager;

    @Transactional
    @Override
    public void deleteAllData(Long userId) throws Exception{
        StringBuilder s =  new StringBuilder();
        s.append("delete from compare_pro where user_id = :userId");
        Query query = entityManager.createNativeQuery(s.toString());
        query.setParameter("userId", userId);
        query.executeUpdate();
    }

    @Override
    public List<BigInteger> getListProductToCompare(Long userId) throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("select product_id from compare_pro where user_id = :userId");
        Query query = entityManager.createNativeQuery(stringBuilder.toString());
        query.setParameter("userId", userId);
        return query.getResultList();
    }

    @Transactional
    @Override
    public void saveCompare(Long productId, Long userId) throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("insert into compare_pro(product_id, user_id) values (:productId, :userId)");
        Query query = entityManager.createNativeQuery(stringBuilder.toString());
        query.setParameter("productId", productId);
        query.setParameter("userId", userId);
        query.executeUpdate();
    }
}
