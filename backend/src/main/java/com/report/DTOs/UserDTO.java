package com.report.DTOs;

import com.report.entities.Role;
import com.report.entities.StudentGroup;
import jakarta.persistence.EnumType;
import jakarta.persistence.Enumerated;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class UserDTO {

    private Long id;

    private String name;
    private String email;
    private String password;
    private String role;
    // Student-only relation
    private Long stdGroupId;

    // Supervisor-only relation

    private List<Long> superviserGroupsIds;
}
