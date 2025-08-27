package com.report.DTOs;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.report.entities.AssignmentIteration;
import com.report.entities.StudentGroup;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;






import lombok.Data;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentDTO {

        private Long id;
        private String description;
        private String title;
//        private MultipartFile file;
        private Long studentGroupId;
        private String StudentGroupName;
        private List<Long> assignmentIterIds;


}
