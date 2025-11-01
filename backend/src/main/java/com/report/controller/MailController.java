package com.report.controller;
import com.report.impl.MailService;
import jakarta.mail.MessagingException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;


@RestController
@RequestMapping("/api/mail")
public class MailController {

        @Autowired
        private MailService mailService;

        @GetMapping("/send")
        public String sendMail(
                @RequestParam String to,
                @RequestParam String subject,
                @RequestParam String message) {
            try {
                mailService.sendMail(to, subject, message);
                return "Mail sent successfully to " + to;
            } catch (MessagingException e) {
                e.printStackTrace();
                return "Error sending mail: " + e.getMessage();
            }
        }
    }


