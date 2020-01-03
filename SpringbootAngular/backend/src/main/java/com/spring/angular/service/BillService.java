package com.spring.angular.service;

import com.spring.angular.dto.BillDTO;
import com.spring.angular.dto.ProductDTO;

public interface BillService {

    BillDTO getBill(ProductDTO productDTO, Long userId);
}
