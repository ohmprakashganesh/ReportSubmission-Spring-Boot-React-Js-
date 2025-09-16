package com.report.services;

import com.report.DTOs.AssignmentDTO;
import com.report.entities.Assignment;
import com.report.impl.FileServiceAssignment;
import org.springframework.expression.spel.ast.Assign;

import java.util.List;

public interface AssignmentService {
    Assignment createAssignment(AssignmentDTO assignment);


    List<Assignment> assignmentsOfGroup();

    Assignment getAssignmentById(Long id);

    List<Assignment>  getAssignmentAll();
    Assignment updateAssignment(Long id, AssignmentDTO assignment);
    void deleteAssignment(Long id);
}
