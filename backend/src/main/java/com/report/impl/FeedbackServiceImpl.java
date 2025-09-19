package com.report.impl;

import com.report.DTOs.FeedbackDTO;
import com.report.authServices.LoggedUser;
import com.report.entities.AssignmentIteration;
import com.report.entities.Status;
import com.report.entities.User;
import com.report.repository.AssignmentIterationRepo;
import com.report.repository.UserRepo;
import com.report.services.AssignmentIterationService;
import jakarta.persistence.EntityManager;
import org.springframework.stereotype.Service;

import com.report.entities.Feedback;
import com.report.repository.FeedbackRepo;
import com.report.services.FeedbackService;
import org.springframework.transaction.annotation.Transactional;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.util.List;
import java.util.Optional;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    private  FeedbackRepo feedbackRepository;
    private  FileServiceFeedback fileServiceFeedback;
    private EntityManager entityManager;
    private AssignmentIterationRepo assignmentIterationRepo;
    private UserRepo userRepo;
    private LoggedUser loggedUser;
    private AssignmentIterationService assignmentIterationService;

    public FeedbackServiceImpl(FeedbackRepo feedbackRepository,LoggedUser loggedUser,EntityManager entityManager,AssignmentIterationService assignmentIterationService, FileServiceFeedback fileServiceFeedback, UserRepo userRepo,AssignmentIterationRepo assignmentIterationRepo) {
        this.feedbackRepository = feedbackRepository;
        this.userRepo=userRepo;
        this.loggedUser=loggedUser;
        this.entityManager=entityManager;
        this.assignmentIterationService=assignmentIterationService;
        this.fileServiceFeedback=fileServiceFeedback;
        this.assignmentIterationRepo=assignmentIterationRepo;
    }

    @Override
    public Feedback createFeedback(FeedbackDTO feedback) {
        Feedback feed= new Feedback();
         String[] names= fileServiceFeedback.saveFile(feedback.getFile());
        Path filePath= Paths.get(names[2]);
        feed.setDocumentName(names[0]);
        feed.setDocumentUrl(filePath.toString());

        feed.setComments(feedback.getComment());
        feed.setSupervisor(getSupervisor(feedback.getSubmittedBy()));

        feed.setAssignmentIteration(getIteration(feedback.getAssignmentId()));
        return feedbackRepository.save(feed);
    }
    public User getSupervisor(Long id){
         User user= userRepo.findById(id).orElseThrow(()-> new RuntimeException("not found the submitted assignement"));
         return  user;
    }
    public AssignmentIteration getIteration(Long id){
        AssignmentIteration itr = assignmentIterationRepo.findById(id).orElseThrow(()-> new RuntimeException("not found the submitted iteration"));
        itr.setStatus(Status.CHECKED);
        return assignmentIterationRepo.save(itr);
    }

    @Override
    public Feedback getFeedbackById(Long id) {
        return feedbackRepository.findById(id).orElseThrow(() -> new RuntimeException("Feedback not found"));
    }

    @Override
    public Feedback updateFeedback(Long id, FeedbackDTO feedback) {
        Feedback obj= feedbackRepository.findById(id).orElseThrow(()-> new RuntimeException("not found object with id "+ id));
        String[] names= fileServiceFeedback.saveFile(feedback.getFile());
        Path filePath= Paths.get(names[2]);
        obj.setDocumentName(names[0]);
        obj.setDocumentUrl(filePath.toString());
        obj.setComments(feedback.getComment());
        System.out.println(feedback.getComment());
        return feedbackRepository.save(obj);
    }

    @Transactional
    @Override
    public void deleteFeedback(Long id) {
        feedbackRepository.findById(id).ifPresent(f -> {
            // Break the foreign key relationships
            f.setAssignmentIteration(null);
            f.setSupervisor(null);

            feedbackRepository.save(f);      // persist the nulls
            feedbackRepository.delete(f);    // now delete works
            // force SQL execution
            entityManager.flush();
            System.out.println("Deleted feedback ID: " + id);
             deleteAgain(id);

        });
    }
    public void deleteAgain(Long id){
        feedbackRepository.findById(id).ifPresent(f -> {// persist the nulls
            feedbackRepository.delete(f);    // now delete works
        });

    }



    @Override
    public Feedback getFeedbackByIterationId(Long id) {
     return    feedbackRepository.findByAssignmentIterationId(id);
    }

    @Override
    public String getAllFeedbackOfsupervisor() {
          Optional<User> user= userRepo.findById(loggedUser.getLoggedUser().getId());
          if(user.isPresent()){
              return feedbackRepository.countBySupervisorId(user.get()).toString();
          }else{
              return  null;
          }


    }

    @Override
    public List<Feedback> getAllFeedbacks() {
      return feedbackRepository.findAll();
    }


}
