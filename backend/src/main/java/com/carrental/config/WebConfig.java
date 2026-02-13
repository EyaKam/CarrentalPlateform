package com.carrental.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;

/**
 * CORS Configuration for Spring Boot 4 (Spring Framework 7)
 * 
 * Spring Boot 4 uses WebMvcConfigurer for CORS instead of deprecated methods.
 * This configuration is compatible with MongoDB and doesn't conflict with SecurityFilterChain.
 * 
 * Use environment profiles:
 * - application-dev.properties: Development with relaxed CORS
 * - application-prod.properties: Production with strict CORS
 * 
 * Key differences from deprecated approach:
 * - Uses allowedOriginPatterns instead of allowedOrigins
 * - Supports multiple specific origins safely
 * - Compatible with allowCredentials(true)
 */
@Configuration
public class WebConfig implements WebMvcConfigurer {

    @Value("${cors.allowed-origins:http://localhost:4200,http://localhost:3000}")
    private String allowedOrigins;

    @Value("${cors.allow-credentials:true}")
    private boolean allowCredentials;

    @Value("${cors.max-age:3600}")
    private long maxAge;

    @Override
    public void addCorsMappings(CorsRegistry registry) {
        // Convert comma-separated origins to array
        String[] origins = allowedOrigins.split(",");

        registry.addMapping("/api/**")
                // Use allowedOriginPatterns for Spring Boot 4 compatibility
                // Supports specific origins without wildcard conflicts
                .allowedOriginPatterns(origins)
                // Allow common HTTP methods for REST APIs
                .allowedMethods("GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS")
                // Allow necessary headers for authentication and content type
                .allowedHeaders(
                    "Authorization",
                    "Content-Type",
                    "Accept",
                    "X-Requested-With",
                    "Access-Control-Request-Headers",
                    "Access-Control-Request-Method"
                )
                // Allow credentials (cookies, auth headers) in cross-origin requests
                .allowCredentials(allowCredentials)
                // Expose headers that frontend needs to access
                .exposedHeaders(
                    "Authorization",
                    "Content-Length",
                    "X-JSON-Response"
                )
                // Cache preflight requests for specified time (seconds)
                .maxAge(maxAge);
    }
}
