package com.spring.angular.service;

import com.spring.angular.dto.WishListDTO;

import java.util.List;

public interface WishListService {

    String insertWishList(WishListDTO wishListDTO) throws Exception;

    WishListDTO showAllWishList(WishListDTO wishListDTO) throws Exception;
}
