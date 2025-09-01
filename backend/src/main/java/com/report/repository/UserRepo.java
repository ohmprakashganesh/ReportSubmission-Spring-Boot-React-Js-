package com.report.repository;

import com.report.entities.AssignmentIteration;
import com.report.entities.Role;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.report.entities.User;

import java.util.List;

@Repository
public interface UserRepo extends  JpaRepository<User, Long> {

    List<User> findByRole(Role role);

    @Query("SELECT u FROM User u WHERE u.group.id = :groupId")
    List<User> findByGroupId(@Param("groupId") Long groupId);
    int countByRole(Role role);

    @Query("SELECT u FROM User u " +
            "WHERE u.role = 'STUDENT' " +
            "AND u.group.supervisor.id = :supervisorId")
    List<User> findStudentsBySupervisorId(@Param("supervisorId") Long supervisorId);

    
}
