package com.spring.angular.repository;

import com.spring.angular.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Long>, CommentRepoCustom {

    List<Comment> findAllByProductId(Long productId) throws Exception;
}
