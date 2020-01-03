package com.spring.angular.repository;

import com.spring.angular.dto.ProductDTO;
import com.spring.angular.helper.SearchRequest;
import com.spring.angular.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ProductRepo{

    List<Object[]> getProduct(String condition);

    List<Object[]> searchProduct(SearchRequest searchRequest);

    Object[] getProductById(Long productId);

    List<String> lstImageProduct(Long productId);

    List<Object[]> getProOrderByNumLike();
}
