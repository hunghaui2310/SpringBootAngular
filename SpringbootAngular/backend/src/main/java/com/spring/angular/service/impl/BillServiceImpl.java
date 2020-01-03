package com.spring.angular.service.impl;

import com.spring.angular.dto.BillDTO;
import com.spring.angular.dto.ProductDTO;
import com.spring.angular.service.BillService;
import org.springframework.stereotype.Service;

@Service
public class BillServiceImpl implements BillService {

    @Override
    public BillDTO getBill(ProductDTO productDTO, Long userId) {
        return null;
    }
}
