package com.report.DTOs;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.report.entities.AssignmentIteration;
import com.report.entities.StudentGroup;
import jakarta.persistence.*;
import lombok.*;

import java.util.List;





import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;

import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.Data;
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentDTO {

        private Long id;
        private String description;
        private String title;
        private Long studentGroupId;
        private String StudentGroupName;
        private List<Long> assignmentIterIds;


}
