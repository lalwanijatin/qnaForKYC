package com.commentpayment.api;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api")
public class LogoutApi {

    @PostMapping("/logout")
    public void logout(HttpServletRequest request, HttpServletResponse response) {
        request.getSession().invalidate(); // Invalidate the session

        // Clear the JSESSIONID cookie
        response.addHeader("Set-Cookie", "JSESSIONID=; Path=/; HttpOnly; Max-Age=0; SameSite=Strict");
    }
}
