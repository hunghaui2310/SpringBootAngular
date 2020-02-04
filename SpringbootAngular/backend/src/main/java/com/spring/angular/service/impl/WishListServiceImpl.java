package com.spring.angular.service.impl;

import com.spring.angular.dto.ProductDTO;
import com.spring.angular.dto.WishListDTO;
import com.spring.angular.helper.Contains;
import com.spring.angular.helper.DataUtil;
import com.spring.angular.model.Product;
import com.spring.angular.repository.ProductRepo;
import com.spring.angular.repository.WishListRepoCustom;
import com.spring.angular.service.WishListService;
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@Service
public class WishListServiceImpl implements WishListService {

    @Autowired
    private WishListRepoCustom wishListRepo;

    @Autowired
    private ProductRepo productRepo;

    /**
     * Thuc hien them vao yeu thich va cap nhat lai so luot thich trong product
     *
     * @param wishListDTO
     * @return thong bao
     * @throws Exception
     */
    @Override
    public String insertWishList(WishListDTO wishListDTO) throws Exception {
        String message;
        Long wishListId = wishListRepo.findWishListByUser(wishListDTO.getUserId());
        wishListDTO.setWishListId(wishListId);
        boolean check = wishListRepo.checkDuplicateWishList(wishListDTO);
        if(check){
            message = Contains.DUPLICATE;
        }else {
            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(wishListDTO.getProductId());
            Object[] product = productRepo.findProById(wishListDTO.getProductId());
            Long numLikeOld = DataUtil.safeToLong(product[3]);
            Long numLikeNew = numLikeOld + 1;
            productDTO.setNumLike(numLikeNew);
            Product product1 = productRepo.getOne(wishListDTO.getProductId());
            productDTO.setDiscount(product1.getDiscount());
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            String date = simpleDateFormat.format(product1.getCreateDate());
            productDTO.setCreateDate(date);
            productDTO.setCategoryId(product1.getCategoryId());
            productDTO.setDescription(product1.getDescription());
            productDTO.setPrice(product1.getPrice());
            productDTO.setProductName(product1.getProductName());
            productDTO.setNumBuy(product1.getNumBuy());
            productDTO.setCodeDiscount(product1.getCodeDiscount());
            productRepo.updateProduct(productDTO);
            wishListRepo.insertWishList(wishListDTO);
            message = Contains.SUCCESS;
        }
        return message;
    }

    @Override
    public WishListDTO showAllWishList(WishListDTO wishListDTO) throws Exception {
        Long wishListId = wishListRepo.findWishListByUser(wishListDTO.getUserId());
        wishListDTO.setWishListId(wishListId);
        List<Object[]> wishList = wishListRepo.getWishListByUser(wishListDTO);
        List<ProductDTO> list = new ArrayList<>();
        for(Object[] object : wishList){
            Long productId = DataUtil.safeToLong(object[2]);
            Object[] productInWishList = productRepo.getProInCart(productId);
            if(!DataUtil.isNullOrEmpty(productInWishList)) {
                Long proId = DataUtil.safeToLong(productInWishList[0]);
                String proName = DataUtil.safeToString(productInWishList[1]);
                int discount = DataUtil.safeToInt(productInWishList[2]);
                int price = DataUtil.safeToInt(productInWishList[3]);
                double realPrice = DataUtil.safeToDouble(productInWishList[4]);
                String urlImg = DataUtil.safeToString(productInWishList[5]);

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
                Long cateId = DataUtil.safeToLong(productInWishList[6]);
                productDTO.setCategoryId(cateId);

                if(!DataUtil.isNullOrEmpty(urlImg)) {
                    Resource resource = new ClassPathResource(Contains.IMAGES_PRODUCT_SMALL_SIZE + cateId + "/" + urlImg);
                    File file = resource.getFile();
                    byte[] fileContent = FileUtils.readFileToByteArray(file);
                    String urlImageProduct = Base64.getEncoder().encodeToString(fileContent);
                    productDTO.setUrlImage(urlImageProduct);
                }
                list.add(productDTO);
            }
        }
        WishListDTO data = new WishListDTO();
        data.setProductDTOList(list);
        return data;
    }

    @Override
    public String deleteProWishList(WishListDTO wishListDTO) throws Exception {
        String message;
        if(!DataUtil.isNullOrZero(wishListDTO.getProductId()) && !DataUtil.isNullOrZero(wishListDTO.getUserId())) {
            Long wishListId = wishListRepo.findWishListByUser(wishListDTO.getUserId());
            wishListDTO.setWishListId(wishListId);
            wishListRepo.deleteProWishList(wishListDTO);
            message = Contains.SUCCESS;
        } else {
            message = Contains.ERROR;
        }
        return message;
    }
}
