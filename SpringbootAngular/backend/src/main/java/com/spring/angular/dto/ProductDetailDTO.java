package com.spring.angular.dto;

import java.util.List;

public class ProductDetailDTO {

    private Long id;
    private String productName;
    private int price;
    private Long numLike;
    private int discount;
    private List<String> urlImage;
    private List<String> imageSmall;
    private String description;
    private boolean noData;
    private String categoryName;
    private double realPrice;
    private Long categoryId;
    private Long numProInCart;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getProductName() {
        return productName;
    }

    public void setProductName(String productName) {
        this.productName = productName;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public Long getNumLike() {
        return numLike;
    }

    public void setNumLike(Long numLike) {
        this.numLike = numLike;
    }

    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public List<String> getUrlImage() {
        return urlImage;
    }

    public void setUrlImage(List<String> urlImage) {
        this.urlImage = urlImage;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean isNoData() {
        return noData;
    }

    public void setNoData(boolean noData) {
        this.noData = noData;
    }

    public String getCategoryName() {
        return categoryName;
    }

    public void setCategoryName(String categoryName) {
        this.categoryName = categoryName;
    }

    public double getRealPrice() {
        return realPrice;
    }

    public void setRealPrice(double realPrice) {
        this.realPrice = realPrice;
    }

    public Long getCategoryId() {
        return categoryId;
    }

    public void setCategoryId(Long categoryId) {
        this.categoryId = categoryId;
    }

    public Long getNumProInCart() {
        return numProInCart;
    }

    public void setNumProInCart(Long numProInCart) {
        this.numProInCart = numProInCart;
    }

    public List<String> getImageSmall() {
        return imageSmall;
    }

    public void setImageSmall(List<String> imageSmall) {
        this.imageSmall = imageSmall;
    }
}
