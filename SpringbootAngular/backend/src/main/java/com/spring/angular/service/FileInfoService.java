package com.spring.angular.service;

import com.spring.angular.model.FileInfo;

import java.util.List;

public interface FileInfoService {

    List<FileInfo> getListByProId(Long productId) throws Exception;
}
