package com.spring.angular.repository;

import com.spring.angular.dto.WishListDTO;

import java.util.List;

public interface WishListRepoCustom {

    void insertWishList(WishListDTO wishListDTO);

    Long findWishListByUser(Long userId);

    boolean checkDuplicateWishList(WishListDTO wishListDTO) throws Exception;

    List<Object[]> getWishListByUser(WishListDTO wishListDTO) throws Exception;
}
