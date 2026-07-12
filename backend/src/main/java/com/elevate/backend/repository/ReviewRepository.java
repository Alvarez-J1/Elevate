package com.elevate.backend.repository;

import com.elevate.backend.entity.Review;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @EntityGraph(attributePaths = {"product", "user"})
    Page<Review> findByProduct_IdOrderByCreatedAtDesc(Long productId, Pageable pageable);

    Optional<Review> findByProduct_IdAndUser_Id(Long productId, Long userId);

    long countByProduct_Id(Long productId);

    long countByUser_Id(Long userId);

    /**
     * JPQL's {@code avg()} always yields a {@link Double} (per the JPA spec,
     * regardless of the underlying column type), so the projection type here
     * must be Double rather than BigDecimal even though the entity field is
     * an int.
     */
    @org.springframework.data.jpa.repository.Query(
            "select coalesce(avg(r.rating), 0.0) from Review r where r.product.id = :productId")
    Double averageRatingForProduct(@org.springframework.data.repository.query.Param("productId") Long productId);
}
