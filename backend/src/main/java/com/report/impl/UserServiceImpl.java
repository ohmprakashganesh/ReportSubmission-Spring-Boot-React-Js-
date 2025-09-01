package com.report.impl;

import java.util.List;
import java.util.Optional;

import com.report.DTOs.StudentDto;
import com.report.DTOs.UserDTO;
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
  
    public UserServiceImpl(UserRepo userRepository) {
        this.userRepository = userRepository;
    }


    @Override
    public User createUser(UserDTO user) {
        System.out.println(user);
        User usr= new User();

        usr.setRole(Role.valueOf(user.getRole()));

//        if(user.getRole().equalsIgnoreCase("STUDENT")){
//            usr.setRole(Role.STUDENT);
//        }
//        if(user.getRole().equalsIgnoreCase("SUPERVISER"))
//        {
//            usr.setRole(Role.SUPERVISER);
//        }
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
    public User updateUser(Long id, User temp) {
        if (!userRepository.existsById(id)) {
            throw new UserNotFound("User not found");
        }

        Optional<User> updated = userRepository.findById(id);
        User user= updated.get();
        user.setName(temp.getName());
        user.setRole(temp.getRole());
        user.setGroup(temp.getGroup());
        return userRepository.save(user);
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
        return  userRepository.findStudentsBySupervisorId(id);
    }


}
