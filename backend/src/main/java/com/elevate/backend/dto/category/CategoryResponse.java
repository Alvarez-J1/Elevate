package com.elevate.backend.dto.category;

public record CategoryResponse(
        Long id,
        String name,
        String slug,
        String description,
        String imageUrl
) {
}
