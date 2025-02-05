package com.nuwaish.crypto_fusion.controller;

import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class HomeController {

    @GetMapping
    public String home() {
        return "Welcome to the crypto fusion";
    }

    @GetMapping("/api")
    public String secureRoute() {
        return "This is secure route.";
    }
}
