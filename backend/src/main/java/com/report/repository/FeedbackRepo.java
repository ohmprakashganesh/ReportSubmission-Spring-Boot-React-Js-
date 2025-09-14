package com.report.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.report.entities.Feedback;

public interface FeedbackRepo extends  JpaRepository<Feedback, Long>{
  Feedback   findByAssignmentIterationId(Long id);
    
}
