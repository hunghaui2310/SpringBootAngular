package com.spring.angular.service.impl;

import com.spring.angular.dto.UserDTO;
import com.spring.angular.dto.WishListDTO;
import com.spring.angular.helper.Contains;
import com.spring.angular.helper.DataUtil;
import com.spring.angular.model.User;
import com.spring.angular.repository.CartRepo;
import com.spring.angular.repository.UserCartRepo;
import com.spring.angular.repository.UserRepo;
import com.spring.angular.repository.WishListRepoCustom;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service
public class UserService {

    @Autowired
    private UserRepo userRepo;

    @Autowired
    private UserCartRepo userCartRepo;

    @Autowired
    private WishListRepoCustom wishListRepo;

    private PasswordEncoder passwordEncoder;

    @Autowired
    public void setPasswordEncoder(PasswordEncoder passwordEncoder) {
        this.passwordEncoder = passwordEncoder;
    }

    public User saveUser(User user) throws Exception {
        User user1 = userRepo.saveAndFlush(user);
        Long cartId = userCartRepo.getLastCartId();
        userCartRepo.saveUserCart(user1, cartId + 1);
        WishListDTO wishListDTO = new WishListDTO();
        wishListDTO.setUserId(user1.getId());
        wishListDTO.setWishListId(user1.getId());
        wishListRepo.insertUserWishList(wishListDTO);
        return user1;
    }

    public String updateUser(UserDTO userDTO) throws Exception {
        String message;
        User user = new User();
        boolean checkDuplicate = userCartRepo.checkDuplicateUser(userDTO.getEmail(), userDTO.getId(), Contains.UPDATE);
        if (!checkDuplicate) {
            user.setUsername(userDTO.getEmail());
            user.setPhoneNumber(userDTO.getPhoneNumber());
            user.setAddress(userDTO.getAddress());
            user.setFullName(userDTO.getLastName() + userDTO.getFirstName());
            user.setPassword(passwordEncoder.encode(userDTO.getPassword()));
            userRepo.save(user);
            message = Contains.SUCCESS;
        } else {
            message = Contains.DUPLICATE;
        }
        return message;
    }

    public User findByUserName(String userName){
        return userRepo.findOneByUsername(userName);
    }

    public UserDTO getDataUser(Long userId) throws Exception{
        UserDTO userDTO = new UserDTO();
        User user = userRepo.getOne(userId);
        userDTO.setId(user.getId());
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

    public boolean checkPassword(String email, String password) {
        User user = findByUserName(email);
        return passwordEncoder.matches(password, user.getPassword());
    }
}
