package com.report.impl;

import com.report.entities.Role;
import com.report.entities.User;
import com.report.repository.UserRepo;
import com.report.services.AdminService;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service
public class AdminServiceImpl  implements AdminService {

    private  final UserRepo repo;

    @Override
    public List<User> getAllStudents() {
        return  repo.findByRole(Role.STUDENT);
    }

    @Override
    public List<User> getAllSupervisors() {
        return  repo.findByRole(Role.SUPERVISER);

    }
    @Override
    public int getTotalStudetns() {
        return  repo.countByRole(Role.STUDENT);
    }

    @Override
    public int getTotalSupervisors() {
        return repo.countByRole(Role.SUPERVISER);
    }
}
