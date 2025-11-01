package com.report.impl;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

import com.report.DTOs.*;
import com.report.authServices.LoggedUser;
import com.report.entities.Domain;
import com.report.entities.User;
//import com.report.mapping.MappingCls;
import com.report.mapping.MappingCls;
import com.report.repository.UserRepo;
import com.report.response.GroupResponse;
import org.springframework.stereotype.Service;

import com.report.entities.StudentGroup;
import com.report.repository.StudentGroupRepo;
import com.report.services.StudentGroupService;

@Service
public class StudentGroupServiceImpl implements StudentGroupService {

    private final StudentGroupRepo studentGroupRepository;
    private  final MappingCls mapper;
    private  final UserRepo userRepo;

    private  final LoggedUser loggedUser;

    public StudentGroupServiceImpl(UserRepo userRepo,LoggedUser loggedUser, StudentGroupRepo studentGroupRepository,MappingCls mapper) {
        this.studentGroupRepository = studentGroupRepository;
        this.loggedUser=loggedUser;
        this.mapper=mapper;
        this.userRepo=userRepo;
    }



//    @Override
//    public StudentGroupResponse ResponseGroup() {
//       List< StudentGroup> std= studentGroupRepository.findAll();
//        MappingCls.studentGrpToDto(std);
//    }

    @Override
    public StudentGroup createGroup(StrudentGroupDTO dto) {
        StudentGroup obj = new StudentGroup();
        obj.setName(dto.getGroupName());
        obj.setDomain(Domain.valueOf(dto.getDomain()));
        List<User> stdsObj = new ArrayList<>();

        for (Long temp : dto.getStdIds()) {
            Optional<User> usr = userRepo.findById(temp);
            if (usr.isPresent()) {
                User student = usr.get();
                student.setGroup(obj); // ✅ set reverse relationship
                stdsObj.add(student);
            }
        }

        obj.setStudents(stdsObj);

        // ✅ set supervisor
        Optional<User> opt = userRepo.findById(dto.getSupervisorId());
        opt.ifPresent(obj::setSupervisor);

        // ✅ Save the group first (this gives it an ID)
        StudentGroup createdGroup = studentGroupRepository.save(obj);

        // ✅ Save the students with updated group info
        for (User student : stdsObj) {
            userRepo.save(student);
        }

        return createdGroup;
    }


    @Override
    public StudentGroup getGroupById(Long id) {
        return studentGroupRepository.findById(id).orElseThrow(() -> new RuntimeException("Group not found"));
    }


    @Override
    public StudentGroup updateGroup(Long id, StrudentGroupDTO group) {
        if (group == null) {
            throw new RuntimeException("object not found");
        }

        StudentGroup gru = studentGroupRepository.findById(id)
                .orElseThrow(() -> new RuntimeException("not found with id " + id));

        gru.setName(group.getGroupName());
        gru.setDomain(Domain.valueOf(group.getDomain()));

        List<User> stds = group.getStdIds().stream()
                .map(stdId -> userRepo.findById(stdId)
                        .orElseThrow(() -> new RuntimeException("Student not found with ID " + stdId)))
                .collect(Collectors.toList());

        for (User usr : stds) {
            usr.setGroup(gru);
            userRepo.save(usr);
        }

        Optional<User> sup = userRepo.findById(group.getSupervisorId());
        sup.ifPresent(gru::setSupervisor);

        gru.setStudents(stds);

      if(studentGroupRepository.save(gru) !=null){
         return studentGroupRepository.findById(id)
                  .orElseThrow(() -> new RuntimeException("not found with id " + id));

      }
      return  null;
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
    public StudentGroupDetailDTO findGroupWithStudentsAndSupervisor(Long id) {
        Optional< StudentGroup> grp=studentGroupRepository.findGroupWithStudentsAndSupervisor(id);
        if(grp.isPresent()){
            return  MappingCls.studentGrpToDto(grp.get());
        }else{
            return null;
        }
    }

    @Override
    public GroupResponse getAssignMents(Long id) {
      Optional<StudentGroup> grp = studentGroupRepository.findById(id);
        GroupResponse resp= new GroupResponse();

        if(grp.isPresent()){
          resp.setAssignments(grp.get().getAssignments());
      }
        return resp;
    }



    @Override
    public GroupWithStdSup findGroupWithStdSup(Long id) {
       Optional<StudentGroup> gru=studentGroupRepository.findById(id);


       List<StudentD> list= new ArrayList<>();

        GroupWithStdSup obj= new GroupWithStdSup();

      if(gru.isPresent()){
          System.out.println("this is from "+ gru.get());
          StudentGroup group= gru.get();

          obj.setGroupName(group.getName());
          obj.setId(group.getId());


          for(User usr: group.getStudents()){
              StudentD temp= new StudentD();
              temp.setEmail(usr.getEmail());
              temp.setName(usr.getName());
              temp.setId(usr.getId());
              list.add(temp);
          }
          Supervisord temp2= new Supervisord();
          temp2.setEmail(gru.get().getSupervisor().getEmail());
          temp2.setName(gru.get().getSupervisor().getName());
          temp2.setId(gru.get().getSupervisor().getId());
          obj.setSupervisor(temp2);
          obj.setStudents(list);
          obj.setTotalAssignment(gru.get().getAssignments().toArray().length);

          return  obj;
      }
      return null;
    }

    @Override
    public List<StudentGroup> findGroupBySupervisor(Long id) {
        return  studentGroupRepository.findBySupervisorId(id);
    }

    @Override
    public List<StudentGroup> sortGroupByName(String name) {
        return null;
    }

    @Override
    public List<StudentGroup> searchGroupByName(String name) {
        return null;
    }

    @Override
    public List<StudentGroup> sortGroupByDomain(String name) {
        return null;
    }

    @Override
    public List<StudentGroup> searchGroupByDomain(String name) {
        return null;
    }

    @Override
    public List<StudentGroup> allGroups() {
      return  studentGroupRepository.findAll();
    }
}
