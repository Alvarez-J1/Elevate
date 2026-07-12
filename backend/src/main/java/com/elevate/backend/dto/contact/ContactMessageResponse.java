package com.elevate.backend.dto.contact;

import java.time.Instant;

public record ContactMessageResponse(
        Long id,
        String name,
        String email,
        String subject,
        String message,
        boolean resolved,
        Instant createdAt
) {
}
