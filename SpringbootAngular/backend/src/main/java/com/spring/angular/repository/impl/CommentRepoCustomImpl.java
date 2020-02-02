package com.spring.angular.repository.impl;

import com.spring.angular.model.Comment;
import com.spring.angular.repository.CommentRepoCustom;

import javax.persistence.EntityManager;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
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
}
