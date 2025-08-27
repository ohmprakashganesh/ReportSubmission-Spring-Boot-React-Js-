package com.report.response;

import com.report.entities.AssignmentIteration;
import com.report.entities.User;
import lombok.Data;

import java.util.List;

@Data
public class StudentGroupResponse {
            Long id;
            String groupName;
            String supervisorName;
            List<AssignmentIteration> assignmentIterations;
}
