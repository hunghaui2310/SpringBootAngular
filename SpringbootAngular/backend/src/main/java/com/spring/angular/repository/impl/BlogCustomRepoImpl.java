package com.spring.angular.repository.impl;

import com.spring.angular.repository.BlogCustomRepo;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.List;

public class BlogCustomRepoImpl implements BlogCustomRepo {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Object[]> lstBlog() throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("select b.id, b.title,b.content,b.createDate,b.img,b.numSee from Blog b");
        Query query = entityManager.createQuery(stringBuilder.toString());
        return query.getResultList();
    }

    @Override
    public Object[] getBlogDetail(Long blogId) throws Exception {
        try {
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("select b from Blog b where b.id = :blogId");
            Query query = entityManager.createQuery(stringBuilder.toString());
            query.setParameter("blogId", blogId);
            return (Object[]) query.getSingleResult();
        }catch (NoResultException e){
            e.printStackTrace();
            return null;
        }
    }


}
