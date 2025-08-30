package com.report.DTOs;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupWithStdSup {
    private Long id;
    private String groupName;
    private List<StudentD> students;
    private  Supervisord supervisor;
}

