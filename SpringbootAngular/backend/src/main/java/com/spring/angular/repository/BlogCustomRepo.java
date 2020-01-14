package com.spring.angular.repository;

import com.spring.angular.model.Blog;

import java.util.List;

public interface BlogCustomRepo {

    List<Object[]> lstBlog() throws Exception;

    Blog getBlogDetail(Long blogId) throws Exception;

}
