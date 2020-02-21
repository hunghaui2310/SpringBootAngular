package com.spring.angular.service.impl;

import com.spring.angular.dto.CartDTO;
import com.spring.angular.dto.ProductDTO;
import com.spring.angular.helper.Contains;
import com.spring.angular.helper.DataUtil;
import com.spring.angular.repository.CartRepo;
import com.spring.angular.repository.ProductRepo;
import com.spring.angular.repository.UserCartRepo;
import com.spring.angular.service.CartService;
import com.spring.angular.service.ProductService;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.util.*;

@Service
public class CartServiceImpl implements CartService {

    @Autowired
    private CartRepo cartRepo;

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private ProductService productService;

    @Autowired
    private UserCartRepo userCartRepo;

    /**
     * them moi neu chua co san pham trong gio hang, cap nhat neu da co san pham trong gio hang
     *
     * @param cartDTO
     * @return thong bao
     * @throws Exception
     */
    @Override
    public String updateCart(CartDTO cartDTO) throws Exception {
        String message = null;
        Long cartIdByUser = userCartRepo.findCartByUserId(cartDTO.getUserId());
        List<Object[]> lstObject = cartRepo.checkDuplicate(cartIdByUser, cartDTO.getProductId());
        if (lstObject != null) {
            long cartNum = 0;
            for (Object[] objects : lstObject) {
                cartNum = DataUtil.safeToLong(objects[3]);
            }
            if (lstObject.size() > 0) {
                cartDTO.setNumCart(cartNum + 1);
                Long cartId = userCartRepo.findCartByUserId(cartDTO.getUserId());
                cartDTO.setId(cartId);
                cartRepo.updateNumCart(cartDTO);
                message = Contains.UPDATE;
            } else {
                Long cartId = userCartRepo.findCartByUserId(cartDTO.getUserId());
                cartDTO.setNumCart(1);
                cartDTO.setId(cartId);
                cartRepo.createProInCart(cartDTO);
                message = Contains.CREATE;
            }
        }
        return message;
    }

    @Override
    public CartDTO getCartByUser(Long userId) throws Exception {
        double subtotal = 0L;
        List<Double> listTotal = new ArrayList<>();

        long count = 0;
        double total;
        List<ProductDTO> lstProductDTO = new ArrayList<>();
        Long cartId = userCartRepo.findCartByUserId(userId);
        List<Object[]> lstObject = cartRepo.getCartByUser(cartId);
        for (Object[] objects : lstObject) {
            Long proIdCast = DataUtil.safeToLong(objects[0]);
            Long numPro = DataUtil.safeToLong(objects[1]);
            Object[] object = productRepo.getProInCart(proIdCast);
            if (!DataUtil.isNullOrEmpty(object)) {
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
                Long cateId = DataUtil.safeToLong(object[6]);
                productDTO.setCategoryId(cateId);

                if (!DataUtil.isNullOrEmpty(urlImg)) {
                    Resource resource = new ClassPathResource(Contains.IMAGES_PRODUCT_SMALL_SIZE + cateId + "/" + urlImg);
                    File file = resource.getFile();
                    byte[] fileContent = FileUtils.readFileToByteArray(file);
                    String urlImageProduct = Base64.getEncoder().encodeToString(fileContent);
                    productDTO.setUrlImage(urlImageProduct);
                }
                productDTO.setNumProInCart(numPro);
                total = productDTO.getRealPrice() * numPro;
                productDTO.setTotal(total);
                lstProductDTO.add(productDTO);
                listTotal.add(total);
            }
        }
        for (Double dataTotal : listTotal) {
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

    @Override
    public String updateNumCart(List<CartDTO> list) throws Exception {
        String message;
        for (CartDTO cartDTO : list) {
            Long cartId = userCartRepo.findCartByUserId(cartDTO.getUserId());
            cartDTO.setId(cartId);
            cartRepo.updateNumCart(cartDTO);
        }
        message = Contains.SUCCESS;
        return message;
    }

    @Override
    public Long getNumAndUpdate(CartDTO cartDTO) throws Exception {
        Long cartIdByUser = userCartRepo.findCartByUserId(cartDTO.getUserId());
        List<Object[]> list = cartRepo.getCartByUser(cartDTO.getUserId());
        for (Object[] objects : list) {
            Long numPro = DataUtil.safeToLong(objects[1]);
            cartDTO.setNumCart(numPro);
        }
        cartDTO.setId(cartIdByUser);
        if (!DataUtil.isNullOrEmpty(cartDTO.getLoadData())) {
            if (cartDTO.getLoadData().equals(Contains.LOAD)) {
                if (cartDTO.isClick()) {
                    cartDTO.setNumCart(cartDTO.getNumCart() + 1);
                } else {
                    cartDTO.setNumCart(cartDTO.getNumCart() - 1);
                }
            }
        }
        cartRepo.updateNumCart(cartDTO);
        return cartDTO.getNumCart();
    }
}
