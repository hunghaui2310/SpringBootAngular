package com.spring.angular.repository;

import com.spring.angular.model.FileInfo;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface FileInfoRepo extends JpaRepository<FileInfo, Long> {
}
