package com.report.copyleaks.DTOs;


import com.report.entities.Plagiarism;
import com.report.repository.PlagiarismRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/webhook")
public class WebHook {

    private final PlagiarismRepo plagiarismRepo;

    @Autowired
    public WebHook(PlagiarismRepo plagiarismRepo) {
        this.plagiarismRepo = plagiarismRepo;
    }

    @PostMapping
    public ResponseEntity<String> handleWebhook(
            @RequestParam(name = "event") String event,
            @RequestBody Map<String, Object> payload) {


        // 1. Extract scanId and percentage
        System.out.println("entered the web hook ");
        System.out.println("entered the web hook ");

        String scanId = (String) payload.get("scanId");

        Map<String, Object> results = (Map<String, Object>) payload.get("results");
        double plagiarismScore = (Double) results.get("score"); // Score is usually 0-100

        // 2. Find the document by scanId
        Optional<Plagiarism> optionalScanned = plagiarismRepo.findByScanId(scanId);
        System.out.println( "reached the hootk class"+optionalScanned.get().toString());

        if (optionalScanned.isPresent()) {
            Plagiarism scanned = optionalScanned.get();
            scanned.setStatus("Completed");
            scanned.setPlagiarismPercentage(plagiarismScore); // save plagiarism %

            plagiarismRepo.save(scanned); // update in DB
        }

        return ResponseEntity.ok("Webhook Received Successfully");
    }
}
