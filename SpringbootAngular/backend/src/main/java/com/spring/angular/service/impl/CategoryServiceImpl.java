package com.spring.angular.service.impl;

import com.spring.angular.model.Category;
import com.spring.angular.repository.CategoryRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl {

    @Autowired
    private CategoryRepo categoryRepo;

    public List<Category> getListCate(){
        return categoryRepo.findAll();
    }
}
