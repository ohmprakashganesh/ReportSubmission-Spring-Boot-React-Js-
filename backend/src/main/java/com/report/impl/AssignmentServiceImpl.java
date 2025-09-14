package com.report.impl;

import com.report.DTOs.AssignmentDTO;
import com.report.entities.StudentGroup;
import com.report.repository.StudentGroupRepo;
import org.springframework.stereotype.Service;

import com.report.entities.Assignment;
import com.report.repository.AssignmentRepo;
import com.report.services.AssignmentService;

import java.nio.file.Path;
import java.nio.file.Paths;
import java.time.LocalDate;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;

@Service
public class AssignmentServiceImpl implements AssignmentService {

    private final AssignmentRepo assignmentRepository;
    private  final StudentGroupRepo studentGroupRepo;
    private  final   FileServiceAssignment fileServiceAssignment;

  
    public AssignmentServiceImpl(FileServiceAssignment fileServiceAssignment, AssignmentRepo assignmentRepository , StudentGroupRepo studentGroupRepo) {
        this.assignmentRepository = assignmentRepository;
        this.fileServiceAssignment=fileServiceAssignment;
        this.studentGroupRepo=studentGroupRepo;

    }


//    @Override
//    public Assignment createAssignment(AssignmentDTO assignment) {
//        return null;
//    }

    @Override
    public Assignment createAssignment(AssignmentDTO assignment) {
        Assignment obj= new Assignment();
        System.out.println("this is to show "+assignment.toString());
        System.out.println("are you done ");
        obj.setTitle(assignment.getTitle());
        obj.setDescription(assignment.getDescription());
        String[] names=fileServiceAssignment.saveFile(assignment.getFile());
        Path filepath= Paths.get(names[2]);
        obj.setDocumentName(names[0]);
        obj.setDocumentUrl(filepath.toString());
        System.out.println("we are upto file safe ");

        if(assignment.getStudentGroupId() !=null){
            Optional<StudentGroup> gru= studentGroupRepo.findById(assignment.getStudentGroupId());
            if(gru.isPresent()){
                obj.setStudentGroup(gru.get());
            }
        }else{
            Optional<StudentGroup> gru= studentGroupRepo.findByName(assignment.getStudentGroupName());
            if(gru.isPresent()){
                obj.setStudentGroup(gru.get());
            }
        }
        return assignmentRepository.save(obj);
    }

    @Override
    public Assignment getAssignmentById(Long id) {
        return assignmentRepository.findById(id).orElseThrow(() -> new RuntimeException("Assignment not found"));
    }

    @Override
    public List< Assignment> getAssignmentAll() {
        return assignmentRepository.findAll();
    }

    @Override
    public Assignment updateAssignment(Long id, AssignmentDTO assignment) {
        Assignment obj= assignmentRepository.findById(id).orElseThrow(()-> new RuntimeException("not found with the id"+id));
        obj.setDescription(assignment.getDescription());
        obj.setTitle(assignment.getTitle());





        if(assignment.getStudentGroupId() !=null){
            Optional<StudentGroup> gru= studentGroupRepo.findById(assignment.getStudentGroupId());
            if(gru.isPresent()){
                obj.setStudentGroup(gru.get());
            }
        }else{
            Optional<StudentGroup> gru= studentGroupRepo.findByName(assignment.getStudentGroupName());
            if(gru.isPresent()){
                obj.setStudentGroup(gru.get());
            }
        }

        return assignmentRepository.save(obj);
    }

    @Override
    public void deleteAssignment(Long id) {
        assignmentRepository.deleteById(id);
        System.out.println("successfully deleted");
    }


}
