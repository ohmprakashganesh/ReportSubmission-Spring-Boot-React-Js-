package com.report.impl;

import com.report.DTOs.AssignmentIterDTO;
import com.report.FileHandle.FilePutGet;
import com.report.copyleaks.DTOs.CopyleaksBusinessCheck;
import com.report.entities.Assignment;
import com.report.entities.IterationType;
import com.report.entities.User;
import com.report.exceptional.UserNotFound;
import com.report.repository.AssignmentRepo;
import com.report.repository.UserRepo;
import org.springframework.stereotype.Service;

import com.report.entities.AssignmentIteration;
import com.report.repository.AssignmentIterationRepo;
import com.report.services.AssignmentIterationService;

import java.io.IOException;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class AssignmentIterationServiceImpl implements AssignmentIterationService {

    private  final AssignmentIterationRepo assignmentIterationRepository;
    private  final AssignmentRepo assignmentRepo;
    private final  UserRepo userRepo;

    private final CopyleaksBusinessCheck copyleaksBusinessCheck;

    private FileService fileService;


  
    public AssignmentIterationServiceImpl(AssignmentIterationRepo assignmentIterationRepository, CopyleaksBusinessCheck copyleaksBusinessCheck, UserRepo userRepo,FileService fileService, AssignmentRepo assignmentRepo) {
        this.assignmentIterationRepository = assignmentIterationRepository;
        this.userRepo=userRepo;
        this.copyleaksBusinessCheck=copyleaksBusinessCheck;
        this.assignmentRepo=assignmentRepo;
        // this.copyLeaksCheck=copyLeaksCheck;
        this.fileService=fileService;
    }

    @Override
    public AssignmentIteration createIteration(AssignmentIterDTO iteration) {
        AssignmentIteration itr= new AssignmentIteration();
        itr.setIterationType(IterationType.valueOf(iteration.getIterationType().toString()));
        itr.setStatus(iteration.getStatus());
        itr.setAssignment(assinment(iteration.getAssignmentId()));
        itr.setSubmittedBy(loggedUser(iteration.getSubmittedBy()));
        String[] names = fileService.saveFile(iteration.getFile());
        Path filepath = Paths.get(names[2]);
        itr.setDocumentName(names[0]);
        itr.setDocumentUrl(filepath.toString());
        System.out.println(" upto here file is well ");// important fix


        return assignmentIterationRepository.save(itr);
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
    public List<AssignmentIteration> getIterationByStd(User user) {
       List<AssignmentIteration> lists= assignmentIterationRepository.findByUser(user);
       return  lists;
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
       if(assignmentIterationRepository.findById(id) != null){
           assignmentIterationRepository.deleteById(id);
           System.out.println("successfully deleted");
       }
    }
}
