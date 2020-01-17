package com.spring.angular.dto;

import java.util.List;

public class CompareDTO {

    private Long id;
    private List<ProductDTO> list;

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
}
