package com.elevate.backend.dto.product;

import java.math.BigDecimal;

/**
 * A lighter-weight projection used in list views (shop grid, cart line items,
 * order line items) where the full spec/feature payload is unnecessary.
 */
public record ProductSummaryResponse(
        Long id,
        String slug,
        String name,
        String tagline,
        String categoryName,
        BigDecimal price,
        BigDecimal originalPrice,
        BigDecimal rating,
        int reviewCount,
        String primaryImage,
        String badge,
        boolean inStock,
        String accent
) {
}
