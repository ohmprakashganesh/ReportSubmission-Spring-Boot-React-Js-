package com.report.controller;

import java.util.List;

import com.report.DTOs.StudentDto;
import com.report.DTOs.UserDTO;
import com.report.entities.StudentGroup;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import com.report.entities.User;
import com.report.services.UserService;


@RestController
@RequestMapping("/api/users")
@CrossOrigin("*")
public class UserController {

    private  UserService userService;

    public UserController(UserService userService) {
        this.userService = userService;
    }

    @PostMapping
    public ResponseEntity<User> createUser(@RequestBody UserDTO user) {
        User createdUser = userService.createUser(user);
        return new ResponseEntity<>(createdUser, HttpStatus.CREATED);
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


    @PutMapping("/{id}")
    public ResponseEntity<User> updateUser(@PathVariable Long id, @RequestBody User user) {
        User updatedUser = userService.updateUser(id, user);
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




    //admin controller
}
