package com.spring.angular.repository;

import com.spring.angular.model.Category;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface CategoryRepo extends JpaRepository<Category, Long> {

    List<Category> findAllByOrderByIdDesc();

    @Transactional
    @Modifying
    @Query(value = "insert into category(create_date, category_name) values(:createDate,:categoryName)", nativeQuery = true)
    void createCategory(@Param("createDate") String createDate, @Param("categoryName") String categoryName);
}
