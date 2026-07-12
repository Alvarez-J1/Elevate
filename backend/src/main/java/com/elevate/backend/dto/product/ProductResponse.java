package com.elevate.backend.dto.product;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public record ProductResponse(
        Long id,
        String sku,
        String slug,
        String name,
        String tagline,
        String categoryName,
        String categorySlug,
        BigDecimal price,
        BigDecimal originalPrice,
        BigDecimal rating,
        int reviewCount,
        String description,
        List<String> features,
        Map<String, String> specs,
        List<ProductColorDto> colors,
        List<String> images,
        String badge,
        int stock,
        boolean inStock,
        String accent
) {
}
