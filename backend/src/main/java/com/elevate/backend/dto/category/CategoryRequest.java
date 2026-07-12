package com.elevate.backend.dto.category;

import jakarta.validation.constraints.NotBlank;
import jakarta.validation.constraints.Size;

public record CategoryRequest(
        @NotBlank(message = "Name is required")
        @Size(max = 100)
        String name,

        @NotBlank(message = "Slug is required")
        @Size(max = 100)
        @jakarta.validation.constraints.Pattern(regexp = "^[a-z0-9]+(-[a-z0-9]+)*$", message = "Slug must be lowercase, alphanumeric, hyphen-separated")
        String slug,

        @NotBlank(message = "Description is required")
        String description,

        @Size(max = 500)
        String imageUrl
) {
}
