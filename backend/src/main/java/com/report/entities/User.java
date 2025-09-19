package com.report.entities;

import java.util.Collection;
import java.util.List;

import com.fasterxml.jackson.annotation.JsonBackReference;
import com.fasterxml.jackson.annotation.JsonIgnore;
import com.fasterxml.jackson.annotation.JsonManagedReference;
import jakarta.persistence.*;
import lombok.*;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;


@Entity
@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class User  implements UserDetails {


    @Id
     @GeneratedValue(strategy=GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String email;
    private String password;

    private Domain domain;

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
    @JsonBackReference(value="feedback")
    private List<Feedback> feedbacks;


    @JsonIgnore
    @OneToOne(mappedBy = "user")
    private RefreshToken refreshToken;

    //there are implemented methods

    public Collection<? extends GrantedAuthority> getAuthorities(){
        return List.of(new SimpleGrantedAuthority(role.name()));
    }

    @Override
    public String getPassword(){
        return password;
    }
    @Override
    public String getUsername(){
        return email;
    }
    @Override
    public  boolean isAccountNonExpired() {
        return true;
    }
    @Override
    public  boolean isAccountNonLocked() {
        return true;
    }
    @Override
    public  boolean isCredentialsNonExpired() {
        return true;
    }
    @Override
    public  boolean isEnabled() {
        return true;
    }



}
