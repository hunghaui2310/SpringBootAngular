package com.spring.angular.dto;

public class BlogDTO {

    private Long id;
    private String title;
    private String content;
    private String createDate;
    private String img;
    private int numSee;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getTitle() {
        return title;
    }

    public void setTitle(String title) {
        this.title = title;
    }

    public String getContent() {
        return content;
    }

    public void setContent(String content) {
        this.content = content;
    }

    public String getCreateDate() {
        return createDate;
    }

    public void setCreateDate(String createDate) {
        this.createDate = createDate;
    }

    public String getImg() {
        return img;
    }

    public void setImg(String img) {
        this.img = img;
    }

    public int getNumSee() {
        return numSee;
    }

    public void setNumSee(int numSee) {
        this.numSee = numSee;
    }
}
