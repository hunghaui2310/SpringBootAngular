package com.spring.angular.repository.impl;

import com.spring.angular.dto.ProductDTO;
import com.spring.angular.helper.Contains;
import com.spring.angular.helper.DataUtil;
import com.spring.angular.helper.SearchRequest;
import com.spring.angular.repository.ProductCustomRepo;
import org.springframework.stereotype.Repository;

import javax.persistence.EntityManager;
import javax.persistence.NoResultException;
import javax.persistence.PersistenceContext;
import javax.persistence.Query;
import javax.transaction.Transactional;
import java.math.BigInteger;
import java.util.HashMap;
import java.util.List;

public class ProductCustomRepoImpl implements ProductCustomRepo {

    @PersistenceContext
    EntityManager entityManager;

    @Override
    public List<Object[]> getProduct() {
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("SELECT p.product_id,p.product_name,p.price,p.num_like,c.category_name,p.discount,f.url,p.price-(p.price*p.discount/100) AS real_price, p.des, p.is_new, c.category_id" +
                " FROM product p, file_info f, category c" +
                " WHERE f.file_type_id = 1 AND p.product_id = f.product_id" +
                " AND c.category_id = p.category_id");
        Query query = entityManager.createNativeQuery(sqlBuilder.toString());
        return query.getResultList();
    }

    @Override
    public List<Object[]> searchProduct(SearchRequest searchRequest) {
        HashMap hashMap = new HashMap();
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("SELECT p.product_id,p.product_name,p.price,p.num_like,c.category_name,p.discount,f.url,p.price-(p.price*p.discount/100) AS real_price, p.des, p.is_new, c.category_id" +
                " FROM product p, file_info f, category c");
        sqlBuilder.append(sqlSearch(searchRequest, hashMap));
        Query query = entityManager.createNativeQuery(sqlBuilder.toString());
        hashMap.forEach((k, v) -> {
            query.setParameter(k.toString(), v);
        });
        return query.getResultList();
    }

    /**
     * lay du lieu cua tung san pham theo id truyen vao
     *
     * @param productId
     * @return Product
     * @throws Exception
     */
    @Override
    public Object[] getProductById(Long productId) {
        try {
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("SELECT p.product_id,p.product_name,p.des,p.price,p.num_like,p.price-(p.price*p.discount/100) AS real_price,p.discount, c.category_name, c.category_id" +
                    " from product p, category c" +
                    " where c.category_id = p.category_id" +
                    " and p.product_id = :productId");
            Query query = entityManager.createNativeQuery(stringBuilder.toString());
            query.setParameter("productId", productId);
            return (Object[]) query.getSingleResult();
        }catch (NoResultException e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public Object[] getProInCart(Long productId) throws Exception {
        try {
            StringBuilder sqlBuilder = new StringBuilder();
            sqlBuilder.append("select p.product_id, p.product_name, p.discount,p.price,p.price-(p.price*p.discount/100) AS real_price, f.url, p.category_id" +
                    " from product p, file_info f" +
                    " where p.product_id = f.product_id" +
                    " and f.file_type_id = 1 and p.product_id = :productId");
            Query query = entityManager.createNativeQuery(sqlBuilder.toString());
            query.setParameter("productId", productId);
            return (Object[]) query.getSingleResult();
        }catch (NoResultException e){
            e.printStackTrace();
            return null;
        }
    }

    @Override
    public List<Object[]> getListAbout() throws Exception {
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("select numLike, numBuy from Product");
        Query query = entityManager.createQuery(sqlBuilder.toString());
        return query.getResultList();
    }

    @Override
    public Long totalProduct(boolean isNew) throws Exception {
        StringBuilder sqlBuilder = new StringBuilder();
        sqlBuilder.append("select count(*) from product");
        if (isNew == true){
            sqlBuilder.append(" where is_new = 1");
        }
        Query query = entityManager.createNativeQuery(sqlBuilder.toString());
        BigInteger total = (BigInteger) query.getSingleResult();
        return total.longValue();
    }

    @Override
    public List<Object[]> getListSamePro(Long categoryId, long numLimit) throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("SELECT p.product_id,p.product_name,p.price,p.num_like,c.category_name,p.discount,f.url,p.price-(p.price*p.discount/100) AS real_price, p.des, p.is_new, c.category_id" +
                " FROM product p, file_info f, category c" +
                " WHERE f.file_type_id = 1 AND p.product_id = f.product_id" +
                " AND c.category_id = p.category_id" +
                " AND c.category_id = :categoryId" +
                " LIMIT :number");
        Query query = entityManager.createNativeQuery(stringBuilder.toString());
        query.setParameter("categoryId", categoryId);
        query.setParameter("number", numLimit);
        return query.getResultList();
    }

    @Override
    public Object[] findProById(Long productId) throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("SELECT p.product_id,p.product_name,p.price,p.num_like,c.category_name,p.discount,f.url,p.price-(p.price*p.discount/100) AS real_price, p.des, p.is_new, c.category_id " +
                "FROM product p, file_info f, category c " +
                "WHERE p.product_id = f.product_id " +
                "AND f.file_type_id = 1 AND c.category_id = p.category_id and p.product_id = :productId");
        Query query = entityManager.createNativeQuery(stringBuilder.toString());
        query.setParameter("productId", productId);
        return (Object[]) query.getSingleResult();

    }

