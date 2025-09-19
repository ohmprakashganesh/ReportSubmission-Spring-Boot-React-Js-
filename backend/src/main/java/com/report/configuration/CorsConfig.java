package com.report.configuration;
//
//import org.springframework.context.annotation.Bean;
//import org.springframework.context.annotation.Configuration;
//import org.springframework.web.cors.CorsConfiguration;
//import org.springframework.web.cors.CorsConfigurationSource;
//import org.springframework.web.cors.UrlBasedCorsConfigurationSource;
//import java.util.List;
//
//@Configuration
//public class CorsConfig {
//
//    @Bean
//    public CorsConfigurationSource corsConfigurationSource() {
//        CorsConfiguration config = new CorsConfiguration();
//        config.setAllowedOrigins(List.of("http://localhost:5173")); // 👈 this sets Access-Control-Allow-Origin
//        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // 👈 this sets Allow-Methods
//        config.setAllowedHeaders(List.of("*")); // 👈 this sets Allow-Headers
//        config.setAllowCredentials(true); // 👈 this sets Allow-Credentials
//
//        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
//        source.registerCorsConfiguration("/**", config);
//        return source;
//    }
//
//
//}
//
////@Configuration
////public class CorsConfig {
////    @Bean
////    public WebMvcConfigurer corsConfigurer() {
////
////        return new WebMvcConfigurer() {
////            @Override
////            public void addCorsMappings(CorsRegistry registry) {
////                registry.addMapping("/**")  // allow all endpoints
////                        .allowedOrigins("http://localhost:5173")  // allow your frontend
////                        .allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
////                            .allowedHeaders("Authorization", "Content-Type")
////                        .allowCredentials(true);
////            }
////        };
////    }
////}
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

@Configuration
public class CorsConfig {

    @Bean
    public WebMvcConfigurer corsConfigurer() {
        return new WebMvcConfigurer() {
            @Override
            public void addCorsMappings(CorsRegistry registry) {
                registry.addMapping("/**")
                        .allowedOrigins("http://localhost:5173")
                        .allowedMethods("GET","POST","PUT","DELETE","OPTIONS")
                        .allowedHeaders("Authorization", "Content-Type")
                        .allowCredentials(true); // important for JWT
            }
        };
    }
}
