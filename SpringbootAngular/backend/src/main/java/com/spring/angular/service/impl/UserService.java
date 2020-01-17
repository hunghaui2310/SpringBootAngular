package com.spring.angular.service.impl;

import com.spring.angular.model.User;
import com.spring.angular.repository.CartRepo;
import com.spring.angular.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private CartRepo cartRepo;

    public User saveUser(User user) throws Exception {
        User user1 = userRepo.saveAndFlush(user);
        Long cartId = cartRepo.getLastCartId();
        cartRepo.saveUserCart(user1, cartId + 1);
        return user1;
    }

    public User updateUser(User user){
        return userRepo.save(user);
    }

    public User findByUserName(String userName){
        return userRepo.findOneByUsername(userName);
    }
}
