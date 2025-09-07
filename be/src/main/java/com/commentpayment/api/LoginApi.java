package com.commentpayment.api;

import org.springframework.http.HttpStatus;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.ResponseStatus;

public class LoginApi {

    @ResponseStatus(HttpStatus.UNAUTHORIZED)
    @GetMapping("/api/login")
    public void login(){
        // This endpoint returns a 401 to trigger the React app's redirect logic
    }
}
