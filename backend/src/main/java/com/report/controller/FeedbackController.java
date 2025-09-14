package com.report.controller;
import com.report.DTOs.FeedbackDTO;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.report.entities.Feedback;
import com.report.services.FeedbackService;

@RestController
@RequestMapping("/api/feedbacks")
@CrossOrigin("*")
public class FeedbackController {

    private final FeedbackService feedbackService;

    @Autowired
    public FeedbackController(FeedbackService feedbackService) {
        this.feedbackService = feedbackService;
    }

    //post the feedback
    @PostMapping
    public ResponseEntity<Feedback> createFeedback(@RequestBody FeedbackDTO feedback) {
        Feedback createdFeedback = feedbackService.createFeedback(feedback);
        return new ResponseEntity<>(createdFeedback, HttpStatus.CREATED);
    }

    //fetch single feedback
    @GetMapping("/{id}")
    public ResponseEntity<Feedback> getFeedback(@PathVariable Long id) {
        Feedback feedback = feedbackService.getFeedbackById(id);
        return new ResponseEntity<>(feedback, HttpStatus.OK);
    }


    @GetMapping("/feedback/{id}")
    public ResponseEntity<Feedback> feedBackByIteration(@PathVariable Long id) {
        Feedback feedback = feedbackService.getFeedbackByIterationId(id);
        return new ResponseEntity<>(feedback, HttpStatus.OK);
    }
//update feedback
    @PutMapping("/{id}")
    public ResponseEntity<Feedback> updateFeedback(@PathVariable Long id, @RequestBody Feedback feedback) {
        Feedback updatedFeedback = feedbackService.updateFeedback(id, feedback);
        return new ResponseEntity<>(updatedFeedback, HttpStatus.OK);
    }

    //delete the feedback
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteFeedback(@PathVariable Long id) {
        feedbackService.deleteFeedback(id);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
