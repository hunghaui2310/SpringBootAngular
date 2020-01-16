package com.spring.angular.dto;

import java.util.List;

public class CartDTO {

    private Long id;
    private Long userId;
    private long numCart;
    private long numLimit;
    private Long productId;
    private double subtotal;
    private List<ProductDTO> productDTOList;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Long getUserId() {
        return userId;
    }

    public void setUserId(Long userId) {
        this.userId = userId;
    }

    public List<ProductDTO> getProductDTOList() {
        return productDTOList;
    }

    public void setProductDTOList(List<ProductDTO> productDTOList) {
        this.productDTOList = productDTOList;
    }

    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }

    public long getNumCart() {
        return numCart;
    }

    public void setNumCart(long numCart) {
        this.numCart = numCart;
    }

    public double getSubtotal() {
        return subtotal;
    }

    public void setSubtotal(double subtotal) {
        this.subtotal = subtotal;
    }

    public long getNumLimit() {
        return numLimit;
    }

    public void setNumLimit(long numLimit) {
        this.numLimit = numLimit;
    }
}
