//package com.report.configuration.Websocket;
//
//import com.report.DTOs.ChatMessage;
//import com.report.entities.Message;
//import com.report.entities.MessageRequest;
//import com.report.services.MessageServices;
//import org.springframework.messaging.handler.annotation.MessageMapping;
//import org.springframework.messaging.handler.annotation.SendTo;
//import org.springframework.web.bind.annotation.RestController;
//
//@RestController
//public class ChatWebSocketController {
//    private MessageServices messageServices;
//
//    public  ChatWebSocketController(MessageServices messageServices){
//        this.messageServices=messageServices;
//    }
//
//    // ✅ Client sends to /app/send/{roomId}
//    // ✅ Server saves to DB + broadcasts to /topic/rooms/{roomId}
//
//    @MessageMapping("/send/{roomId}")
//    @SendTo("/topic/rooms/{roomId}")
//    public MessageRequest broadcastMessage(Long roomId, ChatMessage chatMessage) {
//        Message message= messageServices.sendMessage(roomId, chatMessage.getContent().toString());
//        MessageRequest res= new MessageRequest();
//        res.setContent(message.getContent());
//        res.setSender(message.getSender());
//        res.setMessageTime(message.getTimeStamp());
//        return  res;
//    }
//}
