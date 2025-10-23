package com.report.ReportDto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class SupervisorReport {
    private  Long id;
    private String name;
    private String email;
    private int totalstudents;
    private int totalgrp;
    private int totalAssignment;

}
