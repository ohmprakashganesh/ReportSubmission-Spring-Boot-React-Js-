package com.report.impl;

import jakarta.mail.MessagingException;
import jakarta.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.JavaMailSenderImpl;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import java.nio.charset.StandardCharsets;

@Service
public class MailService {
    @Autowired
     private JavaMailSenderImpl javaMailsenderImpl;

    public void sendMail(String to, String subject, String content) throws MessagingException {
        MimeMessage mimeMessage = javaMailsenderImpl.createMimeMessage();
        MimeMessageHelper mimeMessageHelper = new MimeMessageHelper(mimeMessage, false, StandardCharsets.UTF_8.name());
        mimeMessageHelper.setFrom("ohmprakashganesh@gmail.com");
        mimeMessageHelper.setTo(to);
        mimeMessageHelper.setSubject(subject);
        mimeMessageHelper.setText(content,false);
        javaMailsenderImpl.send(mimeMessage);
        System.out.println("successfully sent");
    }
}
