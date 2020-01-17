package com.spring.angular.controller;

import com.spring.angular.dto.CartDTO;
import com.spring.angular.dto.CompareDTO;
import com.spring.angular.helper.ApiResponse;
import com.spring.angular.service.CompareService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("compare")
public class CompareController {

    @Autowired
    private CompareService compareService;

    @PostMapping("/add")
    public ApiResponse addCompare(@RequestBody CartDTO cartDTO) throws Exception{
        try {
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", compareService.addCompare(cartDTO));
        }catch (Exception e){
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }

    @PostMapping("/show")
    public ApiResponse getDataCompare(@RequestBody CartDTO cartDTO) throws Exception {
        try {
            CompareDTO compareDTO = compareService.getDataToCompare(cartDTO);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", compareDTO);
        }catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }
}
