package com.elevate.backend.dto.order;

import jakarta.validation.Valid;
import jakarta.validation.constraints.Email;
import jakarta.validation.constraints.NotNull;

import java.util.List;

/**
 * Payload for placing an order. Works for both guest and authenticated
 * checkout: {@code contactEmail} is required for guests and defaults to the
 * account email for authenticated users if omitted. Guest checkout supplies
 * its local cart line items here; authenticated checkout uses the user's
 * server-side cart and ignores client-submitted item totals.
 */
public record CheckoutRequest(
        @Email(message = "Contact email must be a valid address")
        String contactEmail,

        @NotNull(message = "Shipping address is required")
        @Valid
        ShippingAddressDto shippingAddress,

        @Valid
        List<CheckoutItemRequest> items
) {
}
