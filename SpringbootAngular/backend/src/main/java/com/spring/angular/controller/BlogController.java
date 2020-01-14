package com.spring.angular.controller;

import com.spring.angular.dto.BlogDetailDTO;
import com.spring.angular.helper.ApiResponse;
import com.spring.angular.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

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

    @GetMapping("/detail-blog/{id}")
    public ApiResponse getDetailBlog(@PathVariable(value = "id") Long blogId) throws Exception{
        try {
            BlogDetailDTO list= blogService.lstContentDetail(blogId);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", list);
        }catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }
}
