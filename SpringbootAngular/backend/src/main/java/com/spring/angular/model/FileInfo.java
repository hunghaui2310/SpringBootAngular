package com.spring.angular.model;

import javax.persistence.*;

@Entity
@Table(name ="file_info")
public class FileInfo {

    private Long id;
    private String url;
    private Long fileTypeId;
    private Long productId;

    @Id
    @GeneratedValue
    @Column(name ="file_id", nullable = false)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "url")
    public String getUrl() {
        return url;
    }

    public void setUrl(String url) {
        this.url = url;
    }

    @Column(name = "file_type_id")
    public Long getFileTypeId() {
        return fileTypeId;
    }

    public void setFileTypeId(Long fileTypeId) {
        this.fileTypeId = fileTypeId;
    }

    @Column(name = "product_id", nullable = false)
    public Long getProductId() {
        return productId;
    }

    public void setProductId(Long productId) {
        this.productId = productId;
    }
}
