package com.report.services;

import com.report.entities.User;

import java.util.List;

public interface AdminService {

    List<User> getAllStudents();

    List<User> getAllSupervisors();

    int getTotalStudetns();
    int getTotalSupervisors();



}
