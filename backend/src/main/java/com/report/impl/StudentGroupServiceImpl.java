package com.report.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

import com.report.DTOs.StrudentGroupDTO;
import com.report.entities.User;
//import com.report.mapping.MappingCls;
import com.report.mapping.MappingCls;
import com.report.repository.UserRepo;
import org.springframework.stereotype.Service;

import com.report.entities.StudentGroup;
import com.report.repository.StudentGroupRepo;
import com.report.services.StudentGroupService;

@Service
public class StudentGroupServiceImpl implements StudentGroupService {

    private final StudentGroupRepo studentGroupRepository;
    private  final MappingCls mapper;
    private  final UserRepo userRepo;

    public StudentGroupServiceImpl(UserRepo userRepo, StudentGroupRepo studentGroupRepository,MappingCls mapper) {
        this.studentGroupRepository = studentGroupRepository;
        this.mapper=mapper;
        this.userRepo=userRepo;
    }


    @Override
    public StudentGroup createGroup(StrudentGroupDTO dto) {
        StudentGroup createdGroup=new StudentGroup();
        StudentGroup obj=new StudentGroup();
        obj.setName(dto.getGroupName());

//        fetch and set st
        User supervisor=new User();
        //fetch and set supervisor
        Optional<User> opt= userRepo.findById(dto.getSupervisorId());
        if(opt.isPresent()){
            supervisor=opt.get();
        }
        obj.setSupervisor(supervisor);
        createdGroup = studentGroupRepository.save(obj);


         //save the group in user table
//        List<User> students=new ArrayList<>();
        List<Long> stds=dto.getStdIds();
        List<User> objs=new ArrayList<>();

        //for fetching the students and save
        for(Long id : stds){
            Optional<User> opt2= userRepo.findById(id);
            if(opt2.isPresent()){
             User user =  opt2.get();
             user.setGroup(createdGroup);
                userRepo.save(user);
            }
        }



   return  createdGroup;



    }

    @Override
    public StudentGroup getGroupById(Long id) {
        return studentGroupRepository.findById(id).orElseThrow(() -> new RuntimeException("Group not found"));
    }

    @Override
    public StudentGroup updateGroup(Long id, StudentGroup group) {
        StudentGroup gru= studentGroupRepository.findById(id).orElseThrow(()-> new RuntimeException("not found with id "+id) );
        gru.setName(group.getName());
        gru.setStudents(group.getStudents());
        gru.setAssignments(group.getAssignments());
        gru.setSupervisor(group.getSupervisor());
        return studentGroupRepository.save(gru);
    }

    @Override
    public void deleteGroup(Long id) {
       Optional< User> usr= userRepo.findById(id);
       if(usr.isPresent()){
           User user= usr.get();
           user.setGroup(null);
           userRepo.save(user);
       }

        studentGroupRepository.deleteById(id);
        System.out.println("deleted successfully ");
    }

    @Override
    public List<StudentGroup> allGroups() {
      return  studentGroupRepository.findAll();
        
    }
}
