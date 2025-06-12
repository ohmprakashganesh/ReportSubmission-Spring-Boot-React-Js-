package com.report.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Entity;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;


@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentIteration {
    @Id 
    @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    @Enumerated(EnumType.STRING)
    private IterationType iterationType;

    private String documentUrl;

    private  String documentName;

    @JsonIgnore
    @ManyToOne
    private Assignment assignment;

    @Enumerated(EnumType.STRING)
    private Status status = Status.SUBMITTED;


    @ManyToOne
    private User submittedBy; // User with role STUDENT

    @OneToOne(mappedBy="assignmentIteration", cascade = CascadeType.ALL)
    @JsonBackReference(value = "feed")
    private Feedback feedback;
}
