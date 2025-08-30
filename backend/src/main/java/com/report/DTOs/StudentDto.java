package com.report.DTOs;

import com.report.entities.StudentGroup;
import lombok.Data;

import java.util.List;

@Data
public class StudentDto {
    private Long id;
    private String name;
    private String email;
    private List<StudentGroup> groups;
}
