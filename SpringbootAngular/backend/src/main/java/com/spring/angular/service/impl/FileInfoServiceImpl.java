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
    public List<FileInfo> getListByProId(Long productId) throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("select f from FileInfo f where productId = :productId");
        Query query = entityManager.createQuery(stringBuilder.toString());
        query.setParameter("productId", productId);
        return query.getResultList();
    }
}
