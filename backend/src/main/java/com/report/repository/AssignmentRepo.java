package com.report.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.report.entities.Assignment;

public interface AssignmentRepo extends  JpaRepository<Assignment, Long> {
    
}
