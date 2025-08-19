package com.report.repository;

import com.report.entities.AssignmentIteration;
import com.report.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.report.entities.User;

import java.util.List;

@Repository
public interface UserRepo extends  JpaRepository<User, Long> {

    List<User> findByRole(Role role);


    int countByRole(Role role);

    
}
