package com.spring.angular.controller;

import com.spring.angular.dto.WishListDTO;
import com.spring.angular.helper.ApiResponse;
import com.spring.angular.service.WishListService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("wish-list")
public class WishListController {

    @Autowired
    private WishListService wishListService;

    @PostMapping("/add")
    public ApiResponse insertWishList(@RequestBody WishListDTO wishListDTO) throws Exception{
        try {
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", wishListService.insertWishList(wishListDTO));
        }catch (Exception e){
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }

    @PostMapping("/show")
    public ApiResponse getWishListByUser(@RequestBody WishListDTO wishListDTO) throws Exception {
        try {
            WishListDTO wishListDTOS = wishListService.showAllWishList(wishListDTO);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", wishListDTOS);
        } catch (Exception e){
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }

    @PostMapping("/delete")
    public ApiResponse deleteProWishList(@RequestBody WishListDTO wishListDTO) throws Exception {
        try {
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", wishListService.deleteProWishList(wishListDTO));
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }
}
