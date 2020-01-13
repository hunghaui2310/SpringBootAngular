package com.spring.angular.controller;

import com.spring.angular.dto.ProductDTO;
import com.spring.angular.helper.ApiResponse;
import com.spring.angular.helper.Contains;
import com.spring.angular.helper.SearchRequest;
import com.spring.angular.model.Category;
import com.spring.angular.service.ProductService;
import com.spring.angular.service.impl.CategoryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("category")
public class CategoryController {

    @Autowired
    private CategoryServiceImpl categoryService;

    @Autowired
    private ProductService productService;

    @GetMapping("/getCategory")
    public ApiResponse getCategory(){
        try {
            List<Category> lstCate = categoryService.getListCate();
            return ApiResponse.build(HttpServletResponse.SC_OK,true, "", lstCate);
        }catch (Exception e){
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, Contains.ERROR, null);
        }
    }

    @GetMapping("/product-category/{id}")
    public ApiResponse getProLivingRoom(@PathVariable(value = "id") Long categoryId) {
        try {
            SearchRequest searchRequest = new SearchRequest();
            searchRequest.setCategoryId(categoryId);
            List<ProductDTO> productDTOList = productService.searchProduct(searchRequest);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", productDTOList);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }

}
