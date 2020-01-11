package com.spring.angular.repository.impl;

import com.spring.angular.helper.Contains;
import com.spring.angular.helper.SearchRequest;
import com.spring.angular.repository.ProductCustomRepo;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import java.util.HashMap;
import java.util.List;

public class ProductCustomRepoImpl implements ProductCustomRepo {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Object[]> getProduct(String condition) {
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("SELECT p.product_id,p.product_name,p.price,p.num_like,c.category_name,p.discount,f.url,p.price-(p.price*p.discount/100) AS real_price, p.des, p.is_new" +
                " FROM product p, file_info f, category c" +
                " WHERE f.file_type_id = 1 AND p.product_id = f.product_id" +
                " AND c.category_id = p.category_id");
        if(condition != null) {
            if (condition.equals(Contains.CREATE_DATE)) {
                sqlBuilder.append(" order by p.create_date desc");
            }else if (condition.equals(Contains.NUM_LIKE)){
                sqlBuilder.append(" order by p.num_like desc");
            }
        }
        Query query = entityManager.createNativeQuery(sqlBuilder.toString());
        return query.getResultList();
    }

    @Override
    public List<Object[]> searchProduct(SearchRequest searchRequest) {
        StringBuilder sqlBuilder = new StringBuilder();
        HashMap hashMap = new HashMap();
        sqlBuilder.append("select p.product_id,p.product_name,p.price,p.num_like,p.discount,f.url,p.price-(p.price*p.discount/100) as real_price" +
                " from product p, file_info f, category c");
        sqlBuilder.append(sqlSearch(searchRequest,hashMap));
        Query query = entityManager.createNativeQuery(sqlBuilder.toString());
        hashMap.forEach((k,v)->{
            query.setParameter(k.toString(),v);
        });
        return query.getResultList();
    }

    /**
     * du lieu cua tung san pham theo id, mac dinh anh la anh co file_type_id = 2
     *
     * @param productId
     * @return Product
     * @throws Exception
     */
    @Override
    public Object[] getProductById(Long productId) {
        try {
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("SELECT p.product_id,p.product_name,p.des,p.price,p.num_like,p.price-(p.price*p.discount/100) AS real_price,p.discount, c.category_name" +
                    " FROM product p, category c" +
                    " WHERE p.category_id = c.category_id" +
                    " AND p.product_id = :productId");
            Query query = entityManager.createNativeQuery(stringBuilder.toString());
            query.setParameter("productId", productId);
            return (Object[]) query.getSingleResult();
        }catch (NoResultException e){
            e.printStackTrace();
            return null;
        }
    }

    /**
     * lay ra list anh cua san pham co loai file la 3
     *
     * @param productId
     * @return chuoi anh
     * @throws Exception
     */
    @Override
    public List<String> lstImageProduct(Long productId) {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("select f.url from file_info f where f.file_type_id = 3 " +
                "and f.product_id = :productId");
        Query query = entityManager.createNativeQuery(stringBuilder.toString());
        query.setParameter("productId",productId);
        return query.getResultList();
    }

    @Override
    public List<Object[]> getProOrderByNumLike() {
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("select p.product_id,p.product_name,p.price,p.num_like,p.discount,f.url" +
                " FROM product p, file_info f,category c" +
                " WHERE f.file_type_id = 1 AND p.product_id = f.product_id AND p.category_id = c.category_id" +
                " order by p.num_like desc");
        Query query = entityManager.createNativeQuery(sqlBuilder.toString());
        return query.getResultList();
    }

    private StringBuilder sqlSearch(SearchRequest searchRequest, HashMap hashMap){
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(" where 1 = 1");
        stringBuilder.append(" and p.product_id = f.product_id");
        stringBuilder.append(" and c.category_id = p.category_id");
        stringBuilder.append(" and f.file_type_id = 1");
        if(searchRequest.getProductName() != null){
            stringBuilder.append(" and p.product_name like '"+ searchRequest.getProductName() +"_%'");
        }
        if(searchRequest.getCategoryId() != null){
            stringBuilder.append(" and c.category_id = :categoryId");
            hashMap.put("categoryId", searchRequest.getCategoryId());
        }
        if (searchRequest.getPrice() != 0){
            if(searchRequest.getPrice() == 1){
                stringBuilder.append(" and p.price BETWEEN 0 and 10");
            }else if(searchRequest.getPrice() == 2){
                stringBuilder.append( " and p.price BETWEEN 10 and 15");
            }else if(searchRequest.getPrice() == 3){
                stringBuilder.append(" and p.price BETWEEN 15 and 20");
            }else if(searchRequest.getPrice() == 4){
                stringBuilder.append(" and p.price BETWEEN 20 and 1000");
            }else
                stringBuilder.append(" and p.price BETWEEN 0 and 1000");
        }
        return stringBuilder;
    }
}
