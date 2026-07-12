package com.elevate.backend.dto.order;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record ShippingAddressDto(
        @NotBlank(message = "First name is required")
        @Size(max = 100)
        String firstName,

        @NotBlank(message = "Last name is required")
        @Size(max = 100)
        String lastName,

        @NotBlank(message = "Address is required")
        @Size(max = 200)
        String addressLine1,

        @NotBlank(message = "City is required")
        @Size(max = 100)
        String city,

        @NotBlank(message = "Postal code is required")
        @Size(max = 20)
        String postalCode,

        @NotBlank(message = "Country is required")
        @Size(max = 100)
        String country
) {
}
