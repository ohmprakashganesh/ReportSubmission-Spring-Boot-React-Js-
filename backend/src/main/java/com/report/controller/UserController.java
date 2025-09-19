package com.report.controller;

import java.util.List;

import com.report.AuthDTOs.AuthResponse;
import com.report.DTOs.StudentDto;
import com.report.DTOs.UserDTO;
import com.report.entities.StudentGroup;
import com.report.repository.UserRepo;
import com.report.services.UserProjection;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.report.entities.User;
import com.report.services.UserService;


@RestController
@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
@RequestMapping("/api/users")
public class UserController {

    private  UserService userService;
    private UserRepo userRepo;

    public UserController(UserService userService,UserRepo userRepo) {
        this.userService = userService;
        this.userRepo=userRepo;
    }

    @GetMapping("/profile")
    @Transactional
    public ResponseEntity <User> getLoggedUser(){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email= authentication.getName();
        User user= userRepo.findByEmail(email).orElseThrow(()-> new RuntimeException("user not found"));
        return ResponseEntity.ok(user);

    }

    @GetMapping("/{id}")
    public ResponseEntity<User> getUser(@PathVariable Long id) {
        User user = userService.getUserById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/student/{id}")
    public ResponseEntity<StudentDto> getStudent(@PathVariable Long id) {
        StudentDto user = userService.getStudetnById(id);
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/all")
    public ResponseEntity< List<User>> getAllUsers() {
        List< User> user = userService.getUsers();
        return new ResponseEntity<>(user, HttpStatus.OK);
    }

    @GetMapping("/students/all")
    public ResponseEntity< List<User>> getAllStudents() {
        List< User> user = userService.getAllStudents();
        return new ResponseEntity<>(user, HttpStatus.OK);
    }
    @GetMapping("/supervisors/all")
    public ResponseEntity< List<User>> getAllSupervisor() {
        List< User> user = userService.getAllSupervisors();
        return new ResponseEntity<>(user, HttpStatus.OK);
    }


    @PutMapping("/{id}")
    public ResponseEntity<UserDTO> updateUser(@PathVariable Long id, @RequestBody UserDTO user) {
        UserDTO updatedUser = userService.updateUser(id, user);
        return new ResponseEntity<>(updatedUser, HttpStatus.OK);
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUser(@PathVariable Long id) {
        userService.deleteUser(id);
        return new ResponseEntity<>(HttpStatus.OK);
    }

    @GetMapping("/groupsOfUser")
    public ResponseEntity<StudentGroup> groupsOfOfUser(){
        return  new ResponseEntity<>( userService.getGroupsOfUser(8L), HttpStatus.OK);
    }

    @GetMapping("/usersByGroup/{id}")
    public  ResponseEntity<List<User>> usersByGroupId(@PathVariable Long id){
        return  new ResponseEntity<>(userService.UsersByGroupId(id),HttpStatus.OK);
    }
    @GetMapping("/usersByRole/{role}")
    public  ResponseEntity<List<User>> usersByRole(@PathVariable String role){
        return  new ResponseEntity<>(userService.allUsersByrole(role),HttpStatus.OK);
    }

    @GetMapping("/SupervisedStudents/{id}")
    public  ResponseEntity<List<User>> supervisedStudentsBysupervisor(@PathVariable Long id){
        return  new ResponseEntity<>(userService.allSupervisedStudents(id),HttpStatus.OK);
    }

    @GetMapping("/StudentsOfGroup/{id}")
    public  ResponseEntity<List<User>> StudentsOfGroup(@PathVariable Long id){
        return  new ResponseEntity<>(userService.allStudentsOfGroup(id),HttpStatus.OK);
    }

    //admin controller
}
