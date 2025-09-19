package com.report.services;

import java.util.List;
import java.util.Optional;

import com.report.DTOs.GroupWithStdSup;
import com.report.DTOs.StrudentGroupDTO;
import com.report.DTOs.StudentGroupDetailDTO;
import com.report.entities.StudentGroup;
import com.report.entities.User;
import com.report.response.GroupResponse;
import com.report.response.StudentGroupResponse;

public interface StudentGroupService {

//    StudentGroupResponse ResponseGroup();


    StudentGroup createGroup(StrudentGroupDTO group);
    StudentGroup getGroupById(Long id);
    List<StudentGroup> allGroups();
    StudentGroup updateGroup(Long id, StrudentGroupDTO group);
    void deleteGroup(Long id);
//    StudentGroupDetailDTO findGroupWithDetails(Long id);
    StudentGroupDetailDTO findGroupWithStudentsAndSupervisor(Long id);

    GroupResponse getAssignMents(Long id);


    GroupWithStdSup findGroupWithStdSup(Long id);


    List<StudentGroup> findGroupBySupervisor(Long id);

    List<StudentGroup> sortGroupByName(String name);

    List<StudentGroup> searchGroupByName(String name);

    List<StudentGroup> sortGroupByDomain(String name);

    List<StudentGroup> searchGroupByDomain(String name);
}
