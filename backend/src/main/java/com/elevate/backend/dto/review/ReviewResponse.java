package com.elevate.backend.dto.review;

import java.time.Instant;

public record ReviewResponse(
        Long id,
        Long productId,
        String reviewerName,
        int rating,
        String comment,
        Instant createdAt,
        boolean mine
) {
}
