package com.elevate.backend.dto.order;

import jakarta.validation.constraints.Max;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotNull;

public record CheckoutItemRequest(
        @NotNull(message = "Product id is required")
        Long productId,

        @Min(value = 1, message = "Quantity must be at least 1")
        @Max(value = 99, message = "Quantity cannot exceed 99")
        int quantity,

        String color
) {
}
