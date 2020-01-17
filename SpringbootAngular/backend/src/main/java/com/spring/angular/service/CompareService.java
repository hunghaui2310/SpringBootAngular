package com.spring.angular.service;

import com.spring.angular.dto.CartDTO;
import com.spring.angular.dto.CompareDTO;

public interface CompareService {

    String addCompare(CartDTO cartDTO) throws Exception;

    CompareDTO getDataToCompare(CartDTO cartDTO) throws Exception;
}
