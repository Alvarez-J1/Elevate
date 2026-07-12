package com.elevate.backend.service;

import com.elevate.backend.dto.category.CategoryRequest;
import com.elevate.backend.dto.category.CategoryResponse;
import com.elevate.backend.entity.Category;
import com.elevate.backend.exception.DuplicateResourceException;
import com.elevate.backend.exception.ResourceNotFoundException;
import com.elevate.backend.mapper.CategoryMapper;
import com.elevate.backend.repository.CategoryRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
@RequiredArgsConstructor
public class CategoryService {

    private final CategoryRepository categoryRepository;
    private final CategoryMapper categoryMapper;

    @Transactional(readOnly = true)
    public List<CategoryResponse> findAll() {
        return categoryRepository.findAll().stream().map(categoryMapper::toResponse).toList();
    }

    @Transactional(readOnly = true)
    public CategoryResponse findBySlug(String slug) {
        return categoryMapper.toResponse(getCategoryEntityBySlug(slug));
    }

    @Transactional(readOnly = true)
    public Category getCategoryEntityBySlug(String slug) {
        return categoryRepository.findBySlugIgnoreCase(slug)
                .orElseThrow(() -> ResourceNotFoundException.of("Category", slug));
    }

    @Transactional(readOnly = true)
    public Category getCategoryEntityById(Long id) {
        return categoryRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("Category", id));
    }

    @Transactional
    public CategoryResponse create(CategoryRequest request) {
        if (categoryRepository.existsBySlugIgnoreCase(request.slug())) {
            throw new DuplicateResourceException("A category with slug '" + request.slug() + "' already exists");
        }

        Category category = Category.builder()
                .name(request.name())
                .slug(request.slug())
                .description(request.description())
                .imageUrl(request.imageUrl())
                .build();

        return categoryMapper.toResponse(categoryRepository.save(category));
    }

    @Transactional
    public CategoryResponse update(Long id, CategoryRequest request) {
        Category category = getCategoryEntityById(id);

        if (!category.getSlug().equalsIgnoreCase(request.slug())
                && categoryRepository.existsBySlugIgnoreCase(request.slug())) {
            throw new DuplicateResourceException("A category with slug '" + request.slug() + "' already exists");
        }

        category.setName(request.name());
        category.setSlug(request.slug());
        category.setDescription(request.description());
        category.setImageUrl(request.imageUrl());

        return categoryMapper.toResponse(category);
    }

    @Transactional
    public void delete(Long id) {
        Category category = getCategoryEntityById(id);
        categoryRepository.delete(category);
    }
}
