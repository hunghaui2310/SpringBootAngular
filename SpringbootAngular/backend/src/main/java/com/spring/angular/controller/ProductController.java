package com.spring.angular.controller;

import com.spring.angular.dto.ProductDTO;
import com.spring.angular.helper.ApiResponse;
import com.spring.angular.helper.Contains;
import com.spring.angular.helper.SearchRequest;
import com.spring.angular.service.ProductService;
import com.spring.angular.service.impl.CategoryServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/getProduct")
    public ApiResponse getAllProduct(){
        try {
            String condition = null;
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", productService.getAllProduct(condition));
        }catch (Exception e){
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, "ERROR!", null);
        }
    }

    @PostMapping("/search")
    public ApiResponse searchProduct(@RequestBody SearchRequest searchRequest) {
        try {
            List<ProductDTO> list = productService.searchProductByName(searchRequest);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", list);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, Contains.ERROR, null);
        }
    }

    @GetMapping("/detail/{id}")
    public ApiResponse getProductDetail(@PathVariable(value = "id") Long productId){
        ApiResponse apiResponse = null;
        try{
            ProductDTO productDTO = productService.getProductById(productId);
            if(productDTO != null)
                return apiResponse.build(HttpServletResponse.SC_OK, true, "", productDTO);
        }catch (Exception e){
            e.printStackTrace();
            return apiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, Contains.ERROR, null);
        }
        return apiResponse;
    }

    @GetMapping("/image/{id}")
    public ApiResponse getImageByProId(@PathVariable(value = "id") Long id){
        try{
            List<String> getImg = productService.getImageByProId(id);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", getImg);
        }catch (Exception e){
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, Contains.ERROR, null);
        }
    }


    @GetMapping("/bestSale")
    public ApiResponse getProByNumLike(){
        try {
            List<ProductDTO> lstData = productService.getAllProduct(Contains.NUM_LIKE);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", lstData);
        }catch (Exception e){
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, Contains.ERROR, null);
        }
    }

    @GetMapping("/productNew")
    public ApiResponse getNewPro() {
        try {
            List<ProductDTO> list = productService.getAllProduct(Contains.CREATE_DATE);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", list);
        }catch (Exception e){
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }
}
