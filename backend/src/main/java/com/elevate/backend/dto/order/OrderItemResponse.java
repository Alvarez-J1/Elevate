package com.elevate.backend.dto.order;

import java.math.BigDecimal;

public record OrderItemResponse(
        Long id,
        Long productId,
        String productName,
        String productImage,
        BigDecimal unitPrice,
        int quantity,
        String color,
        BigDecimal lineTotal
) {
}
