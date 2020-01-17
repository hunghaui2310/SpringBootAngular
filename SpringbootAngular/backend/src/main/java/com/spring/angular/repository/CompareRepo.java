package com.spring.angular.repository;

import java.math.BigInteger;
import java.util.List;

public interface CompareRepo {

    void deleteAllData(Long userId) throws Exception;

    List<BigInteger> getListProductToCompare(Long userId) throws Exception;

    void saveCompare(Long productId, Long userId) throws Exception;
}