    @Override
    public String getCodeDiscount(String codeDiscount) throws Exception {
        try {
            StringBuilder stringBuilder = new StringBuilder();
            stringBuilder.append("select codeDiscount from Product where codeDiscount = :codeDiscount");
            Query query = entityManager.createQuery(stringBuilder.toString());
            query.setParameter("codeDiscount", codeDiscount);
            return (String) query.getSingleResult();
        }catch (Exception e){
            e.printStackTrace();
            return null;
        }
    }

    @Transactional
    @Override
    public void updateProduct(ProductDTO productDTO) throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("update product set category_id = :categoryId,create_date=:createDate,des=:description," +
                " discount=:discount,num_like=:numLike,price=:price,product_name=:productName,num_buy=:numBuy,code_discount=:codeDiscount" +
                " where product_id = :productId");
        Query query = entityManager.createNativeQuery(stringBuilder.toString());
        query.setParameter("categoryId",productDTO.getCategoryId());
        query.setParameter("createDate", productDTO.getCreateDate());
        query.setParameter("description", productDTO.getDescription());
        query.setParameter("discount", productDTO.getDiscount());
        query.setParameter("numLike", productDTO.getNumLike());
        query.setParameter("price", productDTO.getPrice());
        query.setParameter("productName", productDTO.getProductName());
        query.setParameter("numBuy", productDTO.getNumBuy());
        query.setParameter("codeDiscount", productDTO.getCodeDiscount());
        query.setParameter("productId", productDTO.getId());
        query.executeUpdate();
    }

    @Override
    public List<Object[]> searchProAdmin(SearchRequest searchRequest) throws Exception {
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append("SELECT * from product WHERE product_name like :productName order by product_id desc");
        Query query = entityManager.createNativeQuery(stringBuilder.toString());
        query.setParameter("productName", "%" + searchRequest.getProductName() + "%");
        return query.getResultList();
    }

    private StringBuilder sqlSearch(SearchRequest searchRequest, HashMap hashMap){
        StringBuilder stringBuilder = new StringBuilder();
        stringBuilder.append(" WHERE 1 = 1");
        stringBuilder.append(" AND p.product_id = f.product_id");
        stringBuilder.append(" AND f.file_type_id = 1");
        stringBuilder.append(" AND c.category_id = p.category_id");
        if(!DataUtil.isNullOrEmpty(searchRequest.getProductName())){
            stringBuilder.append(" and p.product_name like :productName");
            hashMap.put("productName", "%" + searchRequest.getProductName() + "%");
        }
        if(!DataUtil.isNullOrZero(searchRequest.getCategoryId())){
            stringBuilder.append(" and c.category_id = :categoryId");
            hashMap.put("categoryId", searchRequest.getCategoryId());
        }
        if(!DataUtil.isNullOrZero(searchRequest.getProductId())) {
            stringBuilder.append(" and p.product_id = :productId");
            hashMap.put("productId", searchRequest.getProductId());
        }
        if(!DataUtil.isNullOrEmpty(searchRequest.getCondition())) {
            String condition = searchRequest.getCondition();
            switch (condition) {
                case Contains.CREATE_DATE: // ngay ra mat
                    stringBuilder.append(" and p.is_new = 1 order by p.create_date desc");
                    break;
                case Contains.NUM_LIKE: // luot thich giam dan
                    stringBuilder.append(" order by p.num_like desc");
                    break;
                case Contains.NUM_BUY: //luot mua giam dan
                    stringBuilder.append(" order by p.num_buy desc");
                    break;
                case Contains.PRICE_DESC: // gia giam dan
                    stringBuilder.append(" order by real_price desc");
                    break;
                case Contains.PRICE_ASC: // gia tang dan
                    stringBuilder.append(" order by real_price asc");
                    break;
                case Contains.NAME: // ten tu A-Z
                    stringBuilder.append(" order by p.product_name");
                    break;
                default:
                    stringBuilder.append(" order by p.num_buy desc");
                    break;
            }
        }
        return stringBuilder;
    }
}
