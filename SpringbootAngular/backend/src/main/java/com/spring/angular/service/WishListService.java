package com.spring.angular.service;

import com.spring.angular.dto.WishListDTO;

public interface WishListService {

    String insertWishList(WishListDTO wishListDTO) throws Exception;

    WishListDTO showAllWishList(WishListDTO wishListDTO) throws Exception;

    String deleteProWishList(WishListDTO wishListDTO) throws Exception;
}
