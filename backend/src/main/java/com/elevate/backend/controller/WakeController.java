package com.elevate.backend.controller;

import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
public class WakeController {

    private static final String DEMO_RESUME_URL = "https://elevate-storefront.vercel.app/login?resumeDemo=1";

    @GetMapping("/wake")
    public ResponseEntity<Void> wake() {
        return ResponseEntity.status(HttpStatus.SEE_OTHER)
                .header(HttpHeaders.LOCATION, DEMO_RESUME_URL)
                .build();
    }
}
