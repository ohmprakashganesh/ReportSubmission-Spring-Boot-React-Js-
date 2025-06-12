package com.report.copyleaks.DTOs;
//import com.fasterxml.jackson.databind.ObjectMapper;
//import com.report.entities.Plagiarism;
//import com.report.repository.PlagiarismRepo;
//import org.slf4j.Logger;
//import org.slf4j.LoggerFactory;
//import org.springframework.beans.factory.annotation.Autowired;
//import org.springframework.boot.web.client.RestTemplateBuilder;
//import org.springframework.http.*;
//import org.springframework.stereotype.Service;
//import org.springframework.web.client.HttpClientErrorException;
//import org.springframework.web.client.RestClientException;
//import org.springframework.web.client.RestTemplate;
//import java.io.IOException;
//import java.nio.file.Path;
//import java.nio.file.Files;
//import java.nio.file.Paths;
//import java.util.*;
//
//@Service
public class CopyLeaksCheck {
}

//    Logger logger= LoggerFactory.getLogger(CopyLeaksCheck.class);
//
//        private final RestTemplate restTemplate;
//        private final AuthService authService;
//        private final PlagiarismRepo scannedRepository;
//
//
//
//        @Autowired
//        public CopyLeaksCheck(RestTemplateBuilder builder, AuthService authService, PlagiarismRepo plagiarismRepo) {
//            this.restTemplate = builder.build();
//            this.authService = authService;
//            this.scannedRepository = plagiarismRepo;
//        }
//
//
//        public void submitDocumentFromFile(String[] details) throws IOException {
//          // 1. Get Access Token
//            String accessToken = authService.getAccessToken();
//
//               String scanId= UUID.randomUUID().toString();
////             String submitUrl="https://api.copyleaks.com/v3/education/submit/file/"+scanId;
//            String submitUrl="https://api.copyleaks.com/v3/submit/file/"+scanId;
//
//
//
//            // 2. Prepare Headers
//            HttpHeaders headers = new HttpHeaders();
//            headers.setContentType(MediaType.APPLICATION_JSON);
//            headers.setBearerAuth(accessToken);
//
//
//            String filename = details[0];
//            String filePath = details[2];
//
//            // 1. Validate details array
//            if (details == null || details.length < 3) {
//                throw new IllegalArgumentException("details array must contain filename and file path");
//            }
//
//
//            // 2. Validate file path
//            Path location = Paths.get(filePath);
//
//            if (!Files.exists(location)) {
//                throw new IOException("File not found: " + filePath);
//            }
//
//            if (Files.isDirectory(location)) {
//                throw new IOException("Path is a directory: " + filePath);
//            }
//
//
//            // 3. Read file and encode to Base64
//            byte[] fileBytes = Files.readAllBytes(location);
//            String base64FileContent = Base64.getEncoder().encodeToString(fileBytes);
//
//            // 4. Webhook configuration
//            List<Map<String, String>> webhooks = new ArrayList<>();
//            webhooks.add(new HashMap<>() {{
//                put("url", "https://bccc-163-53-25-148.ngrok-free.app/webhook");
//                put("event", "completed");
//            }});
//
//            // 5. Request body construction
//            Map<String, Object> requestBody = new HashMap<>();
//            requestBody.put("base64", base64FileContent);
//            requestBody.put("filename", filename);
//            requestBody.put("properties", new HashMap<>() {{
//                put("webhooks", webhooks);
//                put("sandbox", true);
//                put("customId", UUID.randomUUID().toString());
//            }});
//
//            // 1. Create document structure
////            Map<String, Object> document = new HashMap<>();
////            document.put("base64", base64FileContent);
////            document.put("filename", filename);
////
////// 2. Correct webhook configuration
////            List<Map<String, String>> webhooks = new ArrayList<>();
////            webhooks.add(new HashMap<>() {{
////                put("url", "https://bccc-163-53-25-148.ngrok-free.app/webhook");
////                put("event", "completed"); // Correct parameter name
////            }});
////
////// 3. Build properties
////            Map<String, Object> properties = new HashMap<>();
////            properties.put("sandbox", true);
////            properties.put("customId", scanId);
////            properties.put("webhooks", webhooks);
////
////// 4. Assemble final request body
////            Map<String, Object> body = new HashMap<>();
////            body.put("document", document);  // Nest document here
////            body.put("properties", properties);
//
////            List<Map<String, String>> webhooks = new ArrayList<>();
////            webhooks.add(new HashMap<>() {{
////                put("url", "https://bccc-163-53-25-148.ngrok-free.app/webhook");
////                put("status", "completed"); // Changed from "status" to "event"
////            }});
////
////            Map<String, Object> properties = new HashMap<>();
////            properties.put("sandbox", true);
////            properties.put("customId", scanId);
////            properties.put("webhooks", webhooks);
//
//            Map<String, Object> properties = new HashMap<>();
//            properties.put("sandbox", true);
//            properties.put("customId", scanId);
////
//            Map<String, Object> body = new HashMap<>();
//            body.put("base64", base64FileContent);
//            body.put("filename", filename);
//            body.put("properties", properties);
//
//
//
//
////            Map<String, Object> body = new HashMap<>();
////            body.put("document", document);
////            body.put("properties", properties);
//
//            Map<String, Object> body = new HashMap<>();
//            body.put("base64", base64FileContent);
//            body.put("filename",filename);
////            Map<String, Object> document = new HashMap<>();
////            document.put("base64", base64FileContent);
////            document.put("filename", filename);
//
//
//
////            Map<String, Object> properties = new HashMap<>();
////            properties.put("sandbox", true);
////            properties.put("customId", scanId);
////            properties.put("webhooks", webhooks);
////             Optional, for testing only
//            List<Map<String, String>> webhooks = List.of(
//                    Map.of(
//                            "url", "https://bccc-163-53-25-148.ngrok-free.app/webhook",
//                            "status", "completed"
//                    )
//            );
//
//
//
//            // 5. Log the request body
//            ObjectMapper mapper = new ObjectMapper();
//            String requestBodyJson = mapper.writerWithDefaultPrettyPrinter().writeValueAsString(requestBody);
//            System.out.println("Request Body JSON:\n" + requestBodyJson);
//
//            //create http entiry
//            HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
//
//            try {
//                ResponseEntity<String> response = restTemplate.exchange(
//                        submitUrl,
//                        HttpMethod.POST,
//                        request,
//                        String.class
//                );
//
//                // 12. Handle response
//                if (response.getStatusCode().is2xxSuccessful()) {
//                    logger.info("Successfully submitted document to Copyleaks. Scan ID: {}", scanId);
//                } else {
//                    logger.error("Unexpected response from Copyleaks: {} - {}",
//                            response.getStatusCodeValue(),
//                            response.getBody());
//                    throw new RuntimeException("Failed to submit document. Response: " + response.getBody());
//                }
//            } catch (HttpClientErrorException e) {
//                logger.error("Copyleaks API error: {} - {}", e.getStatusCode(), e.getResponseBodyAsString());
//                throw new RuntimeException("Copyleaks API error: " + e.getResponseBodyAsString());
//            } catch (RestClientException e) {
//                logger.error("Communication error with Copyleaks API", e);
//                throw new RuntimeException("Failed to communicate with Copyleaks API", e);
//            }
//
//
//
//
//
//
//
//
//
//
//
//
//            Plagiarism scanned = new Plagiarism();
//            scanned.setScanId(scanId);
//            scanned.setFileName(filename);
//            scanned.setStatus("Submitted");
//            scannedRepository.save(scanned);
//            logger.info("Scan metadata saved successfully");
//
//
//
//        }
//    }
//
//
