package com.report.DTOs;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.report.entities.AssignmentIteration;
import com.report.entities.StudentGroup;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;






import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Data
public class AssignmentDTO {

        private Long id;
        private String description;
        private String title;
        private MultipartFile file;
        private Long studentGroupId;
        private LocalDate dueDate;
        private String StudentGroupName;
        private List<Long> assignmentIterIds;


}
