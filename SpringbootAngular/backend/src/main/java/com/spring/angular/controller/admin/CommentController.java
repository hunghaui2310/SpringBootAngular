package com.spring.angular.controller.admin;

import com.spring.angular.dto.CommentDTO;
import com.spring.angular.helper.ApiResponse;
import com.spring.angular.service.CommentService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.servlet.http.HttpServletResponse;
import java.util.List;

@RestController
@RequestMapping("admin-notification")
public class CommentController {

    @Autowired
    private CommentService commentService;

    @GetMapping("/getNotification")
    public ApiResponse getSomeNotification() throws Exception {
        try {
            List<CommentDTO> list = commentService.getNotificationAdmin();
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", list);
        } catch (Exception e){
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }
}
