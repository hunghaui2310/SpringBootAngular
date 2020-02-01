package com.spring.angular.dto;

import java.util.Comparator;
import java.util.Date;
import java.util.List;

public class ProductDTO {

    private Long id;
    private String productName;
    private int price;
    private Long numLike;
    private int discount;
    private String urlImage;
    private String description;
    private boolean noData;
    private String categoryName;
    private double realPrice;
    private boolean isNew;
    private Long categoryId;
    private Long numProInCart;
    private double total;
    private String codeDiscount;
    private Date createDate;

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

    public Long getNumLike() {
        return numLike;
    }

    public void setNumLike(Long numLike) {
        this.numLike = numLike;
    }

    public String getUrlImage() {
        return urlImage;
    }

    public void setUrlImage(String urlImage) {
        this.urlImage = urlImage;
    }

    public String getDescription() {
        return description;
    }

    public void setDescription(String description) {
        this.description = description;
    }

    public boolean getNoData() {
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

    public int getDiscount() {
        return discount;
    }

    public void setDiscount(int discount) {
        this.discount = discount;
    }

    public double getRealPrice() {
        return realPrice;
    }

    public void setRealPrice(double realPrice) {
        this.realPrice = realPrice;
    }

    public int getPrice() {
        return price;
    }

    public void setPrice(int price) {
        this.price = price;
    }

    public boolean isNew() {
        return isNew;
    }

    public void setNew(boolean aNew) {
        isNew = aNew;
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

    public double getTotal() {
        return total;
    }

    public void setTotal(double total) {
        this.total = total;
    }

    public String getCodeDiscount() {
        return codeDiscount;
    }

    public void setCodeDiscount(String codeDiscount) {
        this.codeDiscount = codeDiscount;
    }

    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}
