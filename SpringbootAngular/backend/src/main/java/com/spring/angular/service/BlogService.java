package com.spring.angular.service;

import com.spring.angular.dto.BlogDTO;
import com.spring.angular.dto.BlogDetailDTO;

import java.util.List;

public interface BlogService {

    List<BlogDTO> getListBlog() throws Exception;

    BlogDetailDTO lstContentDetail(Long blogId) throws Exception;
}
