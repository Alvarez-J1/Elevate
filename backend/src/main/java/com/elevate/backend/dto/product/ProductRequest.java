package com.elevate.backend.dto.product;

import jakarta.validation.Valid;
import jakarta.validation.constraints.DecimalMin;
import jakarta.validation.constraints.Min;
import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.NotEmpty;
import jakarta.validation.constraints.NotNull;
import jakarta.validation.constraints.Size;

import java.math.BigDecimal;
import java.util.List;
import java.util.Map;

public record ProductRequest(
        @NotBlank(message = "SKU is required")
        @Size(max = 50)
        String sku,

        @NotBlank(message = "Slug is required")
        @Size(max = 150)
        @jakarta.validation.constraints.Pattern(regexp = "^[a-z0-9]+(-[a-z0-9]+)*$", message = "Slug must be lowercase, alphanumeric, hyphen-separated")
        String slug,

        @NotBlank(message = "Name is required")
        @Size(max = 200)
        String name,

        @NotBlank(message = "Tagline is required")
        @Size(max = 500)
        String tagline,

        @NotNull(message = "Category id is required")
        Long categoryId,

        @NotNull(message = "Price is required")
        @DecimalMin(value = "0.0", inclusive = false, message = "Price must be greater than zero")
        BigDecimal price,

        @DecimalMin(value = "0.0", inclusive = false, message = "Original price must be greater than zero")
        BigDecimal originalPrice,

        @NotBlank(message = "Description is required")
        String description,

        @NotEmpty(message = "At least one feature is required")
        List<@NotBlank String> features,

        Map<@NotBlank String, @NotBlank String> specs,

        @Valid
        List<ProductColorDto> colors,

        @NotEmpty(message = "At least one image is required")
        List<@NotBlank String> images,

        @Size(max = 100)
        String badge,

        @Min(value = 0, message = "Stock cannot be negative")
        int stock,

        @NotBlank(message = "Accent color is required")
        String accent
) {
}
