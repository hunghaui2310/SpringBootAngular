package com.spring.angular.dto;

import java.util.List;

public class CartDTO {

    private Long id;
    private Long userId;
    private long numCart;
    private long numLimit;
    private Long productId;
    private double subtotal;
    private boolean click;
    private List<ProductDTO> productDTOList;
    private String loadData;

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

    public boolean isClick() {
        return click;
    }

    public void setClick(boolean click) {
        this.click = click;
    }

    public String getLoadData() {
        return loadData;
    }

    public void setLoadData(String loadData) {
        this.loadData = loadData;
    }
}
