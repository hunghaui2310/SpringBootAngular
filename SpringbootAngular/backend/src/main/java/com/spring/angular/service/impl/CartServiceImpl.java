package com.spring.angular.service.impl;

import com.spring.angular.dto.CartDTO;
import com.spring.angular.dto.ProductDTO;
import com.spring.angular.helper.Contains;
import com.spring.angular.helper.DataUtil;
import com.spring.angular.repository.CartRepo;
import com.spring.angular.repository.ProductRepo;
import com.spring.angular.service.CartService;
import com.spring.angular.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.math.BigInteger;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private ProductService productService;

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

        List<ProductDTO> productDTOList = productService.getAllProduct();
        String img; Long proIdKey;
        Map<Long, String> mapIdAndUrl = new HashMap<>();
        double subtotal = 0L;
        List<Double> listTotal = new ArrayList<>();

        for(ProductDTO productDTO : productDTOList){
            proIdKey = productDTO.getId();
            img = productDTO.getUrlImage();
            mapIdAndUrl.put(proIdKey, img);
        }
        long count = 0;
        double total;
        List<ProductDTO> lstProductDTO = new ArrayList<>();
        List<Object[]> lstObject = cartRepo.getCartByUser(userId);
        for(Object[] objects: lstObject) {
            Long proIdCast = DataUtil.safeToLong(objects[0]);
            Long numPro = DataUtil.safeToLong(objects[1]);
            Object[] object = productRepo.getProInCart(proIdCast, mapIdAndUrl.get(proIdCast));
            if(!DataUtil.isNullOrEmpty(object)) {
                Long proId = DataUtil.safeToLong(object[0]);
                String proName = DataUtil.safeToString(object[1]);
                int discount = DataUtil.safeToInt(object[2]);
                int price = DataUtil.safeToInt(object[3]);
                double realPrice = DataUtil.safeToDouble(object[4]);
                String urlImg = DataUtil.safeToString(object[5]);

                ProductDTO productDTO = new ProductDTO();
                productDTO.setId(proId);
                productDTO.setProductName(proName);
                productDTO.setPrice(price);
                productDTO.setDiscount(discount);
                if (!DataUtil.isNullOrZero(discount)) {
                    productDTO.setRealPrice(realPrice);
                } else {
                    productDTO.setRealPrice(price);
                }

                productDTO.setUrlImage(urlImg);
                productDTO.setNumProInCart(numPro);
                total = productDTO.getRealPrice() * numPro;
                productDTO.setTotal(total);
                lstProductDTO.add(productDTO);
                listTotal.add(total);
            }
        }
        for(Double dataTotal : listTotal){
            subtotal = subtotal + dataTotal;
        }
        CartDTO cartDTO = new CartDTO();
        cartDTO.setId(count++);
        cartDTO.setProductDTOList(lstProductDTO);
        cartDTO.setUserId(userId);
        cartDTO.setSubtotal(subtotal);
        cartDTO.setNumCart(lstProductDTO.size());
        return cartDTO;
    }

    @Override
    public String removeProFromCart(CartDTO cartDTO) throws Exception {
        String message;
        cartRepo.deleteProInCart(cartDTO);
        message = Contains.SUCCESS;
        return message;
    }
}
