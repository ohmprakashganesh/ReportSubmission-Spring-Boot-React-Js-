package com.report.impl;

import com.report.entities.Domain;
import com.report.entities.Role;
import com.report.entities.StudentGroup;
import com.report.entities.User;
import com.report.exceptional.UserNotFound;
import com.report.repository.StudentGroupRepo;
import com.report.repository.UserRepo;
import com.report.services.FilterServices;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class FilterServiceImpl  implements FilterServices {

    private UserRepo userRepo;

    private StudentGroupRepo studentGroupRepo;


    public FilterServiceImpl(UserRepo userRepo, StudentGroupRepo studentGroupRepo) {
        this.userRepo = userRepo;
        this.studentGroupRepo = studentGroupRepo;
    }

    @Override
    public List<User> sortUsersName(String order, String role) {

        //sort all the student only role=student
        if (role.equalsIgnoreCase("STUDENT")) {
            if (order.equalsIgnoreCase("asc")) {
                return userRepo.findByRoleOrderByNameAsc(Role.STUDENT);

            } else {
                return userRepo.findByRoleOrderByNameDesc(Role.STUDENT);

            }
            //sort all the supervisor only role=supervisor
        } else if (role.equalsIgnoreCase("SUPERVISER")) {
            return userRepo.findByRoleOrderByNameDesc(Role.SUPERVISER);
        } else {
            return userRepo.findByRoleOrderByNameAsc(Role.SUPERVISER);
        }

    }

    @Override
    public List<User> searchUserByName(String name, String role) {
        //search the students  based on role
        //search the supervisor based on role
        if (role.equalsIgnoreCase("STUDENT")) {
            return userRepo.findByNameAndRole(name, Role.STUDENT);

        } else if (role.equalsIgnoreCase("SUPERVISER")) {
            return userRepo.findByNameAndRole(name, Role.SUPERVISER);

        } else {
            return null;
        }
    }

    @Override
    public List<StudentGroup> sortGroupByName(String order) {
        if (order.equalsIgnoreCase("asc")) {
            return studentGroupRepo.findAllByOrderByNameAsc();

        } else {
            return studentGroupRepo.findAllByOrderByNameDesc();

        }
    }

    @Override
    public List<StudentGroup> searchGroupByName(String name) {
        List<StudentGroup> list = new ArrayList<>();
        Optional<StudentGroup> groups = studentGroupRepo.findByName(name);
        if (groups.isPresent()) {
            list.add(groups.get());

        }
        return list;

    }

    @Override
    public List<StudentGroup> sortGroupByDomain(String order) {

       try{
           if (order.equalsIgnoreCase("asc")) {
               return studentGroupRepo.findAllByOrderByDomainAsc();

           }
           if(order.equalsIgnoreCase("desc")) {
               return studentGroupRepo.findAllByOrderByDomainDesc();

           }else{
               return  null;
           }
       }catch (Exception ex){
           throw  new UserNotFound("group unable to sort");
       }

    }
    @Override
    public List<StudentGroup> searchGroupByDomain(String domain) {
        try {
            return  studentGroupRepo.findByDomain(Domain.valueOf(domain));

        }catch (Exception ex){
            throw  new UserNotFound("group not found with domain"+ domain);
        }
    }


}
