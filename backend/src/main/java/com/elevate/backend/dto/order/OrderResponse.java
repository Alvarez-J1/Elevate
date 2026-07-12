package com.elevate.backend.dto.order;

import java.math.BigDecimal;
import java.time.Instant;
import java.util.List;

public record OrderResponse(
        Long id,
        String orderNumber,
        String status,
        String contactEmail,
        ShippingAddressDto shippingAddress,
        List<OrderItemResponse> items,
        BigDecimal subtotal,
        BigDecimal shippingCost,
        BigDecimal tax,
        BigDecimal total,
        Instant createdAt
) {
}
