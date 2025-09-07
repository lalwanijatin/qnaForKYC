package com.commentpayment.filter;

import io.github.bucket4j.Bucket;
import io.github.bucket4j.Bandwidth;
import io.github.bucket4j.Refill;
import jakarta.servlet.FilterChain;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AnonymousAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.stereotype.Component;
import org.springframework.web.filter.OncePerRequestFilter;

import java.time.Duration;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;

@Component
public class RateLimiter extends OncePerRequestFilter {

    private final Map<String, Bucket> buckets = new ConcurrentHashMap<>();

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response, FilterChain filterChain) throws java.io.IOException, ServletException {

        Authentication authentication = SecurityContextHolder.getContext().getAuthentication();

        if(authentication != null && !(authentication instanceof AnonymousAuthenticationToken)){ // This should be triggered if the user is logged in
            OAuth2User oauth2User = (OAuth2User) authentication.getPrincipal();
            String email = oauth2User.getAttributes().get("email").toString();

            Bucket bucket = buckets.computeIfAbsent(email, x -> createNewBucket());
            if (bucket.tryConsume(1)) {
                filterChain.doFilter(request, response);
            } else {
                response.setStatus(HttpStatus.TOO_MANY_REQUESTS.value());
                response.getWriter().write("Too many requests! Slow Down!");
            }

        }else{
            filterChain.doFilter(request, response);
        }
    }

    private Bucket createNewBucket() {
        Refill refill = Refill.greedy(30, Duration.ofSeconds(10)); // 20 requests refilled every 10 secs
        Bandwidth limit = Bandwidth.classic(30, refill); // 20 Capacity and initial tokens in the bucket
        return Bucket.builder().addLimit(limit).build();
    }
}


