package com.spring.angular.service.impl;

import com.spring.angular.dto.CommentDTO;
import com.spring.angular.dto.ProductDTO;
import com.spring.angular.helper.DataUtil;
import com.spring.angular.model.Comment;
import com.spring.angular.model.User;
import com.spring.angular.repository.CommentRepo;
import com.spring.angular.repository.UserRepo;
import com.spring.angular.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Date;
import java.util.List;

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
}
