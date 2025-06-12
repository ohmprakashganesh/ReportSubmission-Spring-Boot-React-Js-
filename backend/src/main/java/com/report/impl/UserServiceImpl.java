package com.report.impl;

import java.util.List;
import java.util.Optional;

import com.report.DTOs.UserDTO;
import com.report.entities.Role;
import com.report.exceptional.UserNotFound;
import org.springframework.stereotype.Service;

import com.report.entities.User;
import com.report.repository.UserRepo;
import com.report.services.UserService;


@Service
public class UserServiceImpl implements UserService {
    
    private final  UserRepo userRepository;

  
    public UserServiceImpl(UserRepo userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public User createUser(UserDTO user) {
        User usr= new User();
        usr.setRole(user.getRole());
        usr.setName(user.getName());
        usr.setPassword(user.getPassword());
        usr.setEmail(user.getEmail());


        return   userRepository.save(usr);
    }


    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFound("User not found"));
    }

    @Override
    public User updateUser(Long id, User temp) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFound("User not found");
        }

        Optional<User> updated = userRepository.findById(id);
        User user= updated.get();
        user.setName(temp.getName());
        user.setRole(temp.getRole());
        user.setGroup(temp.getGroup());
        return userRepository.save(user);
    }

    @Override
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<User> getUsers() {
        List<User> user =userRepository.findAll();
        return  user;
    }
     
}
