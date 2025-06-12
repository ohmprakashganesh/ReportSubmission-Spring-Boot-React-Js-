package com.report.entities;

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
    
    @CreationTimestamp
    @Column(updatable = false)
    private LocalDateTime submittedAt;


    @OneToOne
    @JsonManagedReference(value = "feed")
    private AssignmentIteration assignmentIteration;

    @ManyToOne
    @JsonBackReference(value="feedback")
    private User supervisor; // User with role SUPERVISOR
}
