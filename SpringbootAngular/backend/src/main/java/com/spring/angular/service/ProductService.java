package com.spring.angular.service;

import com.spring.angular.dto.ProductDTO;
import com.spring.angular.dto.ProductDetailDTO;
import com.spring.angular.helper.SearchRequest;
import com.spring.angular.model.Product;

import java.math.BigInteger;
import java.util.List;

public interface ProductService {

    List<ProductDTO> getAllProduct(String condition);

    List<ProductDTO> searchProductByName(SearchRequest searchRequest);

    ProductDetailDTO getProductById(Long productId) throws Exception;

    List<String> getImageByProId(Long id);
}
