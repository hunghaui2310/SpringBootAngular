package com.spring.angular.controller;

import com.spring.angular.dto.CartDTO;
import com.spring.angular.dto.ProductDTO;
import com.spring.angular.dto.ProductDetailDTO;
import com.spring.angular.helper.ApiResponse;
import com.spring.angular.helper.Contains;
import com.spring.angular.helper.SearchRequest;
import com.spring.angular.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @GetMapping("/getProduct")
    public ApiResponse getAllProduct(){
        try {
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", productService.getAllProduct());
        }catch (Exception e){
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, "ERROR!", null);
        }
    }

    @GetMapping("/getNameProduct")
    public ApiResponse getAllNameProduct() {
        try{
            List<ProductDTO> productDTOS = productService.getAllProduct();
            List<String> productNames = new ArrayList<>();
            for (ProductDTO productDTO : productDTOS) {
                productNames.add(productDTO.getProductName());
            }
            return ApiResponse.build(HttpServletResponse.SC_OK, true, null, productNames);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }

    @PostMapping("/search")
    public ApiResponse searchProduct(@RequestBody SearchRequest searchRequest) {
        try {
            List<ProductDTO> list = productService.searchProduct(searchRequest);
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
            ProductDetailDTO productDetailDTO = productService.getProductById(productId);
            if(productDetailDTO != null)
                return apiResponse.build(HttpServletResponse.SC_OK, true, "", productDetailDTO);
        }catch (Exception e){
            e.printStackTrace();
            return apiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, Contains.ERROR, null);
        }
        return apiResponse;
    }

    @PostMapping("/detailById")
    public ApiResponse getProById(@RequestBody ProductDTO productDTO) throws Exception {
        try {
            ProductDetailDTO productDetailDTO = productService.getProductById(productDTO.getId());
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", productDetailDTO);
        }catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }

    /**
     * lay ra san pham cung the loai trong chi tiet san pham
     *
     * @param categoryId
     * @throws Exception
     */
    @GetMapping("/sameProduct/{cateId}")
    public ApiResponse getSameProduct(@PathVariable(value = "cateId") Long categoryId){
        try {
            CartDTO cartDTO = productService.lstSamePro(categoryId);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", cartDTO);
        }catch (Exception e){
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }

    @PostMapping("/quick-view")
    public ApiResponse postProductDetail(@RequestBody ProductDetailDTO productDetailDTO){
        ApiResponse apiResponse = null;
        try{
            Long productId = productDetailDTO.getId();
            ProductDetailDTO productDetailDTO1 = productService.getProductById(productId);
            if(productDetailDTO != null)
                return apiResponse.build(HttpServletResponse.SC_OK, true, "", productDetailDTO1);
        }catch (Exception e){
            e.printStackTrace();
            return apiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, Contains.ERROR, null);
        }
        return apiResponse;
    }

    @PostMapping("/buy-now")
    public ApiResponse buyNow(@RequestBody ProductDTO productDTO) {
        try {
            ProductDetailDTO productDetailDTO = productService.buyNow(productDTO.getId());
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", productDetailDTO);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }

}
