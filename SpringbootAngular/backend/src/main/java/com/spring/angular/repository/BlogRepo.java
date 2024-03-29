package com.spring.angular.repository;

import com.spring.angular.model.Blog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface BlogRepo extends JpaRepository<Blog, Long>, BlogCustomRepo {

    List<Blog> findAllByOrderByIdDesc();
}
