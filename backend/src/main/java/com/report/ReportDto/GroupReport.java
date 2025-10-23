package com.report.ReportDto;

import com.report.DTOs.StudentD;
import com.report.DTOs.Supervisord;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GroupReport {

    private Long id;
    private String groupName;
    private int totalAssignment;
    private List<StudentD> students;
    private Supervisord supervisor;
}
