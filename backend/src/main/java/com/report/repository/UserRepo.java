package com.report.repository;

import com.report.entities.AssignmentIteration;
import com.report.entities.Role;
import com.report.services.UserProjection;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import com.report.entities.User;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserRepo extends  JpaRepository<User, Long> {

    List<User> findByRole(Role role);

    Optional<User> findByEmail(String username);


    @Query("SELECT u.id AS id, u.name AS name, u.email AS email, u.role AS role FROM User u WHERE u.email = :email")
    Optional<UserProjection> findBasicByEmail(@Param("email") String email);


    @Query("SELECT u FROM User u WHERE u.group.id = :groupId")
    List<User> findByGroupId(@Param("groupId") Long groupId);
    int countByRole(Role role);



    @Query("SELECT u FROM User u " +
            "WHERE u.role = 'STUDENT' " +
            "AND u.group.supervisor.id = :supervisorId")
    List<User> findStudentsBySupervisorId(@Param("supervisorId") Long supervisorId);

    List<User> findByNameAndRole(String name, Role role);


    List<User> findByRoleOrderByNameAsc(Role role);


    List<User> findByRoleOrderByNameDesc(Role role);
}
