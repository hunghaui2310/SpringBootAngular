package com.spring.angular.controller;

import com.spring.angular.dto.AboutDTO;
import com.spring.angular.helper.ApiResponse;
import com.spring.angular.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("about")
public class AboutController {

    @Autowired
    private ProductService productService;

    @GetMapping("/show-about")
    public ApiResponse getPageAbout() throws Exception{
        try {
            AboutDTO aboutDTO = productService.getAboutDTO();
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", aboutDTO);
        }catch (Exception e){
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }
}
