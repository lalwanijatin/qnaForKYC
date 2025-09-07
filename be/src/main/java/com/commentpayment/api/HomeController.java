package com.commentpayment.api;

import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.servlet.view.RedirectView;

@RestController
@RequestMapping("/")
public class HomeController {

    //Just make this redirect to the front end / path. This method shouldn't do anything else
    // In prod when the domains of frontend and backend will be same, this won't be needed anyway
    @GetMapping
    public RedirectView  home(Authentication authentication) {
        if (authentication != null && authentication.getPrincipal() instanceof OAuth2User) {
            return new RedirectView("http://localhost:3000/creator");
        }else{
            return new RedirectView("http://localhost:3000/login");
        }
    }

}

