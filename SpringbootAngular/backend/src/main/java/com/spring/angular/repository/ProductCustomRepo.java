package com.spring.angular.repository;

import com.spring.angular.dto.ProductDTO;
import com.spring.angular.helper.SearchRequest;

import java.util.List;

public interface ProductCustomRepo {

    List<Object[]> getProduct() throws Exception;

    List<Object[]> searchProduct(SearchRequest searchRequest) throws Exception;

    Object[] getProductById(Long productId);

    Object[] getProInCart(Long productId) throws Exception;

    List<Object[]> getListAbout() throws Exception;

    Long totalProduct(boolean isNew) throws Exception;

    List<Object[]> getListSamePro(Long categoryId, long numLimit) throws Exception;

    Object[] findProById(Long productId) throws Exception;

    String getCodeDiscount(String codeDiscount) throws Exception;

    void updateProduct(ProductDTO productDTO) throws Exception;

    List<Object[]> searchProAdmin(SearchRequest searchRequest) throws Exception;
}
