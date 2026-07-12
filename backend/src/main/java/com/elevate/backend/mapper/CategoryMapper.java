package com.elevate.backend.mapper;

import com.elevate.backend.dto.category.CategoryResponse;
import com.elevate.backend.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {

    public CategoryResponse toResponse(Category category) {
        return new CategoryResponse(
                category.getId(),
                category.getName(),
                category.getSlug(),
                category.getDescription(),
                category.getImageUrl());
    }
}
