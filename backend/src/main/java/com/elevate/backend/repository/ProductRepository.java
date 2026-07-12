package com.elevate.backend.repository;

import com.elevate.backend.entity.Product;
import jakarta.persistence.LockModeType;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.EntityGraph;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Lock;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

public interface ProductRepository extends JpaRepository<Product, Long> {

    @EntityGraph(attributePaths = "category")
    Optional<Product> findBySlugIgnoreCase(String slug);

    @Lock(LockModeType.PESSIMISTIC_WRITE)
    @Query("select p from Product p where p.id = :id")
    Optional<Product> findByIdForUpdate(@Param("id") Long id);

    boolean existsBySlugIgnoreCase(String slug);

    boolean existsBySkuIgnoreCase(String sku);

    @Query(value = """
            select p from Product p
            join fetch p.category c
            where (:category is null or lower(c.slug) = lower(:category) or lower(c.name) = lower(:category))
              and (:search is null or lower(p.name) like lower(concat('%', :search, '%'))
                   or lower(p.description) like lower(concat('%', :search, '%')))
              and (:minPrice is null or p.price >= :minPrice)
              and (:maxPrice is null or p.price <= :maxPrice)
              and (:minRating is null or p.rating >= :minRating)
              and (:inStock is null
                   or (:inStock = true and p.stock > 0)
                   or (:inStock = false and p.stock = 0))
              and (:badge is null or lower(p.badge) = lower(:badge))
            order by
              case
                when :sortMode = 'FEATURED' and p.badge is not null then 0
                when :sortMode = 'FEATURED' then 1
                else 0
              end asc,
              case when :sortMode = 'PRICE_ASC' then p.price end asc,
              case when :sortMode = 'PRICE_DESC' then p.price end desc,
              case when :sortMode = 'RATING_ASC' then p.rating end asc,
              case when :sortMode = 'RATING_DESC' then p.rating end desc,
              p.id asc
            """,
            countQuery = """
            select count(p) from Product p
            join p.category c
            where (:category is null or lower(c.slug) = lower(:category) or lower(c.name) = lower(:category))
              and (:search is null or lower(p.name) like lower(concat('%', :search, '%'))
                   or lower(p.description) like lower(concat('%', :search, '%')))
              and (:minPrice is null or p.price >= :minPrice)
              and (:maxPrice is null or p.price <= :maxPrice)
              and (:minRating is null or p.rating >= :minRating)
              and (:inStock is null
                   or (:inStock = true and p.stock > 0)
                   or (:inStock = false and p.stock = 0))
              and (:badge is null or lower(p.badge) = lower(:badge))
            """)
    Page<Product> search(
            @Param("category") String category,
            @Param("search") String search,
            @Param("minPrice") BigDecimal minPrice,
            @Param("maxPrice") BigDecimal maxPrice,
            @Param("minRating") BigDecimal minRating,
            @Param("inStock") Boolean inStock,
            @Param("badge") String badge,
            @Param("sortMode") String sortMode,
            Pageable pageable);

    @EntityGraph(attributePaths = "category")
    List<Product> findTop8ByBadgeIsNotNullOrderByCreatedAtDesc();

    @EntityGraph(attributePaths = "category")
    List<Product> findTop4ByCategory_IdAndIdNot(Long categoryId, Long excludedProductId);
}
