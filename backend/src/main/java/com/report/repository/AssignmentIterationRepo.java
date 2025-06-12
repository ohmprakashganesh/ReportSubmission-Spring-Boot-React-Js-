package com.report.repository;

import com.report.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import com.report.entities.AssignmentIteration;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface AssignmentIterationRepo extends  JpaRepository<AssignmentIteration, Long> {

    @Query("SELECT a FROM AssignmentIteration a WHERE a.submittedBy = :user")
    List<AssignmentIteration> findByUser(User user);
}
