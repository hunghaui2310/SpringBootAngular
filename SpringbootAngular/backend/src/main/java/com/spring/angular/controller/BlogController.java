package com.spring.angular.controller;

import com.spring.angular.helper.ApiResponse;
import com.spring.angular.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("blog")
public class BlogController {

    @Autowired
    private BlogService blogService;

    @GetMapping("/getBlog")
    public ApiResponse getAllBlog() throws Exception{
        try {
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", blogService.getListBlog());
        }catch (Exception e){
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }
}
