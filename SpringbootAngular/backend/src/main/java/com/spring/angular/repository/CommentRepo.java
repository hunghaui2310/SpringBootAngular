package com.spring.angular.repository;

import com.spring.angular.model.Comment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface CommentRepo extends JpaRepository<Comment, Long>, CommentRepoCustom {
}
