package com.elevate.backend.repository;

import com.elevate.backend.entity.Product;
import jakarta.persistence.LockModeType;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long>, JpaSpecificationExecutor<Product> {

    @EntityGraph(attributePaths = "category")
    Optional<Product> findBySlugIgnoreCase(String slug);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select p from Product p where p.id = :id")
    Optional<Product> findByIdForUpdate(@Param("id") Long id);

    boolean existsBySlugIgnoreCase(String slug);

    boolean existsBySkuIgnoreCase(String sku);

    @EntityGraph(attributePaths = "category")
    List<Product> findTop8ByBadgeIsNotNullOrderByCreatedAtDesc();

    @EntityGraph(attributePaths = "category")
    List<Product> findTop4ByCategory_IdAndIdNot(Long categoryId, Long excludedProductId);
}
