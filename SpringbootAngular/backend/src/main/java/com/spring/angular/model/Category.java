package com.spring.angular.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "category")
public class Category {

    private Long id;
    private String nameCate;
    private Date createDate;

    @Id
    @GeneratedValue
    @Column(name = "category_id", nullable = false)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "category_name")
    public String getNameCate() {
        return nameCate;
    }

    public void setNameCate(String nameCate) {
        this.nameCate = nameCate;
    }

    @Column(name = "create_date")
    public Date getCreateDate() {
        return createDate;
    }

    public void setCreateDate(Date createDate) {
        this.createDate = createDate;
    }
}
