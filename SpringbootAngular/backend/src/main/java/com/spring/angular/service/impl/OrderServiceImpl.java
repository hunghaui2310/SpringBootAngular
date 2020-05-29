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

import javax.management.Query;
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
    public OrderDTO getOderByCode(String orderCode) throws Exception {
        OrderDTO orderDTO = new OrderDTO();
        Object[] order = orderRepo.getOrder(orderCode);
        orderDTO.setOrderCode(orderCode);
        SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
        orderDTO.setCreateDate(dateFormat.format((Date) order[3]));
        orderDTO.setNotes(DataUtil.safeToString(order[4]));
        orderDTO.setEmail(DataUtil.safeToString(order[8]));
        orderDTO.setNameOrder(DataUtil.safeToString(order[5]));
        orderDTO.setAddress(DataUtil.safeToString(order[6]));
        orderDTO.setPhoneNumber(DataUtil.safeToString(order[7]));
        return orderDTO;
    }

    @Override
    public String updateOrder(OrderDTO orderDTO) throws Exception {
        String message = null;
        orderDTO.setStatus(1);
        orderRepo.updateOrder(orderDTO);
        message = Contains.SUCCESS;
        return message;
    }

//    @Override
//    public OrderDTO accessOrderByUser(OrderDTO orderDTO) throws Exception {
//        Object[] order = orderRepo.getOrder(orderDTO.getId());
//        Long userId = DataUtil.safeToLong(order[1]);
//        User user = userRepo.getOne(userId);
//        OrderDTO orderDTO1 = new OrderDTO();
//        orderDTO1.setId(orderDTO.getId());
//        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
//        orderDTO1.setCreateDate(simpleDateFormat.format((Date) order[3]));
//        orderDTO1.setPhoneNumber(user.getPhoneNumber());
//        orderDTO1.setEmail(user.getUsername());
//        orderDTO1.setFullName(user.getFullName());
//        orderDTO1.setAddress(user.getAddress());
//        orderDTO1.setOrderCode(DataUtil.safeToString(order[2]));
//        orderDTO1.setUserId(userId);
//        orderDTO1.setMessage(Contains.SUCCESS);
//        return orderDTO1;
//    }

    @Override
    public String saveOrder(OrderDTO order) throws Exception {
        String message;
        if (order != null) {
            Order orderModel = new Order();
            SimpleDateFormat date = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
            orderModel.setNote(order.getNotes());
            orderModel.setNameOrder(order.getLastName() + " " + order.getFirstName());
            orderModel.setEmail(order.getEmail());
            if (order.getUserId() != null) {
                orderModel.setUserId(order.getUserId());
            }
            orderModel.setPhoneNumber(order.getPhoneNumber());
            orderModel.setAddress(order.getAddress());
            orderModel.setPayment(0);
            orderModel.setOrderCode(order.getOrderCode());
            String dateString = date.format(new Date());
            Date setDate = date.parse(dateString);
            orderModel.setCreateDate(setDate);
            orderModel.setStatus(0);
            orderRepo.saveOrder(orderModel);
            message = Contains.SUCCESS;
        } else {
            message = Contains.ERROR;
        }
        return message;
    }

    @Override
    public List<OrderDTO> getAllOrder(Long userId) throws Exception {
        List<OrderDTO> orders = new ArrayList<>();
        List<Object[]> orderList = orderRepo.getByUser(userId);
        for (Object[] order : orderList) {
            OrderDTO orderNew = new OrderDTO();
            orderNew.setOrderCode(DataUtil.safeToString(order[2]));
            SimpleDateFormat dateFormat = new SimpleDateFormat("dd/MM/yyyy");
            orderNew.setCreateDate(dateFormat.format(order[3]));
            orderNew.setNotes(DataUtil.safeToString(order[4]));
            orderNew.setNameOrder(DataUtil.safeToString(order[5]));
            orderNew.setAddress(DataUtil.safeToString(order[6]));
            orderNew.setPhoneNumber(DataUtil.safeToString(order[7]));
            orderNew.setEmail(DataUtil.safeToString(order[8]));
            orderNew.setPayment(DataUtil.safeToInt(order[9]));
            orders.add(orderNew);
        }
        return orders;
    }

    @Override
    public String deleteOrder(String orderCode) throws Exception {
        orderRepo.deleteOrder(orderCode);
        String message = Contains.SUCCESS;
        return message;
    }
}
