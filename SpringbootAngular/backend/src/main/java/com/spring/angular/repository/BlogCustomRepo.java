package com.spring.angular.repository;

import com.spring.angular.dto.BlogDTO;
import com.spring.angular.model.Blog;

import java.util.List;

public interface BlogCustomRepo {

    List<Object[]> lstBlog() throws Exception;

    void updateNumSee(BlogDTO blogDTO) throws Exception;

}
