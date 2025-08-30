package com.report.entities;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import lombok.*;

@Entity
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
@Builder
@ToString(exclude = {"students", "supervisor", "assignments"}) // Exclude cyclic fields
public class StudentGroup {

    @Id
 @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String name;

   @OneToMany(mappedBy = "group", fetch = FetchType.EAGER)
   @JsonManagedReference (value = "group")
   @JsonIgnore
   private List<User> students; // Users with role STUDENT

   @ManyToOne
   @JsonManagedReference(value = "supervisor")
   @JsonIgnore
   private User supervisor; // User with role SUPERVISOR

    @OneToMany(mappedBy = "studentGroup",fetch = FetchType.EAGER)
    @JsonManagedReference(value = "supervisor-assignment")
    private List<Assignment> assignments;
}
