package com.report.entities;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonFormat;
import com.fasterxml.jackson.annotation.JsonIgnore;

import jakarta.persistence.*;

import jakarta.validation.constraints.Future;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.springframework.web.multipart.MultipartFile;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class Assignment {
    @Id 
     @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String description;
    private String title;

    @CreationTimestamp
    @JsonFormat(pattern = "yy/MM/dd:H/m/s")
    private LocalDateTime createdAt;

    @Future(message = "Due date must be a future date")
    @JsonFormat(pattern = "yy/MM/dd")
    private LocalDate dueDate;

    private String documentUrl;

    private  String documentName;

    @ManyToOne(cascade = CascadeType.PERSIST)
    @JsonBackReference(value = "supervisor-assignment")
    private StudentGroup studentGroup;

    @OneToMany(mappedBy="assignment", cascade=CascadeType.ALL)
    private List<AssignmentIteration> iterations;
}
