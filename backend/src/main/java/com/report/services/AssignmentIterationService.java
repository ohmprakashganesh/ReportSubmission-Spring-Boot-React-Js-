package com.report.services;

import com.report.DTOs.AssignmentIterDTO;
import com.report.entities.AssignmentIteration;
import com.report.entities.User;

import java.util.List;
import java.util.Optional;

public interface AssignmentIterationService {
    AssignmentIteration createIteration(AssignmentIterDTO iteration);
   Optional< AssignmentIteration> getIterationById(Long id);

    List<AssignmentIteration> getIterationAll();
     List<AssignmentIteration> getIterationByStd();


//    List<AssignmentIteration> getIterationByGroup(User user);

    AssignmentIteration updateIteration(Long id, AssignmentIteration iteration);
    void deleteIteration(Long id);

    List<AssignmentIteration> findAssignemntsByUser(long l);
}
