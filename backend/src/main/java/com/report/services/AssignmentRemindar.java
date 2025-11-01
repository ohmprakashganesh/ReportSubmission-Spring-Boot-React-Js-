package com.report.services;

import com.report.entities.Assignment;
import com.report.entities.User;
import com.report.impl.MailService;
import com.report.repository.AssignmentRepo;

import jakarta.mail.MessagingException;
import org.springframework.stereotype.Component;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.scheduling.annotation.Scheduled;
import java.time.LocalDate;
import java.time.temporal.ChronoUnit;
import java.util.List;

@Component
public class AssignmentRemindar {
    @Autowired
    private AssignmentRepo assignmentRepository;
    @Autowired
    private MailService mailService;

    // Runs every day at 8 AM
    @Scheduled(cron = "0 0 8 * * ?")
    public void checkDeadlines() {

        List<Assignment> assignments = assignmentRepository.findAll();
        LocalDate today = LocalDate.now();

        for (Assignment obj : assignments) {
            LocalDate dueDate = obj.getDueDate();

            if (dueDate != null) {
                long daysLeft = ChronoUnit.DAYS.between(today, dueDate);

                // If the due date is within 5 days (but not passed)
                if (daysLeft <= 5 && daysLeft >= 0) {
                    // Check if group and students exist
                    if (obj.getStudentGroup() != null && obj.getStudentGroup().getStudents() != null) {
                        for (User user : obj.getStudentGroup().getStudents()) {
                            try {
                                String to = user.getEmail();
                                String subject = "Reminder: Assignment Due Soon";
                                String message = String.format(
                                        "Dear %s,\n\nYour assignment titled '%s' is due on %s, which is only %d day(s) away. " +
                                                "Please make sure to submit it before the deadline.\n\nBest regards,\nProject Submission System",
                                        user.getName(),
                                        obj.getTitle(),
                                        dueDate,
                                        daysLeft
                                );

                                mailService.sendMail(to, subject, message);
                                System.out.println("Mail sent to: " + user.getEmail());

                            } catch (MessagingException e) {
                                System.err.println("Failed to send mail to " + user.getEmail() + ": " + e.getMessage());
                            }
                        }
                    }
                }
            }
        }
    }

}