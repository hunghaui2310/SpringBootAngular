package com.spring.angular.dto;

import java.util.List;

public class CompareDTO {

    private Long id;
    private List<ProductDTO> list;
    private Long userId;
    private Long productId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public List<ProductDTO> getList() {
        return list;
    }

    public void setList(List<ProductDTO> list) {
        this.list = list;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}
