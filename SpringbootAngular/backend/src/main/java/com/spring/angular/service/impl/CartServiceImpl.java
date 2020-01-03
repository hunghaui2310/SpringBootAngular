package com.spring.angular.service.impl;

import com.spring.angular.dto.CartDTO;
import com.spring.angular.dto.ProductDTO;
import com.spring.angular.helper.Contains;
import com.spring.angular.helper.DataUtil;
import com.spring.angular.repository.CartRepo;
import com.spring.angular.service.CartService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.List;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepo cartRepo;

    @Override
    public BigInteger getNumCart(Long userId) throws Exception {
        BigInteger numCart = cartRepo.getNumCart(userId);
        return numCart;
    }

    @Override
    public String updateNumCart(Long userId, Long productId) throws Exception {
        String message;
        List<Object[]> lstObject = cartRepo.checkDuplicate(userId,productId);
        if(lstObject.size() > 0) {
            message = Contains.DUPLICATE;
        }else {
            BigInteger oldNumCart = cartRepo.getNumCart(userId);
            BigInteger newNumCart = oldNumCart.add(BigInteger.valueOf(1));
            cartRepo.updateNumCart(userId, newNumCart);
            message = Contains.SUCCESS;
        }
        return message;
    }

    @Override
    public CartDTO getCartByUser(Long userId) throws Exception {
        long count = 0;
        List<ProductDTO> lstProductDTO = new ArrayList<>();
        List<Object[]> lstObject = cartRepo.getCartByUser(userId);
        for(Object[] object : lstObject){
            Long proId = DataUtil.safeToLong(object[0]);
            String proName = DataUtil.safeToString(object[1]);
            int price = DataUtil.safeToInt(object[2]);
            Long numLike = DataUtil.safeToLong(object[3]);
            int discount = DataUtil.safeToInt(object[4]);
            String urlImg = DataUtil.safeToString(object[5]);
            String cateName = DataUtil.safeToString(object[6]);

            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(proId);
            productDTO.setProductName(proName);
            productDTO.setPrice(price);
            productDTO.setNumLike(numLike);
            productDTO.setDiscount(discount);
            productDTO.setUrlImage(urlImg);
            productDTO.setCategoryName(cateName);
            lstProductDTO.add(productDTO);
        }
        CartDTO cartDTO = new CartDTO();
        cartDTO.setId(count++);
        cartDTO.setProductDTOList(lstProductDTO);
        cartDTO.setUserId(userId);
        return cartDTO;
    }

    @Override
    public String removeProFromCart(Long userId) throws Exception {
        String message;
        BigInteger oldNumCart = cartRepo.getNumCart(userId);
        BigInteger newNumCart = oldNumCart.subtract(BigInteger.valueOf(1));
        cartRepo.updateNumCart(userId,newNumCart);
        message = Contains.SUCCESS;
        return message;
    }
}
