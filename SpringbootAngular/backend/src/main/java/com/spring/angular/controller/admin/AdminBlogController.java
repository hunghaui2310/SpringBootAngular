package com.spring.angular.controller.admin;

import com.spring.angular.dto.BlogDetailDTO;
import com.spring.angular.helper.ApiResponse;
import com.spring.angular.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("admin-blog")
public class AdminBlogController {

    @Autowired
    private BlogService blogService;

    @GetMapping("/getBlog")
    public ApiResponse getAllBlogAdmin() throws Exception {
        try {
            List<BlogDetailDTO> list = blogService.findAllBlogAdmin();
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", list);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }
}
