package com.report.ReportDto;

import com.report.DTOs.GroupWithStdSup;
import com.report.DTOs.StudentD;
import com.report.DTOs.Supervisord;
import com.report.entities.Assignment;
import com.report.entities.StudentGroup;
import com.report.entities.User;
import com.report.mapping.MappingCls;

import java.util.ArrayList;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

public class ReportMapper {

    public static GroupReport GroupToDto(StudentGroup gru){

        List<StudentD> list= new ArrayList<>();

        GroupReport obj= new GroupReport();


            System.out.println("this is from "+ gru);
            StudentGroup group= gru;

            obj.setGroupName(group.getName());
            obj.setId(group.getId());


            for(User usr: group.getStudents()){
                StudentD temp= new StudentD();
                temp.setEmail(usr.getEmail());
                temp.setName(usr.getName());
                temp.setId(usr.getId());
                list.add(temp);
            }
            Supervisord temp2= new Supervisord();
            temp2.setEmail(gru.getSupervisor().getEmail());
            temp2.setName(gru.getSupervisor().getName());
            temp2.setId(gru.getSupervisor().getId());
            obj.setSupervisor(temp2);
            obj.setStudents(list);
            obj.setTotalAssignment(gru.getAssignments().toArray().length);

            return  obj;
        }

    public static AssignmentReport assignToDto(Assignment assignment) {
        AssignmentReport report = new AssignmentReport();

        if (assignment == null) {
            return report;
        }

        report.setId(assignment.getId());
        report.setName(assignment.getTitle() != null ? assignment.getTitle() : "No Title");
        // Use integer directly
        int iterationCount = (assignment.getIterations() != null) ? assignment.getIterations().size() : 0;
        report.setItr(iterationCount); // ✅ store as Integer
        String supervisorName = "No Supervisor";
        if (assignment.getStudentGroup() != null && assignment.getStudentGroup().getSupervisor() != null) {
            supervisorName = assignment.getStudentGroup().getSupervisor().getName();
        }
        report.setSuperviser(supervisorName);
        if (assignment.getStudentGroup() != null && assignment.getStudentGroup().getStudents() != null) {
            report.setStudents(
                    assignment.getStudentGroup().getStudents().stream()
                            .map((e)-> e.getName())
                            .collect(Collectors.toList())
            );
        } else {
            report.setStudents(Collections.emptyList());
        }
        return report;
    }

    public static SupervisorReport userToDto(User user) {
        SupervisorReport report = new SupervisorReport();
        report.setId(user.getId());
        report.setName(user.getName());
        report.setEmail(user.getEmail());
        // Total supervised groups (safe)
        int groups = (user.getSupervisedGroups() != null) ? user.getSupervisedGroups().size() : 0;
        report.setTotalgrp(groups);
        // Total assignments (safe)
        int totalAssignments = 0;
        if (user.getGroup() != null && user.getGroup().getAssignments() != null) {
            totalAssignments = user.getGroup().getAssignments().size();
        }
        report.setTotalAssignment(totalAssignments);
        // Total students (safe)
        int totalStudents = 0;
        if (user.getGroup() != null && user.getGroup().getStudents() != null) {
            totalStudents = user.getGroup().getStudents().size();
        }
        report.setTotalstudents(totalStudents);
        return report;
    }

}
