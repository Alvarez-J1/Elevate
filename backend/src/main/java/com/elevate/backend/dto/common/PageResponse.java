package com.elevate.backend.dto.common;

import org.springframework.data.domain.Page;

import java.util.List;

/**
 * A simplified, stable pagination envelope so API consumers aren't coupled
 * to Spring Data's internal {@code Page} JSON representation.
 */
public record PageResponse<T>(
        List<T> content,
        int page,
        int size,
        long totalElements,
        int totalPages,
        boolean last
) {

    public static <T> PageResponse<T> from(Page<T> page) {
        return new PageResponse<>(
                page.getContent(),
                page.getNumber(),
                page.getSize(),
                page.getTotalElements(),
                page.getTotalPages(),
                page.isLast());
    }
}
