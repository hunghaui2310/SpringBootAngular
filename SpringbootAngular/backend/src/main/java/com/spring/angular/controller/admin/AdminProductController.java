package com.spring.angular.controller.admin;

import com.spring.angular.dto.ProductDTO;
import com.spring.angular.helper.ApiResponse;
import com.spring.angular.helper.SearchRequest;
import com.spring.angular.model.Product;
import com.spring.angular.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

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
            List<ProductDTO> list = productService.listProductAdmin();
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", list);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }

    @PostMapping("/search")
    public ApiResponse searchProAdmin(@RequestBody SearchRequest searchRequest) throws Exception {
        try {
            List<ProductDTO> list = productService.searchProductAdmin(searchRequest);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", list);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }

    @PostMapping("/delete")
    public ApiResponse deleteProduct(@RequestBody ProductDTO productDTO) throws Exception{
        try {
            Long id = productDTO.getId();
            String message = productService.deleteProduct(id);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", message);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }
}
