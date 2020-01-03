package com.spring.angular.service.impl;

import com.spring.angular.dto.OrderDTO;
import com.spring.angular.dto.ProductDTO;
import com.spring.angular.helper.DataUtil;
import com.spring.angular.repository.OrderRepo;
import com.spring.angular.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Override
    public List<OrderDTO> getList(Long userId) {
        List<OrderDTO> orderDTOList = new ArrayList<>();
        List<ProductDTO> dtoList = new ArrayList<>();
        List<Object[]> list = orderRepo.getListOrder(userId);
        String orderCode = null;
        for(Object[] object : list){
            Long proId = DataUtil.safeToLong(object[0]);
            Long numLike = DataUtil.safeToLong(object[1]);
            int price = DataUtil.safeToInt(object[2]);
            String proName = DataUtil.safeToString(object[3]);
            String des = DataUtil.safeToString(object[4]);
            int discount = DataUtil.safeToInt(object[5]);
            String cateName = DataUtil.safeToString(object[6]);
            String url = DataUtil.safeToString(object[7]);
            orderCode = DataUtil.safeToString(object[8]);

            ProductDTO productDTO = new ProductDTO();
            productDTO.setId(proId);
            productDTO.setNumLike(numLike);
            productDTO.setPrice(price);
            productDTO.setProductName(proName);
            productDTO.setDescription(des);
            productDTO.setDiscount(discount);
            productDTO.setCategoryName(cateName);
            productDTO.setUrlImage(url);
            dtoList.add(productDTO);
        }
        OrderDTO orderDTO = new OrderDTO();
        long index = 0;
        orderDTO.setId(index++);
        orderDTO.setOrderCode(orderCode);
        orderDTO.setProductDTOList(dtoList);
        orderDTOList.add(orderDTO);
        return orderDTOList;
    }
}
