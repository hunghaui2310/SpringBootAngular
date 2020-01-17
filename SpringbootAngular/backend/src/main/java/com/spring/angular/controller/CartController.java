package com.spring.angular.controller;

import com.spring.angular.dto.CartDTO;
import com.spring.angular.helper.ApiResponse;
import com.spring.angular.helper.Contains;
import com.spring.angular.model.Cart;
import com.spring.angular.model.User;
import com.spring.angular.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.math.BigInteger;
import java.util.List;

@RestController
@RequestMapping("cart")
public class CartController {

    @Autowired
    private CartService cartService;

    /**
     * show du lieu cua cac san pham trong gio hang theo user dang nhap
     *
     * @param cartDTO
     * @throws Exception
     */
    @PostMapping("/show")
    public ApiResponse getCartByUser(@RequestBody CartDTO cartDTO) throws Exception{
        try {
            Long userId = cartDTO.getUserId();
            CartDTO showCart = cartService.getCartByUser(userId);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", showCart);
        }catch (Exception e){
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, Contains.ERROR, null);
        }
    }

    /**
     * api them 1 san pham vao cart theo user dang nhap
     *
     * @param cartDTO
     * @throws Exception
     */
    @PostMapping("/addCart")
    public ApiResponse addToCart(@RequestBody CartDTO cartDTO) throws Exception{
        try {
            String message = cartService.updateCart(cartDTO);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", message);
        }catch (Exception e){
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, Contains.ERROR, null);
        }
    }

    /**
     * api get ra so luong san pham co trong gio hang theo user dang nhap
     *
     * @param user
     * @throws Exception
     */
    @PostMapping("/getNum")
    public ApiResponse getNumCart(@RequestBody User user) throws Exception{
        try{
            Long userId = user.getId();
            CartDTO cartByUser = cartService.getCartByUser(userId);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", cartByUser);
        }catch (Exception e){
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, Contains.ERROR, null);
        }
    }

    /**
     * api xoa han san pham trong cart theo userId va productId
     *
     * @param cartDTO
     * @throws Exception
     */
    @PostMapping("/remove")
    public ApiResponse removeProFromCart(@RequestBody CartDTO cartDTO) throws Exception{
        try {
            String message = cartService.removeProFromCart(cartDTO);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", message);
        }catch (Exception e){
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, Contains.ERROR, null);
        }
    }

    @PostMapping("/updateNumCart")
    public ApiResponse updateNumCart(@RequestBody List<CartDTO> cartDTO) throws Exception{
        try {
            String message = cartService.updateNumCart(cartDTO);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", message);
        }catch (Exception e){
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }
}
