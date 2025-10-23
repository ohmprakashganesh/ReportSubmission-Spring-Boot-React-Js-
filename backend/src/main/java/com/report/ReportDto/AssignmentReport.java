package com.report.ReportDto;

import com.report.DTOs.StudentDto;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AssignmentReport {
    private  long id;
    private  String name;
    private  int itr;
    private String superviser;
    private String  createdAt;
    private List<String > students;

}
