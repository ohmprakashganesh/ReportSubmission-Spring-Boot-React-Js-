package com.report.services;

import java.util.List;

import com.report.DTOs.StudentDto;
import com.report.DTOs.UserDTO;
import com.report.entities.Role;
import com.report.entities.StudentGroup;
import com.report.entities.User;
import com.report.response.ResponseUser;

public interface UserService {
    User createUser(UserDTO user);
    User getUserById(Long id);
    User updateUser(Long id, User user);
    void deleteUser(Long id);
     List< User> getUsers();


    StudentGroup getGroupsOfUser(Long id);

    List<User> UsersByGroupId(Long id);
    StudentDto getStudetnById(Long id);

    List<User> getAllSupervisors();

    List<User> getAllStudents();

    List<User> allUsersByrole(String role);

    List<User> allSupervisedStudents(Long id);
}
