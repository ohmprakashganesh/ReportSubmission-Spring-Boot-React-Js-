package com.report.repository;

import com.report.entities.Message;
import com.report.entities.StudentGroup;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface MessageRepo  extends JpaRepository<Message,Long> {
    List<Message> findByRoomOrderByTimestampAsc(StudentGroup room);

}
