package com.spring.angular.service.impl;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.google.gson.JsonParser;
import com.spring.angular.dto.BlogDTO;
import com.spring.angular.dto.BlogDetailDTO;
import com.spring.angular.helper.Contains;
import com.spring.angular.helper.DataUtil;
import com.spring.angular.model.Blog;
import com.spring.angular.repository.BlogRepo;
import com.spring.angular.service.BlogService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;

@Service
public class BlogServiceImpl implements BlogService {

    @Autowired
    private BlogRepo blogRepo;

    @Override
    public List<BlogDTO> getListBlog() throws Exception {
        List<BlogDTO> list = new ArrayList<>();
        List<Object[]> listObj = blogRepo.lstBlog();
        for(Object[] object : listObj){
            BlogDTO blogDTO = new BlogDTO();
            blogDTO.setId(DataUtil.safeToLong(object[0]));
            blogDTO.setTitle(DataUtil.safeToString(object[1]));
            blogDTO.setContent(DataUtil.safeToString(object[2]));
            blogDTO.setCreateDate(DataUtil.safeToString(object[3]));
            blogDTO.setImg(DataUtil.safeToString(object[4]));
            blogDTO.setNumSee(DataUtil.safeToInt(object[5]));
            list.add(blogDTO);
        }
        return list;
    }

    @Override
    public BlogDetailDTO lstContentDetail(Long blogId) throws Exception {

        Blog detailBlog = blogRepo.getBlogDetail(blogId);
        BlogDetailDTO blogDetailDTO = new BlogDetailDTO();
        blogDetailDTO.setId(detailBlog.getId());
        blogDetailDTO.setTitle(detailBlog.getTitle());
        blogDetailDTO.setContent(detailBlog.getContent());
        blogDetailDTO.setCreateDate(detailBlog.getCreateDate());
        blogDetailDTO.setImg(detailBlog.getImg());
        blogDetailDTO.setNumSee(detailBlog.getNumSee());
        blogDetailDTO.setImgBanner(detailBlog.getImgBanner());
        String metaData = detailBlog.getDetailContent();
        JsonArray jsonArray;
        JsonParser jsonParser = new JsonParser();
        JsonObject jsonObject = (JsonObject) jsonParser.parse(metaData);
        jsonArray = (JsonArray) jsonObject.get(Contains.BLOG_DETAIL.DETAIL);
        if(jsonArray != null){
            for(int i= 0;i < jsonArray.size(); i++){
                JsonObject json = (JsonObject) jsonArray.get(i);
                blogDetailDTO.setHeader(json.get(Contains.BLOG_DETAIL.HEADER).getAsString());
                blogDetailDTO.setContentDetail(json.get(Contains.BLOG_DETAIL.CONTENT).getAsString());
                blogDetailDTO.setFooter(json.get(Contains.BLOG_DETAIL.FOOTER).getAsString());
            }
        }

        return blogDetailDTO;
    }
}
