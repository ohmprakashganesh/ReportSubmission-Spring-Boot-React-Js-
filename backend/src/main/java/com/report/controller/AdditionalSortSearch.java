package com.report.controller;

import com.report.entities.Assignment;
import com.report.entities.StudentGroup;
import com.report.entities.User;
import com.report.services.AssignmentService;
import com.report.services.FilterServices;
import com.report.services.StudentGroupService;
import com.report.services.UserService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
@RestController
@RequestMapping("/api/filter")
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
public class AdditionalSortSearch {

    private FilterServices filterServices;


    public AdditionalSortSearch(FilterServices filterServices) {
        this.filterServices=filterServices;
    }


    //this is for search user based on name and role
    @GetMapping("/searchUserByNameRole/{name}/{role}")
    public ResponseEntity<List<User>> sortStudentsByName(@PathVariable String name, @PathVariable String role) {
        List< User> user = filterServices.searchUserByName(name,role);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    //this is for sorting based on name

    @GetMapping("/sortUsersByName/{role}/{order}")
    public ResponseEntity<List<User>> sortUsers(@PathVariable String order,@PathVariable String role) {
        List< User> user = filterServices.sortUsersName(order,role);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }




    //this is for group

    //this is by group name

    @GetMapping("/sortGrpByName/{order}")
    public ResponseEntity<List<StudentGroup>> sortGroupByName(@PathVariable String order) {
        List< StudentGroup> user = filterServices.sortGroupByName(order);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @GetMapping("/searchGrpByName/{name}")
    public ResponseEntity<List<StudentGroup>> searchGroupByName(@PathVariable String name) {
        List< StudentGroup> user = filterServices.searchGroupByName(name);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }




    @GetMapping("/sortGrpByDomain/{order}")
    public ResponseEntity<List<StudentGroup>> sortGroupByDomain(@PathVariable String order) {
        List< StudentGroup> user = filterServices.sortGroupByDomain(order);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/searchGrpByDomain/{domain}")
    public ResponseEntity<List<StudentGroup>> searchGroupByDomain(@PathVariable String domain) {
        List< StudentGroup> user = filterServices.searchGroupByDomain(domain);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
//
//
//
//    //this is group by domain
//
//    @GetMapping("/sortGrpByDomain/{name}")
//    public ResponseEntity<List<StudentGroup>> sortGroupByDomain(@PathVariable String name) {
//        List< StudentGroup> user = studentGroupService.sortGroupByDomain(name);
//        return new ResponseEntity<>(user, HttpStatus.OK);
//    }
//    @GetMapping("/searchGrpByName/{name}")
//    public ResponseEntity<List<StudentGroup>> searchGroupByDomain(@PathVariable String name) {
//        List< StudentGroup> user = studentGroupService.searchGroupByDomain(name);
//        return new ResponseEntity<>(user, HttpStatus.OK);
//    }
//
//
//    //assignment fetching
//    @GetMapping("/sortAssignByName/{name}")
//    public ResponseEntity<List<Assignment>> searchAssignmentsByName(@PathVariable String name) {
//        List< Assignment> user = assignmentService.searchAssignmentsByName(name);
//        return new ResponseEntity<>(user, HttpStatus.OK);
//    }
//    @GetMapping("/searchAssignByName/{name}")
//    public ResponseEntity<List<Assignment>> sortAssignmentsByName(@PathVariable String name) {
//        List< Assignment> user = assignmentService.sortAssignmentsByName(name);
//        return new ResponseEntity<>(user, HttpStatus.OK);
//    }
}
