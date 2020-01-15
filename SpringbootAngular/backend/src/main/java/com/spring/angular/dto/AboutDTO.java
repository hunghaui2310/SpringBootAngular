package com.spring.angular.dto;

public class AboutDTO {

    private Long totalNumLike;
    private Long totalNumBuy;
    private Long totalProduct;
    private Long totalIsNew;

    public Long getTotalNumLike() {
        return totalNumLike;
    }

    public void setTotalNumLike(Long totalNumLike) {
        this.totalNumLike = totalNumLike;
    }

    public Long getTotalNumBuy() {
        return totalNumBuy;
    }

    public void setTotalNumBuy(Long totalNumBuy) {
        this.totalNumBuy = totalNumBuy;
    }

    public Long getTotalProduct() {
        return totalProduct;
    }

    public void setTotalProduct(Long totalProduct) {
        this.totalProduct = totalProduct;
    }

    public Long getTotalIsNew() {
        return totalIsNew;
    }

    public void setTotalIsNew(Long totalIsNew) {
        this.totalIsNew = totalIsNew;
    }
}
