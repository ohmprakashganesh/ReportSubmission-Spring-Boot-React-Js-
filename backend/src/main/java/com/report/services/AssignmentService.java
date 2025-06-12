package com.report.services;

import com.report.DTOs.AssignmentDTO;
import com.report.entities.Assignment;

import java.util.List;

public interface AssignmentService {
    Assignment createAssignment(AssignmentDTO assignment);
    Assignment getAssignmentById(Long id);
      List<Assignment>  getAssignmentAll();
    Assignment updateAssignment(Long id, Assignment assignment);
    void deleteAssignment(Long id);
}
