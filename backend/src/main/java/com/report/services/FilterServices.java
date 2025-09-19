package com.report.services;

import com.report.entities.StudentGroup;
import com.report.entities.User;

import java.util.List;

public interface FilterServices {
    List<User> sortUsersName(String order, String role);

    List<User> searchUserByName(String name,String role );

    List<StudentGroup> sortGroupByName(String order);

    List<StudentGroup> searchGroupByName(String name);

    List<StudentGroup> sortGroupByDomain(String order);

    List<StudentGroup> searchGroupByDomain(String domain);
}
