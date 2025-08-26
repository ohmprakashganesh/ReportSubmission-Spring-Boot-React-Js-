package com.report.response;

import com.report.entities.Assignment;
import lombok.Data;

import java.util.List;

@Data
public class GroupResponse {
    private List<Assignment> assignments;

}
