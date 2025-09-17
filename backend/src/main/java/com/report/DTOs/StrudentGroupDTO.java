package com.report.DTOs;

import com.fasterxml.jackson.annotation.JsonManagedReference;
import com.report.entities.Assignment;
import com.report.entities.User;
import jakarta.persistence.FetchType;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class StrudentGroupDTO {

    private Long id;
    private String groupName;
    private List<Long> stdIds;
    private Long supervisorId;
    private  String domain;

}
//{
//        "comment": "Great job, but could use more detail on the second section.",
//        "submittedBy": 4,
//        "assignmentId": 47
//        }