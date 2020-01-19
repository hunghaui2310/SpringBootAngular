package com.spring.angular.service.impl;

import com.spring.angular.dto.UserDTO;
import com.spring.angular.helper.DataUtil;
import com.spring.angular.model.User;
import com.spring.angular.repository.CartRepo;
import com.spring.angular.repository.UserCartRepo;
import com.spring.angular.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private UserCartRepo userCartRepo;

    public User saveUser(User user) throws Exception {
        User user1 = userRepo.saveAndFlush(user);
        Long cartId = userCartRepo.getLastCartId();
        userCartRepo.saveUserCart(user1, cartId + 1);
        return user1;
    }

    public User updateUser(User user){
        return userRepo.save(user);
    }

    public User findByUserName(String userName){
        return userRepo.findOneByUsername(userName);
    }

    public UserDTO getDataUser(Long userId) throws Exception{
        UserDTO userDTO = new UserDTO();
        User user = userRepo.getOne(userId);
        userDTO.setUserId(user.getId());
        if(!DataUtil.isNullOrEmpty(user.getFullName())) {
            String fullName = user.getFullName();
            String[] input = fullName.split("\\s");
            userDTO.setFirstName(input[0]);
            if(input.length > 1) {
                userDTO.setLastName(input[1]);
            }
        }
        userDTO.setEmail(user.getUsername());
        return userDTO;
    }
}
