package com.spring.angular.service;

import com.spring.angular.dto.CommentDTO;
import com.spring.angular.model.Comment;

import java.util.List;

public interface CommentService {

    List<CommentDTO> getNotificationAdmin() throws Exception;
}
