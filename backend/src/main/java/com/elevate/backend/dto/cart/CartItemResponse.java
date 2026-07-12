package com.elevate.backend.dto.cart;

import java.math.BigDecimal;

public record CartItemResponse(
        Long id,
        Long productId,
        String productName,
        String productSlug,
        String productImage,
        BigDecimal unitPrice,
        int quantity,
        String color,
        BigDecimal lineTotal,
        boolean inStock
) {
}
