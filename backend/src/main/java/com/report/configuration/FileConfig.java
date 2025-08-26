package com.report.configuration;

import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.ResourceHandlerRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class FileConfig implements WebMvcConfigurer {

        @Override
        public void addResourceHandlers(ResourceHandlerRegistry registry) {
            registry.addResourceHandler("/api/files/**")
                    .addResourceLocations("file:uploads/");
            // change to your actual upload folder path
        }
    }

