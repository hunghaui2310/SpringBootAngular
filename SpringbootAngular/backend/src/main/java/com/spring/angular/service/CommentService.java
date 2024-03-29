package com.spring.angular.service;

import com.spring.angular.dto.CommentDTO;
import com.spring.angular.dto.ProductDTO;
import com.spring.angular.model.Comment;

import java.util.List;

public interface CommentService {

    List<CommentDTO> getNotificationAdmin() throws Exception;

    List<CommentDTO> getListComment(ProductDTO productDTO) throws Exception;

    String saveCommentProduct(Comment comment) throws Exception;

    String updateComment(Comment comment) throws Exception;

    Comment getById(Comment comment) throws Exception;

    List<CommentDTO> getByBlog(Comment comment) throws Exception;

    String deleteComment(Comment comment) throws Exception;
}
