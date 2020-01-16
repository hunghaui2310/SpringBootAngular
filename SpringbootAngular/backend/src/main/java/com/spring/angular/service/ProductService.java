package com.spring.angular.service;

import com.spring.angular.dto.AboutDTO;
import com.spring.angular.dto.CartDTO;
import com.spring.angular.dto.ProductDTO;
import com.spring.angular.dto.ProductDetailDTO;
import com.spring.angular.helper.SearchRequest;
import com.spring.angular.model.Product;

import java.math.BigInteger;
import java.util.List;

public interface ProductService {

    List<ProductDTO> getAllProduct() throws Exception;

    List<ProductDTO> searchProduct(SearchRequest searchRequest) throws Exception;

    ProductDetailDTO getProductById(Long productId) throws Exception;

    List<String> getImageByProId(Long id);

    AboutDTO getAboutDTO() throws Exception;

    CartDTO lstSamePro(Long categoryId) throws Exception;

}
