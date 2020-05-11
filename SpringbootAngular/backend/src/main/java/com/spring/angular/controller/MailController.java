package com.spring.angular.controller;

import com.spring.angular.dto.UserDTO;
import com.spring.angular.helper.ApiResponse;
import com.spring.angular.helper.Contains;
import com.spring.angular.helper.SendMail;
import com.spring.angular.model.User;
import com.spring.angular.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.MailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.web.bind.annotation.*;

import javax.mail.internet.MimeMessage;
import javax.servlet.http.HttpServletResponse;

@RestController
@RequestMapping("mail")
public class MailController {

    @Autowired
    private JavaMailSender javaMailSender;

    @Autowired
    private UserRepo userRepo;

    @PostMapping("/forgot-password")
    public ApiResponse sendMail(@RequestBody UserDTO userDTO) {
        try {
            String message;
            User user = userRepo.findOneByUsername(userDTO.getUsername());
            if (user == null) {
                message = Contains.NOT_EXIST;
            } else {
//                String from = Contains.MAIL.MAIL_HUNG;
//                String to = userDTO.getUsername();
//                Integer math = (int) ((Math.random() * 9999) + 1000);
//                String title = Contains.MAIL.MAIL_CONTENT + math;
//                String content = Contains.MAIL.MAIL_TITLE;
//
//                MimeMessage mimeMessage = javaMailSender.createMimeMessage();
//                MimeMessageHelper helper = new MimeMessageHelper(mimeMessage);
//                helper.setFrom(from, from);
//                helper.setTo(to);
//                helper.setSubject(content);
//                helper.setText(title);
//
//                javaMailSender.send(mimeMessage);
//                message = math.toString();
                String to = userDTO.getUsername();
                message = SendMail.sendmail(to);
            }
            return ApiResponse.build(HttpServletResponse.SC_OK, true, "", message);
        } catch (Exception e) {
            e.printStackTrace();
            return ApiResponse.build(HttpServletResponse.SC_INTERNAL_SERVER_ERROR, false, e.getMessage(), null);
        }
    }
}
