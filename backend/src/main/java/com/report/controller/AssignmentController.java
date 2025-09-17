package com.report.controller;

import com.report.DTOs.AssignmentDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.report.entities.Assignment;
import com.report.services.AssignmentService;
import org.springframework.web.multipart.MultipartFile;

import java.util.List;

@RestController
@RequestMapping("/api/assignments")
@CrossOrigin("*")
public class AssignmentController {

    private final AssignmentService assignmentService;

    @Autowired
    public AssignmentController(AssignmentService assignmentService) {
        this.assignmentService = assignmentService;
    }

    //Post the Assignment
    @PostMapping
    public ResponseEntity<Assignment> createAssignment(@ModelAttribute AssignmentDTO assignment) {
        MultipartFile file= assignment.getFile();
        Assignment createdAssignment = assignmentService.createAssignment(assignment);
        return new ResponseEntity<>(createdAssignment, HttpStatus.CREATED);
    }
    //fetch single  assignment
    @GetMapping("/{id}")
    public ResponseEntity<Assignment> getAssignment(@PathVariable Long id) {
        Assignment assignment = assignmentService.getAssignmentById(id);
        return new ResponseEntity<>(assignment, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity<List<Assignment>> getAll() {
        List< Assignment> assignment = assignmentService.getAssignmentAll();
        return new ResponseEntity<>(assignment, HttpStatus.OK);
    }
    //update the assignment
    @PutMapping("/{id}")
    public ResponseEntity<Assignment> updateAssignment(@PathVariable Long id, @ModelAttribute AssignmentDTO assignment) {
        Assignment updatedAssignment = assignmentService.updateAssignment(id, assignment);
        return new ResponseEntity<>(updatedAssignment, HttpStatus.OK);
    }
    //Delete Assignment
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteAssignment(@PathVariable Long id) {
        assignmentService.deleteAssignment(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/assignmentsOfGroup")
    public ResponseEntity<List<Assignment>> assignmentsOfGroup() {
     List<Assignment> assignment = assignmentService.assignmentsOfGroup();
        return new ResponseEntity<>(assignment, HttpStatus.OK);
    }


}
