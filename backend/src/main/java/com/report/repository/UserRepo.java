package com.report.repository;

import com.report.entities.AssignmentIteration;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import com.report.entities.User;

import java.util.List;

@Repository
public interface UserRepo extends  JpaRepository<User, Long> {


    
}
