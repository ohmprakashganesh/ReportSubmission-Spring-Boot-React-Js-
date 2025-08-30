package com.report.mapping;

import com.report.DTOs.*;
import com.report.entities.*;
import com.report.repository.AssignmentIterationRepo;
import com.report.repository.StudentGroupRepo;
import com.report.response.ResponseUser;
import lombok.AllArgsConstructor;
import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;


@Component
@AllArgsConstructor
public class MappingCls {
    //
//
// public  final StudentGroupRepo stdrepo;
// public final AssignmentIterationRepo itrRepo;
//
//   public List<AssignmentIteration >  itrList(List<Long> args){
//       List<AssignmentIteration> itrs=null;
//
//       for(Long id: args){
//           Optional<AssignmentIteration> opt= itrRepo.findById(id);
//           if(opt.isPresent()){
//
//               itrs.add()
//           }
//
//
//       }
//       return null;
//
//    }
//
//    public StudentGroup dtoToStdGrp(Long id){
//        StudentGroup  org=null;
//        Optional<StudentGroup> obj= stdrepo.findById(id);
//        if(obj.isPresent()){
//
//            org.setGroupName(obj.get().getGroupName());
//            org.setStudents(obj.get().getStudents());
//            org.setSupervisor(obj.get().getSupervisor());
//
//        }
//        return  org;
//
//    }
//
//   public List<StudentGroup> dtotoSupervised(List<Long> ids){
//        List<StudentGroup> obj=null;
//        if(ids==null){
//            return null;
//        }else{
//            for(Long id: ids){
//              obj.add(dtoToStdGrp(id));
//
//
//            }
//        }
//        return  obj;
//
//   }
//
    public User dtoTouser(UserDTO dto) {
        return User.builder()
                .id(dto.getId())
                .email(dto.getEmail())
                .name(dto.getName())
                .password(dto.getPassword())
//                .group(dtoToStdGrp(dto.getStdGroupId()))
//                .supervisedGroups(dtotoSupervised(dto.getSuperviserGroupsIds()))
                .build();

    }



//
////    public List< StrudentGroupDTO > stdGroupToDTO( List< StudentGroup> grp){
////        List<StrudentGroupDTO> lst= new ArrayList<>();
////        for (StudentGroup group: grp){
////             StrudentGroupDTO.builder().id(group.getId())
////                     .groupName(group.getGroupName())
////                     .supervisorId(group.getSupervisor().getId())
////                     .build();
//////                     .stdIds(group.getStudents())
////
////
////        }
//
////    }
//
////    List<StrudentGroupDTO> lists= new ArrayList<>();
////    List<User> usr= user.getGroup().getStudents();
////       for(User u: usr){
////        UserDTO dto=
////    }
//
////    public UserDTO userToDTO(User user){
////
////     return    UserDTO.builder()
////                .role(user.getRole())
////                .id(user.getId())
////                .email(user.getEmail())
////                .name(user.getName())
////                .supervisedGroups(stdGroupToDTO(user.getSupervisedGroups()))
////                .group(user.getGroup())
////                .build();
////
////    }
//
//    public List<AssignmentIteration> itr
//
//    public Assignment dtoToAssignment(AssignmentDTO dto) {
//        return Assignment.builder()
//                .id(dto.getId())
//                .description(dto.getDescription())
//                .title(dto.getTitle())
//                .studentGroup(dtoToStdGrp(dto.getStudentGroupId()))
//                .iterations(dto.getIterations())
//                .build();
//    }
//
////    public AssignmentDTO assignmentToDTO(Assignment assignment) {
////        return AssignmentDTO.builder()
////                .id(assignment.getId())
////                .description(assignment.getDescription())
////                .title(assignment.getTitle())
////                .studentGroup(assignment.getStudentGroup())
////                .iterations(assignment.getIterations())
////                .build();
////    }
//
//    public AssignmentIteration dtoToAssignmentIteration(AssignmentIterDTO dto) {
//        return AssignmentIteration.builder()
//                .id(dto.getId())
//                .iterationType(dto.getIterationType())
//                .documentUrl(dto.getDocumentUrl())
//                .assignment(dto.getAssignment())
//                .status(dto.getStatus())
//                .submittedBy(dto.getSubmittedBy())
//                .feedback(dto.getFeedback())
//                .build();
//    }
//
////    public AssignmentIterDTO assignmentIterationToDTO(AssignmentIteration iteration) {
////        return AssignmentIterDTO.builder()
////                .id(iteration.getId())
////                .iterationType(iteration.getIterationType())
////                .documentUrl(iteration.getDocumentUrl())
////                .assignment(iteration.getAssignment())
////                .status(iteration.getStatus())
////                .submittedBy(iteration.getSubmittedBy())
////                .feedback(iteration.getFeedback())
////                .build();
////    }
//
//
//    public Feedback dtoToFeedback(FeedbackDTO dto) {
//        return Feedback.builder()
//                .id(dto.getId())
//                .comments(dto.getComments())
//                .submittedAt(dto.getSubmittedAt())
//                .assignmentIteration(dto.getAssignmentIteration())
//                .supervisor(dto.getSupervisor())
//                .build();
//    }
//
////    public FeedbackDTO feedbackToDTO(Feedback feedback) {
////        return FeedbackDTO.builder()
////                .id(feedback.getId())
////                .comments(feedback.getComments())
////                .submittedAt(feedback.getSubmittedAt())
////                .assignmentIteration(feedback.getAssignmentIteration())
////                .supervisor(feedback.getSupervisor())
////                .build();
////    }
//
//    public StudentGroup dtoToStudentGroup(StrudentGroupDTO dto) {
//        return StudentGroup.builder()
//                .id(dto.getId())
//                .groupName(dto.getGroupName())
//                .students(dto.getStudents())
//                .supervisor(dto.getSupervisor())
//                .assignments(dto.getAssignments())
//                .build();
//    }
//
////    public StrudentGroupDTO studentGroupToDTO(StudentGroup group) {
////        return StrudentGroupDTO.builder()
////                .id(group.getId())
////                .groupName(group.getGroupName())
////                .students(group.getStudents())
////                .supervisor(group.getSupervisor())
////                .assignments(group.getAssignments())
////                .build();
////    }
//
//}


