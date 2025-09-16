package com.report.repository;

import com.report.entities.StudentGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import com.report.entities.Assignment;

import java.util.List;

public interface AssignmentRepo extends  JpaRepository<Assignment, Long> {
    List<Assignment> findBystudentGroup(StudentGroup studentGroup);
}
