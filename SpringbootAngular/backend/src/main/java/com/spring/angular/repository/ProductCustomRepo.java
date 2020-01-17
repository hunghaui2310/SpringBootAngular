package com.spring.angular.repository;

import com.spring.angular.dto.ProductDTO;
import com.spring.angular.helper.SearchRequest;
import com.spring.angular.model.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

public interface ProductCustomRepo {

    List<Object[]> getProduct() throws Exception;

    List<Object[]> searchProduct(SearchRequest searchRequest) throws Exception;

    Object[] getProductById(Long productId);

    List<String> lstImageProduct(Long productId);

    Object[] getProInCart(Long productId, String urlImage) throws Exception;

    List<Object[]> getListAbout() throws Exception;

    Long totalProduct(boolean isNew) throws Exception;

    List<Object[]> getListSamePro(Long categoryId, long numLimit) throws Exception;

    Object[] findProById(Long productId) throws Exception;
}
