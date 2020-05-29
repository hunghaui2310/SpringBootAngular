package com.spring.angular.controller;

import com.spring.angular.dto.OrderDTO;
import com.spring.angular.helper.ApiResponse;
import com.spring.angular.model.Order;
import com.spring.angular.repository.OrderRepo;
import com.spring.angular.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import javax.servlet.http.HttpServletResponse;
import java.math.BigInteger;
import java.util.List;

@RestController
@RequestMapping("order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @Autowired
    private OrderRepo orderRepo;

    @PostMapping("/show")
    public ApiResponse orderProduct(@RequestBody OrderDTO orderDTO){
        try {
            OrderDTO orderDTOList = orderService.getOderByCode(orderDTO.getOrderCode());
            return ApiResponse.build(HttpServletResponse.SC_OK,true,"", orderDTOList);
        }catch (Exception e){
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,false, e.getMessage(),null);
        }
    }

    @PostMapping("/update")
    public ApiResponse updateOrder(@RequestBody OrderDTO orderDTO) throws Exception{
        try {
            String message = orderService.updateOrder(orderDTO);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", message);
        }catch (Exception e){
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }

//    @PostMapping("/confirm")
//    public ApiResponse confirmOrderByUser(@RequestBody OrderDTO orderDTO) throws Exception {
//        try {
//            OrderDTO orderDTO1 = orderService.accessOrderByUser(orderDTO);
//            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", orderDTO1);
//        } catch (Exception e) {
//            e.printStackTrace();
//            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
//        }
//    }

    @PostMapping("/save")
    public ApiResponse saveOrder(@RequestBody OrderDTO orderDTO) {
        try{
            String message = orderService.saveOrder(orderDTO);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, null, message);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }

    @PostMapping("/getByUser")
    public ApiResponse getByUser(@RequestBody OrderDTO orderDTO) {
        try {
            List<OrderDTO> list = orderService.getAllOrder(orderDTO.getUserId());
            return ApiResponse.build(HttpServletResponse.SC_OK, true, null, list);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }

    @PostMapping("/delete")
    public ApiResponse deleteOrder(@RequestBody OrderDTO orderDTO) {
        try{
            String message = orderService.deleteOrder(orderDTO.getOrderCode());
            return ApiResponse.build(HttpServletResponse.SC_OK, true, null, message);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }
}
