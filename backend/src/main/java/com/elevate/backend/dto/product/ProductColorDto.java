package com.elevate.backend.dto.product;

import jakarta.validation.constraints.NotBlank;

public record ProductColorDto(
        @NotBlank(message = "Color name is required")
        String name,

        @NotBlank(message = "Color value is required")
        String value
) {
}
