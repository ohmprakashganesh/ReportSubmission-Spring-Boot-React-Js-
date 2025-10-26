//package com.report.entities;
//
//import com.fasterxml.jackson.annotation.JsonIgnore;
//import com.fasterxml.jackson.annotation.JsonManagedReference;
//import jakarta.persistence.*;
//import jakarta.validation.constraints.NotBlank;
//import jakarta.validation.constraints.NotEmpty;
//import lombok.AllArgsConstructor;
//import lombok.Data;
//import lombok.NoArgsConstructor;
//import org.hibernate.annotations.CreationTimestamp;
//import java.time.LocalDateTime;
//
//@Data
//@Entity
//@AllArgsConstructor
//@NoArgsConstructor
//public class Message {
//
//    @Id
//    @GeneratedValue(strategy = GenerationType.IDENTITY)
//    private  Long id;
//
//    @NotEmpty
//    private String sender;
//
//    @NotEmpty
//    @NotBlank
//    private String content;
//
//    @ManyToOne(fetch = FetchType.LAZY)
//    @JsonIgnore
//    @JoinColumn(name = "student_group_id") // safer name
//    private StudentGroup studentGroup;
//
//    @CreationTimestamp
//    private LocalDateTime timeStamp;
//
//    public Message(StudentGroup studentGroup, String content) {
//        this.studentGroup= studentGroup;
//        this.content=content;
//
//    }
//}
