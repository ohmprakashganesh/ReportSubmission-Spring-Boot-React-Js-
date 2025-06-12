package com.report.copyleaks.DTOs;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.time.Instant;
import java.util.HashMap;
import java.util.Map;

@Service
public class AuthService {

    private String accessToken;
    private Instant tokenExpiryTime;
    // Copyleaks Login API URL (fixed)
    private static final String LOGIN_URL = "https://id.copyleaks.com/v3/account/login/api";


    @Value("${copyleaks.email}")
    private String email;

    @Value("${copyleaks.api-key}")
    private String apiKey;
    private final RestTemplate restTemplate;

    // Injecting RestTemplate via constructor

    @Autowired
    public AuthService(RestTemplateBuilder builder) {
        this.restTemplate = builder.build();
    }

    // This method logs into Copyleaks API and returns an access token
    public String getAccessToken() {

        // Return cached token if it's still valid
        if (accessToken != null && tokenExpiryTime != null && Instant.now().isBefore(tokenExpiryTime)) {
            return accessToken;
        }
        // Prepare the request body with Copyleaks account email and API key
        Map<String, String> requestBody = new HashMap<>();
        requestBody.put("email", email);
        requestBody.put("key", apiKey);

        // Prepare HTTP headers
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);

        // Create an HTTP request entity combining headers and body
        HttpEntity<Map<String, String>> request = new HttpEntity<>(requestBody, headers);

        // Send POST request to Copyleaks login API
        ResponseEntity<Map> response = restTemplate.postForEntity(LOGIN_URL, request, Map.class);

        // If login is successful (HTTP 200 OK), extract and return the access token
        if (response.getStatusCode() == HttpStatus.OK) {
            System.out.println("sucess login ");
            System.out.println("sucess login");

            accessToken= (String) response.getBody().get("access_token");
            tokenExpiryTime=Instant.now().plusSeconds(60*60);
             return  accessToken;

        } else {
            // Otherwise, throw an exception
            throw new RuntimeException("Failed to login to Copyleaks API");
        }
    }
}
