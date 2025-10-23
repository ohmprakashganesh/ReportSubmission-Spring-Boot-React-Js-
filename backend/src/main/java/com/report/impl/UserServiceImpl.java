package com.report.impl;

import java.util.List;
import java.util.Optional;

import com.report.DTOs.StudentDto;
import com.report.DTOs.UserDTO;
import com.report.authServices.LoggedUser;
import com.report.entities.Assignment;
import com.report.entities.Role;
import com.report.entities.StudentGroup;
import com.report.exceptional.UserNotFound;
import com.report.mapping.MappingCls;
import com.report.repository.*;
import org.springframework.stereotype.Service;

import com.report.entities.User;
import com.report.services.UserService;
import org.springframework.transaction.annotation.Transactional;


@Service
@Transactional
public class UserServiceImpl implements UserService {
    
    private final  UserRepo userRepository;
    private  final LoggedUser loggedUser;
    private  final StudentGroupRepo studentGroupRepo;
    private  final RefreshTokenRepo refreshTokenRepo;
    private  final AssignmentRepo assignmentRepo;
    private  final FeedbackRepo feedbackRepo;
  
    public UserServiceImpl(StudentGroupRepo studentGroupRepo, RefreshTokenRepo refreshTokenRepo ,  AssignmentRepo assignmentRepo, FeedbackRepo feedbackRepo,  UserRepo userRepository,LoggedUser loggedUser) {
        this.userRepository = userRepository;
        this.loggedUser=loggedUser;
        this.assignmentRepo=assignmentRepo;
        this.feedbackRepo=feedbackRepo;
        this.studentGroupRepo=studentGroupRepo;
        this.refreshTokenRepo= refreshTokenRepo;
    }


    @Override
    public User createUser(UserDTO user) {
        System.out.println(user);
        User usr= new User();

        usr.setRole(Role.valueOf(user.getRole()));
        usr.setName(user.getName());
        usr.setPassword(user.getPassword());
        usr.setEmail(user.getEmail());
        System.out.println(usr);
        return   userRepository.save(usr);
    }


    @Override
    public User getUserById(Long id) {
        return userRepository.findById(id).orElseThrow(() -> new UserNotFound("User not found"));
    }


    @Override
    public UserDTO updateUser(Long id, UserDTO temp) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFound("User not found");
        }
        Optional<User> updated = userRepository.findById(id);
        System.out.println(updated + "this object is for update"+ updated);
        if(updated.isPresent())
        {
            User user= updated.get();
            user.setName(temp.getName());
            user.setRole(Role.valueOf(temp.getRole()));
            user.setEmail(temp.getEmail());
             User usr= userRepository.save(user);
             UserDTO dto= new UserDTO();
             dto.setId(usr.getId());
             dto.setName(usr.getName());
             dto.setRole(usr.getRole().toString());
             dto.setEmail(usr.getEmail());
             return  dto;

        }else{
            throw new UserNotFound("user not found");
        }


    }

    @Override
        public void deleteUser(Long userId) {
            // 1. Find the user
            User user = userRepository.findById(userId)
                    .orElseThrow(() -> new RuntimeException("User not found"));

            // 2. Delete RefreshToken (if exists)
            if(user.getRefreshToken() != null) {
                refreshTokenRepo.delete(user.getRefreshToken());
            }

            // 3. Delete Feedbacks (if any)
            if(user.getFeedbacks() != null && !user.getFeedbacks().isEmpty()) {
                feedbackRepo.deleteAll(user.getFeedbacks());
            }

            // 4. Delete Assignments linked via supervised groups
            if(user.getSupervisedGroups() != null && !user.getSupervisedGroups().isEmpty()) {
                for(StudentGroup group : user.getSupervisedGroups()) {
                    // Delete assignments linked to this group
                    List<Assignment> assignments = assignmentRepo.findBystudentGroup(group);
                    assignmentRepo.deleteAll(assignments);

                    // Delete the group itself
                    studentGroupRepo.delete(group);
                }
            }

            // 5. Finally, delete the user
            userRepository.delete(user);
        }



    @Override
    public List<User> getUsers() {
        List<User> user =userRepository.findAll();
        for ( User user1:user
             ) {
            System.out.println(user1);
        }
        return  user;
    }

    @Override
    public StudentGroup getGroupsOfUser(Long id) {
        StudentGroup grp= new StudentGroup();
        Optional<User> user= userRepository.findById(id);
       if(user.isPresent()){
           User usr= user.get();
           if(usr.getGroup()!= null){
               System.out.println(usr.getGroup());
               grp=usr.getGroup();
           }
       }else {
           return null;
       }
       return  grp;
    }
    @Override
    public List<User> UsersByGroupId(Long id) {
      return   userRepository.findByGroupId(id);
    }

    @Override
    public StudentDto getStudetnById(Long id) {
        Optional<User> usr= userRepository.findById(id);
        if(usr.isPresent()){
          return   MappingCls.userToStudetnDto(usr.get());
        }else{
            return  null;
        }
    }

    @Override
    public List<User> getAllSupervisors() {
      return   userRepository.findByRole(Role.SUPERVISER);
    }

    @Override
    public List<User> getAllStudents() {
       return  userRepository.findByRole(Role.STUDENT);
    }

    @Override
    public List<User> allUsersByrole(String role) {
        if(role.equalsIgnoreCase("STUDENT")){
            return  userRepository.findByRole(Role.STUDENT);
        }else if(role.equalsIgnoreCase("superviser")){
            return  userRepository.findByRole(Role.SUPERVISER);
        }else{
            return  null;
        }

    }

    @Override
    public List<User> allSupervisedStudents(Long id) {
        return  userRepository.findStudentsBySupervisorId(id);
    }

    @Override
    public List<User> allStudentsOfGroup(Long id) {
       return  userRepository.findByGroupId(id);
    }







}
