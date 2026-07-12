package com.elevate.backend.dto.contact;

import java.time.Instant;

public record ContactSubmissionResponse(
        Long id,
        Instant createdAt
) {
}
