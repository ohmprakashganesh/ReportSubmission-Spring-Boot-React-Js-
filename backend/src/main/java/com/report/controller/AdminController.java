package com.report.controller;

import com.report.entities.StudentGroup;
import com.report.entities.User;
import com.report.services.AdminService;
import com.report.services.StudentGroupService;
import com.report.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/admin")
public class AdminController {


    private AdminService adminService;
    private StudentGroupService group;

    public AdminController(AdminService adminService, StudentGroupService group) {
        this.adminService = adminService;
        this.group=group;
    }



    //all students (create , update , delete)
    //all supervisor (create , update , delete)
    //all groups  (create , update , delete)
    //total students
    //total supervisor


    @GetMapping("/get/students")
    public ResponseEntity<List<User>> getStudents(){
        return  ResponseEntity.ok(adminService.getAllStudents());
    }

    @GetMapping("/get/supervisors")
    public ResponseEntity<List<User>> getAllSupervisors(){
        return  ResponseEntity.ok(adminService.getAllSupervisors());
    }

    @GetMapping("/get/groups")
    public ResponseEntity<List<StudentGroup>> getGroups(){
        return  ResponseEntity.ok(group.allGroups());
    }

    @GetMapping("/get/totalUsers")
    public ResponseEntity<Integer> getTotalStudents(){
        return  ResponseEntity.ok(adminService.getTotalStudetns());
    }

    @GetMapping("/get/totalGroups")
    public ResponseEntity<Integer> getSupervisors(){
        return  ResponseEntity.ok(adminService.getTotalSupervisors());
    }


}
