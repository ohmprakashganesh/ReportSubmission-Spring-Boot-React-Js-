package com.report.request;

import com.report.entities.IterationType;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.sql.Timestamp;

@Data
public class IterationRequest {
    private IterationType type;
    private  Long id;
    private MultipartFile file;
    private Timestamp time;


}
