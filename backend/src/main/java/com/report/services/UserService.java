package com.report.services;

import java.util.List;

import com.report.DTOs.UserDTO;
import com.report.entities.User;

public interface UserService {
    User createUser(UserDTO user);
    User getUserById(Long id);
    User updateUser(Long id, User user);
    void deleteUser(Long id);
     List< User> getUsers();
}
