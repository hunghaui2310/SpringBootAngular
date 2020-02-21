package com.spring.angular.repository.impl;

import com.spring.angular.repository.CommentRepoCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.util.List;

public class CommentRepoCustomImpl implements CommentRepoCustom {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Object[]> getCommentAdmin() throws Exception {
        StringBuilder sql = new StringBuilder();
        sql.append("select c.*, u.full_name from `comment` c, `user` u" +
                " where u.id = c.user_id" +
                " order by id desc limit 3");
        Query query = entityManager.createNativeQuery(sql.toString());
        return query.getResultList();
    }

    @Transactional
    @Override
    public void updateComment(String content, Long id) throws Exception {
        StringBuilder sql = new StringBuilder();
        sql.append("update comment set content =:content where id = :id");
        Query query = entityManager.createNativeQuery(sql.toString());
        query.setParameter("content", content);
        query.setParameter("id", id);
        query.executeUpdate();
    }
}
