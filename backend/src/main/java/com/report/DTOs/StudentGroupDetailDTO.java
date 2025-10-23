package com.report.DTOs;

import lombok.Data;

import java.util.List;

@Data
public class StudentGroupDetailDTO {

        private Long id;
        private String name;
        private SupervisorDto supervisor;
        private  int AssignmentsNum;
        private List<StudentDto> students;


}
