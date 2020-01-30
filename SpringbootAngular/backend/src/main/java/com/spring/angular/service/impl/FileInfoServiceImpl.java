package com.spring.angular.service.impl;

import com.spring.angular.model.FileInfo;
import com.spring.angular.service.FileInfoService;
import org.springframework.stereotype.Service;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

@Service
public class FileInfoServiceImpl implements FileInfoService {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Object[]> getListByProId(Long productId) throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("select f.url, p.category_id from file_info f, product p" +
                " where f.file_type_id = 2 and p.product_id = f.product_id" +
                " and f.product_id = :productId");
        Query query = entityManager.createNativeQuery(stringBuilder.toString());
        query.setParameter("productId", productId);
        return query.getResultList();
    }
}
