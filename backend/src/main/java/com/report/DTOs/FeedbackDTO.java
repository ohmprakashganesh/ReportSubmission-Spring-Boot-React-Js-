package com.report.DTOs;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.report.entities.AssignmentIteration;
import com.report.entities.IterationType;
import com.report.entities.User;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import java.sql.Timestamp;
import java.time.LocalDateTime;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class FeedbackDTO {

    private String comment;
    private Long submittedBy;
    private Long assignmentId;
    private Timestamp submittedAt;
}
