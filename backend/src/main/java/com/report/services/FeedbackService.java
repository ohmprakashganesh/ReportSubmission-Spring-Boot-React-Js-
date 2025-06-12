package com.report.services;

import com.report.DTOs.FeedbackDTO;
import com.report.entities.Feedback;

public interface FeedbackService {
    Feedback createFeedback(FeedbackDTO feedback);
    Feedback getFeedbackById(Long id);
    Feedback updateFeedback(Long id, Feedback feedback);
    void deleteFeedback(Long id);
}
