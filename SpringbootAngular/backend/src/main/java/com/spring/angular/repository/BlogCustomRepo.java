package com.spring.angular.repository;

import java.util.List;

public interface BlogCustomRepo {

    List<Object[]> lstBlog() throws Exception;

    Object[] getBlogDetail(Long blogId) throws Exception;

}
