package com.report.entities;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StudentGroup {
    @Id
 @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;


    private String name;

   @OneToMany(mappedBy = "group")
  @JsonManagedReference (value = "group")
   private List<User> students; // Users with role STUDENT

   @ManyToOne
   @JsonBackReference(value = "supervisor")
   private User supervisor; // User with role SUPERVISOR

    @OneToMany(mappedBy = "studentGroup",fetch = FetchType.EAGER)
    @JsonManagedReference(value = "supervisor-assignment")
    private List<Assignment> assignments;
}
