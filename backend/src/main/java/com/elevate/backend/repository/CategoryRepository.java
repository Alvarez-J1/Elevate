package com.elevate.backend.repository;

import com.elevate.backend.entity.Category;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CategoryRepository extends JpaRepository<Category, Long> {

    Optional<Category> findBySlugIgnoreCase(String slug);

    boolean existsBySlugIgnoreCase(String slug);
}
