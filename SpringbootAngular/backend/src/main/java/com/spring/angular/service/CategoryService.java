package com.spring.angular.service;

import com.spring.angular.dto.CategoryDTO;
import com.spring.angular.model.Category;

import java.util.List;

public interface CategoryService {

    List<Category> getListCate() throws Exception;

    List<CategoryDTO> getAllCateOrderById() throws Exception;
}
