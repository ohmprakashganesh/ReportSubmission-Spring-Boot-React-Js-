package com.report.authServices;

import com.report.entities.User;
import com.report.exceptional.UserNotFound;
import com.report.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Component;

@Component
public  class LoggedUser {
    @Autowired
    private UserRepo userRepo;

    public  User getLoggedUser(){
        String email= SecurityContextHolder.getContext().getAuthentication().getName();
        return  userRepo.findByEmail(email).orElseThrow(()-> new UserNotFound("logged user not found"));
    }
}
