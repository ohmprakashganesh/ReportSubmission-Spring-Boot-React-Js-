package com.report.controller;
import java.util.List;
import java.util.Optional;

import com.report.DTOs.StrudentGroupDTO;
//import com.report.mapping.MappingCls;
import com.report.DTOs.StudentGroupDetailDTO;
import com.report.response.GroupResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.report.entities.StudentGroup;
import com.report.services.StudentGroupService;

@RestController
@RequestMapping("/api/groups")
@CrossOrigin("*")
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
        return new ResponseEntity<>(studentGroupService.createGroup(group), HttpStatus.CREATED);
    }


//    @GetMapping("/{id}")
//    public ResponseEntity<Optional<StudentGroup>>  getGroupNew(@PathVariable Long id) {
//        Optional< StudentGroup> group = studentGroupService.findGroupWithStudentsAndSupervisor(id);
//        return new ResponseEntity<>(group, HttpStatus.OK);
//    }

    //fetch all group
    @GetMapping("/all")
    public ResponseEntity<List< StudentGroup>> getAll() {
        List<StudentGroup> group = studentGroupService.allGroups();
        return new ResponseEntity<>(group, HttpStatus.OK);
    }

    //update the group
    @PutMapping("/{id}")
    public ResponseEntity<StudentGroup> updateGroup(@PathVariable Long id, @RequestBody StrudentGroupDTO group) {
        StudentGroup updatedGroup = studentGroupService.updateGroup(id, group);
        return new ResponseEntity<>(updatedGroup, HttpStatus.OK);
    }

    //delete the group
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGroup(@PathVariable Long id) {
        studentGroupService.deleteGroup(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/groupDetails/{id}")
    public  ResponseEntity<StudentGroupDetailDTO> groupWithStdAndSupervisor (@PathVariable Long id ){
        return  new ResponseEntity<>(studentGroupService.findGroupWithStudentsAndSupervisor(id),HttpStatus.OK);
    }

    //get assignments of single group
    @GetMapping("/assignmentByGroupId/{id}")
    public  ResponseEntity<GroupResponse> getAssignmentById(@PathVariable Long id){
        return  new ResponseEntity<>(studentGroupService.getAssignMents(id),HttpStatus.OK);
    }
}
