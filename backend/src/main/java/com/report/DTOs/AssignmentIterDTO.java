package com.report.DTOs;



import com.report.entities.Status;
import org.springframework.web.multipart.MultipartFile;

import com.report.entities.IterationType;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
public class AssignmentIterDTO {

    private Long id;
    private IterationType iterationType;
    private MultipartFile file;
    private Status status;
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


