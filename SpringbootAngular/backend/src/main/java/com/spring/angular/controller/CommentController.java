package com.spring.angular.controller;

import com.spring.angular.dto.CommentDTO;
import com.spring.angular.dto.ProductDTO;
import com.spring.angular.helper.ApiResponse;
import com.spring.angular.model.Comment;
import com.spring.angular.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("comment")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @PostMapping("/getByProduct")
    public ApiResponse getCommentByProductId(@RequestBody ProductDTO productDTO) throws Exception {
        try {
            List<CommentDTO> list = commentService.getListComment(productDTO);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", list);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }

    @PostMapping("/saveCommentProduct")
    public ApiResponse saveCommentProduct(@RequestBody Comment comment) throws Exception {
        try {
            String message = commentService.saveCommentProduct(comment);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", message);
        }catch (Exception e) {
           e.printStackTrace();
           return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }

    @PostMapping("/updateComment")
    public ApiResponse updateComment(@RequestBody Comment comment) throws Exception {
        try {
            String message = commentService.updateComment(comment);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", message);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }

    @PostMapping("/getById")
    public ApiResponse getByCommentId(@RequestBody Comment comment) throws Exception {
        try {
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", commentService.getById(comment));
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }

    @PostMapping("/getByBlog")
    public ApiResponse getByBlog(@RequestBody Comment comment) throws Exception {
        try {
            List<CommentDTO> list = commentService.getByBlog(comment);
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", list);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }

    @PostMapping("/delete")
    public ApiResponse deleteComment(@RequestBody Comment comment) throws Exception {
        try {
             String message = commentService.deleteComment(comment);
             return ApiResponse.build(HttpServletResponse.SC_OK, true, "", message);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }
}
