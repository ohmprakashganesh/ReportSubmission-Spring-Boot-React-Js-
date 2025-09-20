package com.report.configuration.Websocket;

import com.report.DTOs.ChatMessage;
import com.report.services.MessageServices;
import org.springframework.messaging.Message;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class ChatWebSocketController {
    private MessageServices messageServices;

    public  ChatWebSocketController(MessageServices messageServices){
        this.messageServices=messageServices;
    }

    @MessageMapping("/send")
    @SendTo("/topic/messages")
    public Message broadcastMessage(ChatMessage message){
        return (Message) messageServices.sendMessage(message.getRoomId(),message.getContent());

    }
}
