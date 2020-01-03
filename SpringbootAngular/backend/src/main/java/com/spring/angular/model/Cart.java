package com.spring.angular.model;

import javax.persistence.*;

@Entity
@Table(name = "cart")
public class Cart {

    private Long id;
    private Long cartNum;

    @Id
    @GeneratedValue
    @Column(name = "id", nullable = false)
    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    @Column(name = "cart_num")
    public Long getCartNum() {
        return cartNum;
    }

    public void setCartNum(Long cartNum) {
        this.cartNum = cartNum;
    }
}
