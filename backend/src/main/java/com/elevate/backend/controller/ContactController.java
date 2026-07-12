package com.elevate.backend.controller;

import com.elevate.backend.dto.common.PageResponse;
import com.elevate.backend.dto.contact.ContactMessageRequest;
import com.elevate.backend.dto.contact.ContactMessageResponse;
import com.elevate.backend.dto.contact.ContactSubmissionResponse;
import com.elevate.backend.service.ContactService;
import io.swagger.v3.oas.annotations.security.SecurityRequirements;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/contact")
@RequiredArgsConstructor
@Tag(name = "Contact", description = "Storefront contact form submissions")
public class ContactController {

    private final ContactService contactService;

    @PostMapping
    @SecurityRequirements
    public ResponseEntity<ContactSubmissionResponse> submit(@Valid @RequestBody ContactMessageRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(contactService.submit(request));
    }

    @GetMapping("/admin/messages")
    public ResponseEntity<PageResponse<ContactMessageResponse>> findAll(@PageableDefault(size = 20) Pageable pageable) {
        return ResponseEntity.ok(contactService.findAll(pageable));
    }
}
