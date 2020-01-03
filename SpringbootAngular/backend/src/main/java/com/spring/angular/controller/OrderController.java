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

    @PostMapping("/showAll")
    public ApiResponse orderProduct(@RequestBody OrderDTO orderDTO){
        try {
            List<OrderDTO> orderDTOList = orderService.getList(orderDTO.getUserId());
            return ApiResponse.build(HttpServletResponse.SC_OK,true,"", orderDTOList);
        }catch (Exception e){
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR,false, e.getMessage(),null);
        }
    }
}
