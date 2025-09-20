package com.report.services;

import com.report.entities.Message;

import java.util.List;

public interface MessageServices {
    Message sendMessage(Long roomid, String text );
    List<Message> getMessagedByroom(Long roomId);
}
