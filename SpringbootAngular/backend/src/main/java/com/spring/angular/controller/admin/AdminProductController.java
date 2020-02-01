package com.spring.angular.controller.admin;

import com.spring.angular.dto.ProductDTO;
import com.spring.angular.helper.ApiResponse;
import com.spring.angular.model.Product;
import com.spring.angular.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("admin-product")
public class AdminProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/getProduct")
    public ApiResponse getAllProduct() throws Exception {
        try {
            List<Product> list = productService.listProductAdmin();
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", list);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }
}
