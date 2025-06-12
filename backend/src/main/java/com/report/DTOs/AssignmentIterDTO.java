package com.report.DTOs;



import org.springframework.web.multipart.MultipartFile;

import com.report.entities.IterationType;
import com.report.entities.SubmissionStatus;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentIterDTO {

    private Long id;
    private IterationType iterationType;
    private MultipartFile file;
    private SubmissionStatus status;
    private Long submittedBy; // ID of the user
    private Long assignmentId;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public IterationType getIterationType() {
        return iterationType;
    }

    public void setIterationType(IterationType iterationType) {
        this.iterationType = iterationType;
    }
}


