package com.spring.angular.repository;

import com.spring.angular.model.Comment;

import java.util.List;

public interface CommentRepoCustom {

    List<Object[]> getCommentAdmin() throws Exception;
}
