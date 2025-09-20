package com.report.impl;

import com.report.entities.Message;
import com.report.entities.StudentGroup;
import com.report.exceptional.UserNotFound;
import com.report.repository.MessageRepo;
import com.report.repository.StudentGroupRepo;
import com.report.services.MessageServices;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class MessageServiceImpl implements MessageServices {

    private MessageRepo messageRepo;
    private StudentGroupRepo studentGroupRepo;

    public MessageServiceImpl(MessageRepo messageRepo, StudentGroupRepo studentGroupRepo) {
        this.messageRepo = messageRepo;
        this.studentGroupRepo=studentGroupRepo;
    }

    @Override
    public Message sendMessage(Long roomid, String text) {
       StudentGroup studentGroup=studentGroupRepo.findById(roomid).orElseThrow(()-> new UserNotFound("group not found with id"+roomid));
       Message message= new Message(studentGroup,text);
       return  messageRepo.save(message);


    }

    @Override
    public List<Message> getMessagedByroom(Long roomId) {
        StudentGroup room = studentGroupRepo.findById(roomId).orElseThrow(() -> new RuntimeException("Room not found"));
        return messageRepo.findByRoomOrderByTimestampAsc(room);

    }
}
