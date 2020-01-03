package com.spring.angular.controller;

import com.spring.angular.helper.Contains;
import com.spring.angular.helper.CustomErrorType;
import com.spring.angular.model.User;
import com.spring.angular.service.impl.UserService;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.security.Principal;

@RestController
@RequestMapping("account")
public class UserController {
    private PasswordEncoder passwordEncoder;

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    @Autowired
    private UserService userService;

    public static final Logger logger = LoggerFactory.getLogger(UserController.class);

    @PostMapping("/register")
    public ResponseEntity<?> createUser(@RequestBody User newUser){
        User user1 = userService.findByUserName(newUser.getUsername());
        if(user1 != null){
            logger.error("User Name Already exist " + newUser.getUsername());
            return new ResponseEntity(
                    new CustomErrorType("user with username " + newUser.getUsername() + "already exist "),
                    HttpStatus.CONFLICT);
        }else {
            newUser.setPassword(passwordEncoder.encode(newUser.getPassword()));
            newUser.setRole(Contains.USER);
            User user = userService.saveUser(newUser);
            return new ResponseEntity<User>(user, HttpStatus.CREATED);
        }
    }

    @RequestMapping("/login")
    public Principal login(Principal principal){
        logger.info("USER LOGGED" + principal);
        return principal;
    }
}
