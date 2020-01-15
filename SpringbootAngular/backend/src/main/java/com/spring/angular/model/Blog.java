package com.spring.angular.model;

import javax.persistence.*;

@Entity
@Table(name = "blog")
public class Blog {

    private Long id;
    private String title;
    private String content;
    private String createDate;
    private String img;
    private int numSee;
    private String detailContent;
    private String imgBanner;

    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "title")
    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    @Column(name = "content")
    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    @Column(name = "create_date")
    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    @Column(name = "img")
    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    @Column(name = "num_see")
    public int getNumSee() {
        return numSee;
    }

    public void setNumSee(int numSee) {
        this.numSee = numSee;
    }

    @Column(name = "detail_content")
    public String getDetailContent() {
        return detailContent;
    }

    public void setDetailContent(String detailContent) {
        this.detailContent = detailContent;
    }

    @Column(name = "img_banner")
    public String getImgBanner() {
        return imgBanner;
    }

    public void setImgBanner(String imgBanner) {
        this.imgBanner = imgBanner;
    }
}
