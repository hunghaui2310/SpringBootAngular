package com.spring.angular.service.impl;

import com.spring.angular.model.User;
import com.spring.angular.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    public User saveUser(User user){
        return userRepo.saveAndFlush(user);
    }

    public User updateUser(User user){
        return userRepo.save(user);
    }

    public User findByUserName(String userName){
        return userRepo.findOneByUsername(userName);
    }
}
