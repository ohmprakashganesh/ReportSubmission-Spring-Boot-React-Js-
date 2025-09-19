package com.report.entities;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;


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
    private Status status ;

    @ManyToOne
    @JsonIgnore
    private User submittedBy; // User with role STUDENT

    @OneToOne(mappedBy="assignmentIteration", cascade = CascadeType.ALL, orphanRemoval = true)
    @JsonManagedReference(value = "feed")
    private Feedback feedback;


    private LocalDateTime createdAt; // new field to store datetime

    @PrePersist
    protected void onCreate() {
        this.createdAt = LocalDateTime.now();
    }
}
