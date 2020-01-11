package com.spring.angular.service.impl;

import com.spring.angular.dto.ProductDTO;
import com.spring.angular.dto.ProductDetailDTO;
import com.spring.angular.helper.DataUtil;
import com.spring.angular.helper.SearchRequest;
import com.spring.angular.model.FileInfo;
import com.spring.angular.repository.ProductRepo;
import com.spring.angular.service.FileInfoService;
import com.spring.angular.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepo productRepo;

    @Autowired
    private FileInfoService fileInfoService;

//    private DecimalFormat df = new DecimalFormat("###");
//    private NumberFormat format = NumberFormat.getInstance();

    @Override
    public List<ProductDTO> getAllProduct(String condition) {
        List<Object[]> lstObject = productRepo.getProduct(condition);
        List<ProductDTO> productDTOList = new ArrayList<>();

        String proName; String cateName; String des;
        int price;
        Long numLike; int dataIsNew;
        int discount = 0;
        double realPrice;
        String img;
        Long lngId;
        for (Object[] objects : lstObject) {
            ProductDTO productDTO = new ProductDTO();
            lngId = DataUtil.safeToLong(objects[0]);
            proName = String.valueOf(objects[1]);
            price = DataUtil.safeToInt(objects[2]);
            numLike = DataUtil.safeToLong(objects[3]);
            cateName = DataUtil.safeToString(objects[4]);
            if(objects[5] != null) {
                discount = (int) objects[5];
            }
            img = String.valueOf(objects[6]);
            realPrice = DataUtil.safeToDouble(objects[7]);
            des = DataUtil.safeToString(objects[8]);
            dataIsNew = DataUtil.safeToInt(objects[9]);

            productDTO.setId(lngId);
            productDTO.setProductName(proName);
            productDTO.setPrice(price);
            productDTO.setNumLike(numLike);
            if(!DataUtil.isNullOrZero(discount)) {
                productDTO.setDiscount(discount);
            }
            productDTO.setCategoryName(cateName);
            productDTO.setUrlImage(img);
            if(!DataUtil.isNullOrZero(price)){
                productDTO.setRealPrice(price);
            }else {
                productDTO.setRealPrice(realPrice);
            }
            productDTO.setDescription(des);
            if(dataIsNew == 1){
                productDTO.setNew(true);
            }else {
                productDTO.setNew(false);
            }
            productDTOList.add(productDTO);
        }
        return productDTOList;
    }

    @Override
    public List<ProductDTO> searchProductByName(SearchRequest searchRequest) {
        List<Object[]> list = productRepo.searchProduct(searchRequest);
        List<ProductDTO> productDTOList = new ArrayList<>();
        String proName = "";
        int price;
        Long numLike;
        int discount;
        double realPrice;
        String img;
        Long lngId;
        for (Object[] objects : list) {
            ProductDTO productDTO = new ProductDTO();
            lngId = DataUtil.safeToLong(objects[0]);
            proName = String.valueOf(objects[1]);
            price = DataUtil.safeToInt(objects[2]);
            numLike = DataUtil.safeToLong(objects[3]);
            discount = DataUtil.safeToInt(objects[4]);
            img = String.valueOf(objects[5]);
            realPrice = DataUtil.safeToDouble(objects[6]);

            productDTO.setId(lngId);
            productDTO.setProductName(proName);
            productDTO.setPrice(price);
            productDTO.setNumLike(numLike);
            productDTO.setDiscount(discount);
            productDTO.setUrlImage(img);
            productDTO.setRealPrice(realPrice);
            productDTOList.add(productDTO);
        }
        return productDTOList;
    }

    @Override
    public ProductDetailDTO getProductById(Long productId) throws Exception {
        List<FileInfo> fileInfoList = fileInfoService.getListByProId(productId);
        List<String> list = new ArrayList<>();
        for(FileInfo fileInFo : fileInfoList){
            String url = fileInFo.getUrl();
            list.add(url);
        }
        Object[] objects = null;
        ProductDetailDTO productDetailDTO = new ProductDetailDTO();
        if (productRepo.getProductById(productId) != null) {
            objects = productRepo.getProductById(productId);
        }
        if (objects != null) {
            productDetailDTO.setId(DataUtil.safeToLong(objects[0]));
            productDetailDTO.setProductName(DataUtil.safeToString(objects[1]));
            productDetailDTO.setDescription(DataUtil.safeToString(objects[2]));
            productDetailDTO.setPrice(DataUtil.safeToInt(objects[3]));
            productDetailDTO.setNumLike(DataUtil.safeToLong(objects[4]));
            productDetailDTO.setRealPrice(DataUtil.safeToDouble(objects[5]));
            productDetailDTO.setDiscount(DataUtil.safeToInt(objects[6]));
            productDetailDTO.setUrlImage(list);
            productDetailDTO.setNoData(false);
            productDetailDTO.setCategoryName(DataUtil.safeToString(objects[7]));
            return productDetailDTO;
        } else
            productDetailDTO.setNoData(true);
        return productDetailDTO;
    }

    @Override
    public List<String> getImageByProId(Long id) {
        List<String> lstSting = productRepo.lstImageProduct(id);
        return lstSting;
    }

}
