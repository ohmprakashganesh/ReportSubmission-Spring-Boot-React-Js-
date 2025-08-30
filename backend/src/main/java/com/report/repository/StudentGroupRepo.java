package com.report.repository;

import com.report.response.StudentGroupResponse;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import com.report.entities.StudentGroup;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface StudentGroupRepo extends  JpaRepository<StudentGroup, Long> {
    Optional< StudentGroup> findByName(String groupName);

    @Query("""
    SELECT g 
    FROM StudentGroup g 
    LEFT JOIN FETCH g.students 
    LEFT JOIN FETCH g.supervisor 
    WHERE g.id = :id """)
    Optional<StudentGroup> findGroupWithStudentsAndSupervisor(@Param("id") Long id);

    @Query("SELECT g FROM StudentGroup g " +
            "LEFT JOIN FETCH g.students " +
            "LEFT JOIN FETCH g.supervisor " +
            "WHERE g.id = :groupId")
    Optional<StudentGroup> findGroupWithDetails(@Param("groupId") Long groupId);



    @EntityGraph(attributePaths = {"assignments"})
    Optional<StudentGroup> findById(Long id);

    @Query("SELECT u.group FROM User u WHERE u.id = :studentId")
     List<StudentGroup> findGroupByStudentId(@Param("studentId") Long studentId);


//    @Query("SELECT new com.report.dto.StudentGroupResponse(sg.id, sg.name, u.name) " +
//            "FROM StudentGroup sg JOIN sg.supervisor u")
//    List<StudentGroupResponse> getGroupsWithSupervisors();



}