   public static  StudentGroupDetailDTO studentGrpToDto(StudentGroup group){
        StudentDto std= new StudentDto();
         List<StudentDto> stdList= new ArrayList<>();
        SupervisorDto sup= new SupervisorDto();
          sup.setId(group.getSupervisor().getId());
          sup.setName(group.getSupervisor().getName());
           sup.setEmail(group.getSupervisor().getEmail());

           for(User user: group.getStudents()){
               std.setId(user.getId());
               std.setName(user.getName());
               std.setEmail(user.getEmail());
               stdList.add(std);
           }
       StudentGroupDetailDTO  obj= new StudentGroupDetailDTO();
           obj.setStudents(stdList);
           obj.setId(group.getId());
           obj.setName(group.getName());
           obj.setSupervisor(sup);

          return  obj;
    }

    public  static StudentDto userToStudetnDto(User user){
        StudentDto dto= new StudentDto();
        dto.setEmail(user.getEmail());
        dto.setName(user.getName());
        dto.setId(user.getId());
        List<StudentGroup> list= new ArrayList<>();
        list.add(user.getGroup());
        System.out.println(user.getGroup());
        dto.setGroups(list);
        return  dto;
    }










//    public static List< ResponseUser> UserToResponse(List<User> user){
//        List<ResponseUser> users2=new ArrayList<>();
//        for (User usr: user){
//            ResponseUser user1=new ResponseUser();
//            user1.setId(usr.getId());
//            user1.setEmail(usr.getEmail());
//            user1.setName(usr.getName());
//
//            users2.add(user1);
//
//
//
//        }
//        return  users2;
//
//    }
//

        }