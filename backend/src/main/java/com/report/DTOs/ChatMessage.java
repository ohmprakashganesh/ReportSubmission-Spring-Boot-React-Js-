package com.report.DTOs;

public class ChatMessage {
    private String content;
    private Long roomId;

    // constructors
    public ChatMessage() {}
    public ChatMessage(String content, Long roomId) {
        this.content = content;
        this.roomId = roomId;
    }

    // getters & setters
    public String getContent() { return content; }
    public void setContent(String content) { this.content = content; }

    public Long getRoomId() { return roomId; }
    public void setRoomId(Long roomId) { this.roomId = roomId; }
}
