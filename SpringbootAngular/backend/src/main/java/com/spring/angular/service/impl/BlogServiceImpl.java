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
import org.apache.commons.io.FileUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;

import java.io.File;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Base64;
import java.util.Date;
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
            String content = DataUtil.safeToString(object[2]);
            JsonArray jsonArray;
            JsonParser jsonParser = new JsonParser();
            JsonObject jsonObject = (JsonObject) jsonParser.parse(content);
            jsonArray = (JsonArray) jsonObject.get(Contains.BLOG_DETAIL.DETAIL);
            if(jsonArray != null){
                for(int i= 0;i < jsonArray.size(); i++){
                    JsonObject json = (JsonObject) jsonArray.get(i);
                    blogDTO.setContent(json.get(Contains.BLOG_DETAIL.HEADER).getAsString());
                }
            }
            blogDTO.setCreateDate(DataUtil.safeToString(object[3]));
            String imgBlog = DataUtil.safeToString(object[4]);
            if(!DataUtil.isNullOrEmpty(imgBlog)) {
                Resource resource = new ClassPathResource(Contains.IMAGES_BLOG + imgBlog);
                File file = resource.getFile();
                byte[] fileContent = FileUtils.readFileToByteArray(file);
                String urlImageProduct = Base64.getEncoder().encodeToString(fileContent);
                blogDTO.setImg(urlImageProduct);
            }
            blogDTO.setNumSee(DataUtil.safeToInt(object[5]));
            list.add(blogDTO);
        }
        return list;
    }

    @Override
    public BlogDetailDTO lstContentDetail(Long blogId) throws Exception {

        Blog detailBlog = blogRepo.getOne(blogId);
        BlogDetailDTO blogDetailDTO = new BlogDetailDTO();
        blogDetailDTO.setId(detailBlog.getId());
        blogDetailDTO.setTitle(detailBlog.getTitle());
        blogDetailDTO.setCreateDate(detailBlog.getCreateDate());
        blogDetailDTO.setImg(detailBlog.getImg());
        blogDetailDTO.setNumSee(detailBlog.getNumSee());
        blogDetailDTO.setImgBanner(detailBlog.getImgBanner());

        int newNumSee = detailBlog.getNumSee() + 1;
        BlogDTO blogDTO = new BlogDTO();
        blogDTO.setId(blogId);
        blogDTO.setNumSee(newNumSee);
        blogRepo.updateNumSee(blogDTO);

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

    @Override
    public List<BlogDetailDTO> findAllBlogAdmin() throws Exception {
        List<Blog> list = blogRepo.findAllByOrderByIdDesc();
        List<BlogDetailDTO> blogDetailDTOS = new ArrayList<>();
        for(Blog blog : list) {
            BlogDetailDTO blogDetailDTO = new BlogDetailDTO();
            blogDetailDTO.setId(blog.getId());
            blogDetailDTO.setTitle(blog.getTitle());
            blogDetailDTO.setCreateDate(blog.getCreateDate());
            String content = blog.getDetailContent();
            JsonArray jsonArray;
            JsonParser jsonParser = new JsonParser();
            JsonObject jsonObject = (JsonObject) jsonParser.parse(content);
            jsonArray = (JsonArray) jsonObject.get(Contains.BLOG_DETAIL.DETAIL);
            if(jsonArray != null){
                for(int i= 0;i < jsonArray.size(); i++){
                    JsonObject json = (JsonObject) jsonArray.get(i);
                    blogDetailDTO.setContent(json.get(Contains.BLOG_DETAIL.HEADER).getAsString());
                }
            }
            blogDetailDTO.setNumSee(blog.getNumSee());
            blogDetailDTOS.add(blogDetailDTO);
        }
        return blogDetailDTOS;
    }

    @Override
    public String insertBlog(BlogDetailDTO blogDetailDTO) throws Exception {
        Blog blog = new Blog();
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
        blog.setCreateDate(simpleDateFormat.format(new Date()));
        blog.setImg(blogDetailDTO.getImg());
        blogDetailDTO.setImgBanner(blogDetailDTO.getImgBanner());
        String header = blogDetailDTO.getHeader();
        String content = blogDetailDTO.getContent();
        String footer = blogDetailDTO.getFooter();
        JsonObject jsonObject = new JsonObject();
        jsonObject.addProperty(Contains.BLOG_DETAIL.HEADER, header);
        jsonObject.addProperty(Contains.BLOG_DETAIL.CONTENT, content);
        jsonObject.addProperty(Contains.BLOG_DETAIL.FOOTER, footer);
        String detailContent = jsonObject.getAsString();
        blog.setDetailContent(detailContent);
        String message;
        blogRepo.save(blog);
        message = Contains.SUCCESS;
        return message;
    }
}
