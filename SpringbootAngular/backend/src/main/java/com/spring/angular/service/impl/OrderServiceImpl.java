package com.spring.angular.service.impl;

import com.spring.angular.dto.OrderDTO;
import com.spring.angular.dto.ProductDTO;
import com.spring.angular.helper.Contains;
import com.spring.angular.helper.DataUtil;
import com.spring.angular.model.Order;
import com.spring.angular.model.User;
import com.spring.angular.repository.OrderRepo;
import com.spring.angular.repository.UserCartRepo;
import com.spring.angular.repository.UserRepo;
import com.spring.angular.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import javax.xml.crypto.Data;
import java.math.BigInteger;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;
import java.util.stream.Collectors;
import java.util.stream.Stream;

@Service
public class OrderServiceImpl implements OrderService {

    @Autowired
    private OrderRepo orderRepo;

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private UserCartRepo userCartRepo;

    @Override
    public OrderDTO getOderByUser(Long id, Long userId) throws Exception {
        Object[] objects = orderRepo.getOrder(id);
        OrderDTO orderDTO = new OrderDTO();
        orderDTO.setOrderCode(DataUtil.safeToString(objects[2]));
        if(objects[5] != null) {
            orderDTO.setCity(DataUtil.safeToString(objects[5]));
        }
        if(objects[4] != null) {
            orderDTO.setNotes(DataUtil.safeToString(objects[4]));
        }
        User user = userRepo.getOne(userId);
        orderDTO.setAddress(user.getAddress());
        orderDTO.setFullName(user.getFullName());
        orderDTO.setEmail(user.getUsername());
        orderDTO.setPhoneNumber(user.getPhoneNumber());
        Date date = (Date) objects[3];
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
        orderDTO.setCreateDate(simpleDateFormat.format(date));
        return orderDTO;
    }

    @Override
    public Long updateOrder(OrderDTO orderDTO) throws Exception {
        OrderDTO orderDTO1 = new OrderDTO();
        if (!DataUtil.isNullOrEmpty(orderDTO.getFirstName()) && !DataUtil.isNullOrEmpty(orderDTO.getLastName())) {
            orderDTO1.setFullName(orderDTO.getFirstName() + orderDTO.getLastName());
        } else if (DataUtil.isNullOrEmpty(orderDTO.getFirstName()) && !DataUtil.isNullOrEmpty(orderDTO.getLastName())) {
            orderDTO1.setFullName(orderDTO.getLastName());
        } else {
            orderDTO1.setFullName(orderDTO.getFirstName());
        }
        if (!DataUtil.isNullOrEmpty(orderDTO.getPhoneNumber())) {
            orderDTO1.setPhoneNumber(orderDTO.getPhoneNumber());
        }
        if (!DataUtil.isNullOrEmpty(orderDTO.getAddress())) {
            orderDTO1.setAddress(orderDTO.getAddress());
        }
        orderDTO1.setUserId(orderDTO.getUserId());
        userCartRepo.updateUser(orderDTO1);

        if (!DataUtil.isNullOrEmpty(orderDTO.getCity())) {
            orderDTO1.setCity(orderDTO.getCity());
        }
        if (!DataUtil.isNullOrEmpty(orderDTO.getNotes())) {
            orderDTO1.setNotes(orderDTO.getNotes());
        }
        Stream<Integer> list = DataUtil.autoGenCode(5);
        List<Integer> result = list.collect(Collectors.toList());
        for (Integer integer : result) {
            if (integer > 0) {
                orderDTO1.setOrderCode(Contains.HD + "-" + integer);
            } else {
                orderDTO1.setOrderCode(Contains.HD + integer);
            }
        }
        orderDTO1.setUserId(orderDTO.getUserId());
        // tra cho front-end id ban ghi vua them moi trong order
        BigInteger bigInteger = orderRepo.createOrder(orderDTO1);
        Long id = bigInteger.longValue();
        return id;
    }
}
