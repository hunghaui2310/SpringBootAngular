package com.spring.angular.controller;

import com.spring.angular.dto.OrderDTO;
import com.spring.angular.helper.ApiResponse;
import com.spring.angular.service.OrderService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("order")
public class OrderController {

    @Autowired
    private OrderService orderService;

    @PostMapping("/show")
    public ApiResponse orderProduct(@RequestBody OrderDTO orderDTO){
        try {
            String orderCode = orderDTO.getOrderCode();
            Long userId = orderDTO.getUserId();
            OrderDTO orderDTOList = orderService.getOderByUser(orderCode, userId);
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
}
