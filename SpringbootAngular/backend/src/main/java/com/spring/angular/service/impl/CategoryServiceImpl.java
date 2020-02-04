package com.spring.angular.service.impl;

import com.spring.angular.dto.CategoryDTO;
import com.spring.angular.helper.Contains;
import com.spring.angular.helper.DataUtil;
import com.spring.angular.model.Category;
import com.spring.angular.repository.CategoryRepo;
import com.spring.angular.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

    @Autowired
    private CategoryRepo categoryRepo;

    public List<Category> getListCate(){
        return categoryRepo.findAll();
    }

    @Override
    public List<CategoryDTO> getAllCateOrderById() throws Exception {
        List<Category> list = categoryRepo.findAllByOrderByIdDesc();
        List<CategoryDTO> categoryDTOList = new ArrayList<>();
        for(Category category : list) {
            CategoryDTO categoryDTO = new CategoryDTO();
            categoryDTO.setId(category.getId());
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
            categoryDTO.setCreateDate(simpleDateFormat.format(category.getCreateDate()));
            categoryDTO.setNameCate(category.getNameCate());
            categoryDTOList.add(categoryDTO);
        }
        return categoryDTOList;
    }

    @Override
    public String createCategory(CategoryDTO categoryDTO) throws Exception {
        String message;
        if(!DataUtil.isNullOrEmpty(categoryDTO.getNameCate())) {
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String date = simpleDateFormat.format(new Date());
            categoryDTO.setCreateDate(date);
            categoryRepo.createCategory(date, categoryDTO.getNameCate());
            message = Contains.SUCCESS;
        }else {
            message = Contains.ERROR;
        }
        return message;
    }


}
