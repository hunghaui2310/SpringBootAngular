package com.spring.angular.repository.impl;

import com.spring.angular.dto.BlogDTO;
import com.spring.angular.repository.BlogCustomRepo;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

public class BlogCustomRepoImpl implements BlogCustomRepo {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Object[]> lstBlog() throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("select b.id, b.title,b.detailContent,b.createDate,b.img,b.numSee from Blog b order by id desc");
        Query query = entityManager.createQuery(stringBuilder.toString());
        return query.getResultList();
    }

    @Transactional
    @Override
    public void updateNumSee(BlogDTO blogDTO) throws Exception {
        StringBuilder sql = new StringBuilder();
        sql.append("UPDATE blog SET num_see= :numSee WHERE id= :id");
        Query query = entityManager.createNativeQuery(sql.toString());
        query.setParameter("numSee", blogDTO.getNumSee());
        query.setParameter("id", blogDTO.getId());
        query.executeUpdate();
    }

}
