package com.report.services;

import java.util.List;
import java.util.Optional;

import com.report.DTOs.StrudentGroupDTO;
import com.report.DTOs.StudentGroupDetailDTO;
import com.report.entities.StudentGroup;

public interface StudentGroupService {
    StudentGroup createGroup(StrudentGroupDTO group);
    StudentGroup getGroupById(Long id);
    List<StudentGroup> allGroups();
    StudentGroup updateGroup(Long id, StrudentGroupDTO group);
    void deleteGroup(Long id);
//    StudentGroupDetailDTO findGroupWithDetails(Long id);
    StudentGroupDetailDTO findGroupWithStudentsAndSupervisor(Long id);
}
