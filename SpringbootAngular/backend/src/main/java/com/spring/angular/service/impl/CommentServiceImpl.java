package com.spring.angular.service.impl;

import com.spring.angular.dto.CommentDTO;
import com.spring.angular.dto.ProductDTO;
import com.spring.angular.helper.Contains;
import com.spring.angular.helper.DataUtil;
import com.spring.angular.model.Comment;
import com.spring.angular.model.User;
import com.spring.angular.repository.CommentRepo;
import com.spring.angular.repository.UserRepo;
import com.spring.angular.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.*;

@Service
public class CommentServiceImpl implements CommentService {

    @Autowired
    private CommentRepo commentRepo;

    @Autowired
    private UserRepo userRepo;

    @Override
    public List<CommentDTO> getNotificationAdmin() throws Exception {
        List<Object[]> list = commentRepo.getCommentAdmin();
        List<CommentDTO> commentList = new ArrayList<>();
        for(Object[] objects : list) {
            CommentDTO comment = new CommentDTO();
            comment.setId(DataUtil.safeToLong(objects[0]));
            comment.setUserId(DataUtil.safeToLong(objects[1]));
            Long productId = DataUtil.safeToLong(objects[2]);
            if(productId != 0){
                comment.setProductId(productId);
            }
            Long blogId = DataUtil.safeToLong(objects[3]);
            if(blogId != 0){
                comment.setBlogId(blogId);
            }
            comment.setContent(DataUtil.safeToString(objects[4]));
            comment.setStatus(DataUtil.safeToInt(objects[5]));
            Date date = (Date) objects[6];
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd MMMM yyyy");
            comment.setCreateDate(simpleDateFormat.format(date));
            comment.setUserName(DataUtil.safeToString(objects[7]));
            commentList.add(comment);
        }
        return commentList;
    }

    @Override
    public List<CommentDTO> getListComment(ProductDTO productDTO) throws Exception {
        List<Comment> commentList = commentRepo.findAllByProductId(productDTO.getId());
        List<CommentDTO> commentDTOList = new ArrayList<>();
        for(Comment comment : commentList) {
            CommentDTO commentDTO = new CommentDTO();
            commentDTO.setId(comment.getId());
            commentDTO.setBlogId(comment.getBlogId());
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
            commentDTO.setCreateDate(simpleDateFormat.format(comment.getCreateDate()));
            User user = userRepo.getOne(comment.getUserId());
            commentDTO.setUserName(user.getFullName());
            commentDTO.setUserId(user.getId());
            commentDTO.setContent(comment.getContent());
            commentDTOList.add(commentDTO);
        }
        return commentDTOList;
    }

    @Override
    public String saveCommentProduct(Comment comment) throws Exception {
        String message;
        comment.setStatus(1);
        SimpleDateFormat simpleDateFormat = new SimpleDateFormat("yyyy-MM-dd HH:mm:ss");
        String setDate = simpleDateFormat.format(new Date());
        Date date = simpleDateFormat.parse(setDate);
        comment.setCreateDate(date);
        commentRepo.save(comment);
        message = Contains.SUCCESS;
        return message;
    }

    @Override
    public String updateComment(Comment comment) throws Exception {
        String message;
        commentRepo.updateComment(comment.getContent(), comment.getId());
        message = Contains.SUCCESS;
        return message;
    }

    @Override
    public Comment getById(Comment comment) throws Exception {
        Comment comment1 = commentRepo.getOne(comment.getId());
        return comment1;
    }

    @Override
    public List<CommentDTO> getByBlog(Comment comment) throws Exception {
        List<CommentDTO> commentDTOList = new ArrayList<>();
        List<Comment> list = commentRepo.findAllByBlogId(comment.getBlogId());
        List<User> userList = userRepo.findAll();
        Map<Long, String> mapUser = new HashMap<>();
        for(User user : userList) {
            mapUser.put(user.getId(), user.getFullName());
        }
        for(Comment comment1 : list) {
            CommentDTO commentDTO = new CommentDTO();
            commentDTO.setId(comment1.getId());
            commentDTO.setUserId(comment1.getUserId());
            commentDTO.setContent(comment1.getContent());
            SimpleDateFormat simpleDateFormat = new SimpleDateFormat("dd/MM/yyyy");
            String date = simpleDateFormat.format(comment1.getCreateDate());
            commentDTO.setCreateDate(date);
            commentDTO.setProductId(comment1.getProductId());
            commentDTO.setBlogId(comment1.getBlogId());
            commentDTO.setStatus(comment1.getStatus());
            commentDTO.setUserName(mapUser.get(comment1.getUserId()));
            commentDTOList.add(commentDTO);
        }
        return commentDTOList;
    }

    @Override
    public String deleteComment(Comment comment) throws Exception {
        String message;
        commentRepo.deleteById(comment.getId());
        message = Contains.SUCCESS;
        return message;
    }
}
