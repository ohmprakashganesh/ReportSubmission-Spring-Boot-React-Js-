package com.report.impl;

import com.report.DTOs.AssignmentIterDTO;
import com.report.authServices.LoggedUser;
import com.report.entities.*;
import com.report.exceptional.UserNotFound;
import com.report.repository.AssignmentRepo;
import com.report.repository.UserRepo;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import com.report.repository.AssignmentIterationRepo;
import com.report.services.AssignmentIterationService;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
public class AssignmentIterationServiceImpl implements AssignmentIterationService {

    private  final AssignmentIterationRepo assignmentIterationRepository;
    private  final AssignmentRepo assignmentRepo;
    private final  UserRepo userRepo;
     private  final LoggedUser loggedUser;

//    private final CopyleaksBusinessCheck copyleaksBusinessCheck;

    private final FileService fileService;


  
    public AssignmentIterationServiceImpl(AssignmentIterationRepo assignmentIterationRepository,LoggedUser loggedUser, UserRepo userRepo,FileService fileService, AssignmentRepo assignmentRepo) {
        this.assignmentIterationRepository = assignmentIterationRepository;
        this.userRepo=userRepo;
        this.loggedUser=loggedUser;
//        this.copyleaksBusinessCheck=copyleaksBusinessCheck;
        this.assignmentRepo=assignmentRepo;
        // this.copyLeaksCheck=copyLeaksCheck;
        this.fileService=fileService;
    }

    @Override
    public AssignmentIteration createIteration(AssignmentIterDTO iteration) {
        AssignmentIteration itr= new AssignmentIteration();
        itr.setIterationType(IterationType.valueOf(iteration.getIterationType().toString()));
        itr.setStatus(Status.SUBMITTED);
        itr.setAssignment(assinment(iteration.getAssignmentId()));
        itr.setSubmittedBy(loggedUser(iteration.getSubmittedBy()));
        String[] names = fileService.saveFile(iteration.getFile());
        Path filepath = Paths.get(names[2]);
        itr.setDocumentName(names[0]);
        itr.setSubmittedBy(getLoggedUser());
        itr.setDocumentUrl(filepath.toString());
        System.out.println(" upto here file is well ");// important fix
        return assignmentIterationRepository.save(itr);
    }
    public User getLoggedUser(){
        Authentication authentication= SecurityContextHolder.getContext().getAuthentication();
        String email= authentication.getName();
        User user= userRepo.findByEmail(email).orElseThrow(()-> new RuntimeException("user not found"));
        return user;
    }

     public Assignment assinment(Long id){
        return  assignmentRepo.findById(id).orElseThrow(()-> new RuntimeException("Assignment not found with id "+id));
     }
    public User loggedUser(Long id){
        return  userRepo.findById(id).orElseThrow(()-> new RuntimeException("Assignment not found with id "+id));
    }

    @Override
    public Optional<AssignmentIteration> getIterationById(Long id) {
        AssignmentIteration itr= assignmentIterationRepository.findById(id).orElseThrow(() -> new RuntimeException("Iteration not found"));
        return Optional.of(itr);
    }

    @Override
    public List<AssignmentIteration> getIterationAll() {
      return assignmentIterationRepository.findAll();

    }

    @Override
    public List<AssignmentIteration> getIterationByStd() {
       Optional<User> user= userRepo.findById(loggedUser.getLoggedUser().getId());
        List<AssignmentIteration> lists=new ArrayList<>();

        if(user.isPresent())
        {
            return lists= assignmentIterationRepository.findByUser(user.get());
        }else{
            return  null;
        }

    }

    @Override
    public AssignmentIteration updateIteration(Long id, AssignmentIteration iteration) {
        if (!assignmentIterationRepository.existsById(id)) {
            throw new UserNotFound("Iteration not found");
        }
       Optional< AssignmentIteration >itr= assignmentIterationRepository.findById(id);
        AssignmentIteration iteration2= itr.get();
        iteration2.setIterationType(iteration.getIterationType());
        iteration2.setDocumentUrl(iteration.getDocumentUrl());
        return assignmentIterationRepository.save(iteration2);
    }


    @Override
    public void deleteIteration(Long id) {
       assignmentIterationRepository.findById(id).ifPresent(f-> {


           f.setSubmittedBy(null);
           f.setFeedback(null);
           f.setAssignment(null);



           assignmentIterationRepository.save(f);      // persist the nulls
           assignmentIterationRepository.delete(f);    // now delete works
           assignmentIterationRepository.flush();
           // force SQL execution
           System.out.println("Deleted feedback ID: " + id);
           assignmentIterationRepository.delete(f);
       });

    }

    @Override
    public List<AssignmentIteration> findAssignemntsByUser(long l) {
      return   assignmentIterationRepository.findBySubmittedById(l);
    }
}
