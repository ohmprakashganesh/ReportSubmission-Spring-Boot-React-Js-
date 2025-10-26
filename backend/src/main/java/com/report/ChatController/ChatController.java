//package com.report.ChatController;
//
//import com.report.entities.Message;
//import com.report.services.MessageServices;
//import org.springframework.web.bind.annotation.*;
//
//import java.util.List;
//
//@RestController
//@CrossOrigin(origins = "http://localhost:5173", allowCredentials = "true")
//@RequestMapping("/api/chat")
//public class ChatController {
//
//    private  MessageServices messageService;
//
//    public ChatController( MessageServices messageService) {
//        this.messageService = messageService;
//    }
//
//
//
//    @GetMapping("/rooms/{roomId}/messages")
//    public List<Message> getMessages(@PathVariable Long roomId) {
//        return messageService.getMessageByStudentGroup(roomId);
//    }
//
//    @PostMapping("/rooms/{roomId}/messages")
//    public Message sendMessage(@PathVariable Long roomId, @RequestParam String text) {
//        return messageService.sendMessage(roomId, text);
//    }
//
//}
