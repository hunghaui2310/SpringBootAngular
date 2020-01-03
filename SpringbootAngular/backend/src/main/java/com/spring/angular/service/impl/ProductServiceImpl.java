package com.spring.angular.service.impl;

import com.spring.angular.dto.ProductDTO;
import com.spring.angular.helper.DataUtil;
import com.spring.angular.helper.SearchRequest;
import com.spring.angular.repository.ProductRepo;
import com.spring.angular.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.DecimalFormat;
import java.text.NumberFormat;
import java.util.ArrayList;
import java.util.List;

@Service
public class ProductServiceImpl implements ProductService {

    @Autowired
    private ProductRepo productRepo;

    private DecimalFormat df = new DecimalFormat("###");
    private NumberFormat format = NumberFormat.getInstance();

    @Override
    public List<ProductDTO> getAllProduct(String condition) {
        List<Object[]> lstObject = productRepo.getProduct(condition);
        List<ProductDTO> productDTOList = new ArrayList<>();

        String proName;
        int price;
        Long numLike;
        int discount;
        double realPrice;
        String img;
        Long lngId;
        for (Object[] objects : lstObject) {
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
    public ProductDTO getProductById(Long id) {
        Object[] objects = null;
        ProductDTO productDTO = new ProductDTO();
        if (productRepo.getProductById(id) != null) {
            objects = productRepo.getProductById(id);
        }
        if (objects != null) {
            productDTO.setDescription(DataUtil.safeToString(objects[0]));
            productDTO.setPrice(DataUtil.safeToInt(objects[1]));
            productDTO.setNumLike(DataUtil.safeToLong(objects[2]));
            productDTO.setProductName(DataUtil.safeToString(objects[3]));
            productDTO.setDiscount(DataUtil.safeToInt(objects[4]));
            productDTO.setUrlImage(DataUtil.safeToString(objects[5]));
            productDTO.setNoData(false);
            return productDTO;
        } else
            productDTO.setNoData(true);
        return productDTO;
    }

    @Override
    public List<String> getImageByProId(Long id) {
        List<String> lstSting = productRepo.lstImageProduct(id);
        return lstSting;
    }

}
