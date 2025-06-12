package com.report.controller;
import java.util.List;

import com.report.DTOs.StrudentGroupDTO;
//import com.report.mapping.MappingCls;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.report.entities.StudentGroup;
import com.report.services.StudentGroupService;

@RestController
@RequestMapping("/api/groups")
public class StudentGroupController {

    private final StudentGroupService studentGroupService;
//    private final MappingCls mapper;

    @Autowired
    public StudentGroupController(StudentGroupService studentGroupService) {
        this.studentGroupService = studentGroupService;
//        this.mapper=mapper;
    }
//post the student in group
    @PostMapping
    public ResponseEntity<StudentGroup> createGroup(@RequestBody StrudentGroupDTO group) {
//        StudentGroup std= mapper.dtoToStudentGroup(group);
//        StudentGroup createdGroup = studentGroupService.createGroup(group);
//        StrudentGroupDTO obj= mapper.studentGroupToDTO(createdGroup);


        return new ResponseEntity<>(studentGroupService.createGroup(group), HttpStatus.CREATED);
    }

    //fetch the single group
    @GetMapping("/{id}")
    public ResponseEntity<StudentGroup> getGroup(@PathVariable Long id) {
        StudentGroup group = studentGroupService.getGroupById(id);
        return new ResponseEntity<>(group, HttpStatus.OK);
    }
    //fetch all group
    @GetMapping("/all")
    public ResponseEntity<List< StudentGroup>> getAll() {
        List<StudentGroup> group = studentGroupService.allGroups();
        return new ResponseEntity<>(group, HttpStatus.OK);
    }

    //update the group
    @PutMapping("/{id}")
    public ResponseEntity<StudentGroup> updateGroup(@PathVariable Long id, @RequestBody StudentGroup group) {
        StudentGroup updatedGroup = studentGroupService.updateGroup(id, group);
        return new ResponseEntity<>(updatedGroup, HttpStatus.OK);
    }

    //delete the group
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable Long id) {
        studentGroupService.deleteGroup(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
