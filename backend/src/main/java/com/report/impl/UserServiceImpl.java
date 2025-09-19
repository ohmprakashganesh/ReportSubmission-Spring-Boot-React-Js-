package com.report.impl;

import java.util.List;
import java.util.Optional;

import com.report.DTOs.StudentDto;
import com.report.DTOs.UserDTO;
import com.report.authServices.LoggedUser;
import com.report.entities.Role;
import com.report.entities.StudentGroup;
import com.report.exceptional.UserNotFound;
import com.report.mapping.MappingCls;
import org.springframework.stereotype.Service;

import com.report.entities.User;
import com.report.repository.UserRepo;
import com.report.services.UserService;


@Service
public class UserServiceImpl implements UserService {
    
    private final  UserRepo userRepository;
    private  final LoggedUser loggedUser;
  
    public UserServiceImpl(UserRepo userRepository,LoggedUser loggedUser) {
        this.userRepository = userRepository;
        this.loggedUser=loggedUser;
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
    public void deleteUser(Long id) {
        userRepository.deleteById(id);
    }

    @Override
    public List<User> getUsers() {
        List<User> user =userRepository.findAll();
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
        return  userRepository.findStudentsBySupervisorId(loggedUser.getLoggedUser().getId());
    }

    @Override
    public List<User> allStudentsOfGroup(Long id) {
       return  userRepository.findByGroupId(id);
    }







}
