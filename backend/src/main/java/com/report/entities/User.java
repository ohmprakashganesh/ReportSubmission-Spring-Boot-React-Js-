package com.report.entities;

import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;


@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User {


    @Id
     @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;

     @Enumerated (EnumType.STRING)
     private Role role;


    @ManyToOne
    @JoinColumn(name = "group_id", foreignKey = @ForeignKey(name = "fk_user_group", foreignKeyDefinition = "FOREIGN KEY (group_id) REFERENCES student_group(id) ON DELETE SET NULL"))
    @JsonManagedReference (value = "group")
    private StudentGroup group;


    // Supervisor-only relation
    @OneToMany(mappedBy = "supervisor")
    @JsonBackReference(value = "supervisor")
    private List<StudentGroup> supervisedGroups;

    @OneToMany(mappedBy="supervisor")
    @JsonManagedReference(value="feedback")
    private List<Feedback> feedbacks;

}

// Student-only relation
//    @ManyToOne
//    @JsonManagedReference(value = "supervisor-group")
//    private StudentGroup group;
//
//    // Supervisor-only relation
//    @OneToMany(mappedBy = "supervisor")
//    @JsonManagedReference(value = "user-studentGroup")
//    private List<StudentGroup> supervisedGroups;
