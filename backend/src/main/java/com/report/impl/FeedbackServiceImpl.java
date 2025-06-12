package com.report.impl;

import com.report.DTOs.FeedbackDTO;
import com.report.entities.AssignmentIteration;
import com.report.entities.User;
import com.report.repository.AssignmentIterationRepo;
import com.report.repository.UserRepo;
import org.springframework.stereotype.Service;

import com.report.entities.Feedback;
import com.report.repository.FeedbackRepo;
import com.report.services.FeedbackService;

import java.util.Optional;

@Service
public class FeedbackServiceImpl implements FeedbackService {

    private  FeedbackRepo feedbackRepository;
    private AssignmentIterationRepo assignmentIterationRepo;
    private UserRepo userRepo;

    public FeedbackServiceImpl(FeedbackRepo feedbackRepository, UserRepo userRepo,AssignmentIterationRepo assignmentIterationRepo) {
        this.feedbackRepository = feedbackRepository;
        this.userRepo=userRepo;
        this.assignmentIterationRepo=assignmentIterationRepo;
    }

    @Override
    public Feedback createFeedback(FeedbackDTO feedback) {
        Feedback feed= new Feedback();
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
        AssignmentIteration itr = assignmentIterationRepo.findById(id).orElseThrow(()-> new RuntimeException("not found the submitted assignement"));
        return  itr;
    }

    @Override
    public Feedback getFeedbackById(Long id) {
        return feedbackRepository.findById(id).orElseThrow(() -> new RuntimeException("Feedback not found"));
    }

    @Override
    public Feedback updateFeedback(Long id, Feedback feedback) {
        Feedback obj= feedbackRepository.findById(id).orElseThrow(()-> new RuntimeException("not found object with id "+ id));
        obj.setComments(feedback.getComments());
        obj.setSubmittedAt(feedback.getSubmittedAt());
        return feedbackRepository.save(obj);
    }

    @Override
    public void deleteFeedback(Long id) {
        feedbackRepository.deleteById(id) ;
        System.out.println("successfully deleted");
    }
}
