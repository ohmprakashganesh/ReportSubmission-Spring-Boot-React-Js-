package com.report.configuration;

import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

import lombok.Getter;
import lombok.Setter;

@Configuration
@ConfigurationProperties(prefix="copyleaks")
@Getter
@Setter
public class CopyleaksConfig {

    private String email;
    private String apikey;
    private String baseUrl;
    private String logiUrl;
    private String product;

    
}
