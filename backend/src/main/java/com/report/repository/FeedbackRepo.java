package com.report.repository;

import com.report.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

import com.report.entities.Feedback;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

public interface FeedbackRepo extends  JpaRepository<Feedback, Long>{
  Feedback   findByAssignmentIterationId(Long id);
  @Query("SELECT COUNT(f) FROM Feedback f WHERE f.supervisor = :supervisor")
  Long  countBySupervisorId(@Param("supervisor") User user);
    
}
