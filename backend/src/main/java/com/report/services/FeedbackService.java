package com.report.services;

import com.report.DTOs.FeedbackDTO;
import com.report.entities.Feedback;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface FeedbackService {
    Feedback createFeedback(FeedbackDTO feedback);
    Feedback getFeedbackById(Long id);
    Feedback updateFeedback(Long id, FeedbackDTO feedback);
    void deleteFeedback(Long id);

    Feedback getFeedbackByIterationId(Long id);

    String getAllFeedbackOfsupervisor();

    List<Feedback> getAllFeedbacks();
}
