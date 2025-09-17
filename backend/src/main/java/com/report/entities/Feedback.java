package com.report.entities;

import java.time.LocalDate;
import java.time.LocalDateTime;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToOne;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Feedback {
    
    @Id
     @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String comments;

    private String documentUrl;

    private  String documentName;
    
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDate submittedAt;


    @OneToOne
    @JsonBackReference(value = "feed")
    @JsonIgnore
    private AssignmentIteration assignmentIteration;

    @ManyToOne
    @JsonBackReference(value="feedback")
    @JsonIgnore
    private User supervisor; // User with role SUPERVISOR
}
