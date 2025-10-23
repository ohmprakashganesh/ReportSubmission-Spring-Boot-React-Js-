package com.report.ReportDto;

import com.report.entities.Assignment;
import com.report.entities.Role;
import com.report.entities.StudentGroup;
import com.report.entities.User;
import com.report.repository.AssignmentRepo;
import com.report.repository.StudentGroupRepo;
import com.report.repository.UserRepo;
import com.report.services.StudentGroupService;
import com.report.services.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@RestController
@RequestMapping("/api/report")
@RequiredArgsConstructor
public class ReportController {
    private final StudentGroupRepo studentGroupRepo;
    private final AssignmentRepo assignmentRepo;
    private  final UserRepo userRepo;


    @GetMapping("/groups")
    public ResponseEntity<List<GroupReport>> ReportStudents() {
        List<StudentGroup> group = studentGroupRepo.findAll();
        return new ResponseEntity<>(group.stream().map(ReportMapper::GroupToDto).collect(Collectors.toList()), HttpStatus.OK);
    }
    @GetMapping("/assignments")
    public List<AssignmentReport> getAllAssignments() {
       List< Assignment> assignment=assignmentRepo.findAll();
        return  assignment.stream().map(ReportMapper::assignToDto).collect(Collectors.toList());
    }
    @GetMapping("/supervisor")
    public  ResponseEntity<List<SupervisorReport>> usersByRole(){
        List<User> user= userRepo.findByRole(Role.SUPERVISER);

        return  new ResponseEntity<>(user.stream().map(ReportMapper::userToDto).collect(Collectors.toList()), HttpStatus.OK);
    }


}
