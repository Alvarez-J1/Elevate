package com.elevate.backend.dto.user;

import java.time.Instant;

public record AccountSummaryResponse(
        boolean verified,
        Instant memberSince,
        long orderCount,
        long reviewCount
) {
}
