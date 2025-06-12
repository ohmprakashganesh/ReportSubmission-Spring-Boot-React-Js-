package com.report.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.report.entities.StudentGroup;

import java.util.Optional;

public interface StudentGroupRepo extends  JpaRepository<StudentGroup, Long> {
    Optional< StudentGroup> findByName(String groupName);

}
