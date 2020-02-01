package com.spring.angular.service;

import com.spring.angular.dto.BlogDTO;
import com.spring.angular.dto.BlogDetailDTO;
import com.spring.angular.model.Blog;

import java.util.List;

public interface BlogService {

    List<BlogDTO> getListBlog() throws Exception;

    BlogDetailDTO lstContentDetail(Long blogId) throws Exception;

    List<BlogDetailDTO> findAllBlogAdmin() throws Exception;
}
