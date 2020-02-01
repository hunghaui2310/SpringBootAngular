package com.spring.angular.controller.admin;

import com.spring.angular.dto.CategoryDTO;
import com.spring.angular.helper.ApiResponse;
import com.spring.angular.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("admin-category")
public class AdminCategoryController {

    @Autowired
    private CategoryService categoryService;

    @GetMapping("/getCategory")
    public ApiResponse getAllCateAdmin() throws Exception {
        try {
            List<CategoryDTO> list = categoryService.getAllCateOrderById();
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", list);
        }catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }
}
