package com.report.entities;

import jakarta.persistence.Entity;
import jakarta.persistence.FetchType;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Entity
@Data
public class Message {
     private  Long id;
    private String sender;
    private String content;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "room_id")
    private StudentGroup room;
    private LocalDateTime timeStamp;

    public Message(StudentGroup room, String content) {
        this.room= room;
        this.content=content;

    }
}
