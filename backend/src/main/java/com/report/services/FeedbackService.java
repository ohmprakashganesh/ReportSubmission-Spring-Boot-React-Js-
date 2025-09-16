package com.report.services;

import com.report.DTOs.FeedbackDTO;
import com.report.entities.Feedback;
import org.springframework.http.ResponseEntity;

public interface FeedbackService {
    Feedback createFeedback(FeedbackDTO feedback);
    Feedback getFeedbackById(Long id);
    Feedback updateFeedback(Long id, Feedback feedback);
    void deleteFeedback(Long id);

    Feedback getFeedbackByIterationId(Long id);

    String getAllFeedbackOfsupervisor();
}
