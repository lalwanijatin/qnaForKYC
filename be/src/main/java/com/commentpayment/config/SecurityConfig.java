package com.commentpayment.config;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.HttpStatusEntryPoint;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

    @Value("${base_url}")
    private String baseURL;

    @Bean
    SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
        return http

                .authorizeHttpRequests(auth -> {

                    auth.requestMatchers("/").permitAll();
                    auth.requestMatchers("/api/orders").permitAll();
                    auth.requestMatchers("/api/creator/usernames").permitAll();
                    auth.requestMatchers("/api/addcomment").permitAll();
                    auth.requestMatchers("/api/creatorisvalid/**").permitAll();
                    auth.requestMatchers("/api/paymentsuccess").permitAll();

                    auth.requestMatchers("/favicon.ico").permitAll();
                    auth.requestMatchers(HttpMethod.OPTIONS, "/api/**").permitAll();  // Allow preflight requests
                    auth.anyRequest().authenticated();
                })
                .csrf(csrf -> csrf.disable())
                .cors(Customizer.withDefaults())  // Enable CORS globally
                .exceptionHandling(ex -> ex
                        .authenticationEntryPoint(new HttpStatusEntryPoint(HttpStatus.UNAUTHORIZED))
                )
                //.oauth2Login(Customizer.withDefaults())
                .oauth2Login(oauth2 -> oauth2
                        .defaultSuccessUrl("/creator", true)  // Force redirection to root after login
                        .failureUrl("/login?error=true")
                )
                .build();
    }


    @Bean
    public CorsConfigurationSource corsConfigurationSource() {
        CorsConfiguration config = new CorsConfiguration();
        config.addAllowedOrigin(baseURL);
        config.addAllowedMethod("*");
        config.addAllowedHeader("*");
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);
        return source;
    }


}