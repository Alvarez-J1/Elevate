package com.elevate.backend.service;

import com.elevate.backend.dto.common.PageResponse;
import com.elevate.backend.dto.product.ProductRequest;
import com.elevate.backend.dto.product.ProductResponse;
import com.elevate.backend.dto.product.ProductSummaryResponse;
import com.elevate.backend.entity.Category;
import com.elevate.backend.entity.Product;
import com.elevate.backend.exception.BadRequestException;
import com.elevate.backend.exception.DuplicateResourceException;
import com.elevate.backend.exception.ResourceNotFoundException;
import com.elevate.backend.mapper.ProductMapper;
import com.elevate.backend.repository.ProductRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.data.domain.Sort;
import org.springframework.data.jpa.domain.Specification;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.util.List;
import java.util.Locale;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ProductService {

    private final ProductRepository productRepository;
    private final CategoryService categoryService;
    private final ProductMapper productMapper;

    @Transactional(readOnly = true)
    public PageResponse<ProductSummaryResponse> search(
            String category,
            String search,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            BigDecimal minRating,
            Boolean inStock,
            String badge,
            List<String> sort,
            Pageable pageable) {
        validateFilters(minPrice, maxPrice, minRating);

        ProductSortMode sortMode = resolveSortMode(sort, pageable.getSort());
        Pageable queryPageable = withSearchSort(pageable, sortMode);
        Specification<Product> specification = buildSearchSpecification(
                normalize(category),
                normalize(search),
                minPrice,
                maxPrice,
                minRating,
                inStock,
                normalize(badge));

        Page<Product> page = productRepository.findAll(specification, queryPageable);
        return PageResponse.from(page.map(productMapper::toSummary));
    }

    @Transactional(readOnly = true)
    public ProductResponse findBySlug(String slug) {
        return productMapper.toResponse(getProductEntityBySlug(slug));
    }

    @Transactional(readOnly = true)
    public Product getProductEntityBySlug(String slug) {
        return productRepository.findBySlugIgnoreCase(slug)
                .orElseThrow(() -> ResourceNotFoundException.of("Product", slug));
    }

    @Transactional(readOnly = true)
    public Product getProductEntityById(Long id) {
        return productRepository.findById(id)
                .orElseThrow(() -> ResourceNotFoundException.of("Product", id));
    }

    @Transactional
    public Product getProductEntityByIdForUpdate(Long id) {
        return productRepository.findByIdForUpdate(id)
                .orElseThrow(() -> ResourceNotFoundException.of("Product", id));
    }

    @Transactional(readOnly = true)
    public List<ProductSummaryResponse> findFeatured() {
        return productRepository.findTop8ByBadgeIsNotNullOrderByCreatedAtDesc().stream()
                .map(productMapper::toSummary)
                .collect(Collectors.toList());
    }

    @Transactional(readOnly = true)
    public List<ProductSummaryResponse> findRelated(String slug) {
        Product product = getProductEntityBySlug(slug);
        return productRepository.findTop4ByCategory_IdAndIdNot(product.getCategory().getId(), product.getId())
                .stream()
                .map(productMapper::toSummary)
                .toList();
    }

    @Transactional
    public ProductResponse create(ProductRequest request) {
        if (productRepository.existsBySlugIgnoreCase(request.slug())) {
            throw new DuplicateResourceException("A product with slug '" + request.slug() + "' already exists");
        }
        if (productRepository.existsBySkuIgnoreCase(request.sku())) {
            throw new DuplicateResourceException("A product with SKU '" + request.sku() + "' already exists");
        }

        Category category = categoryService.getCategoryEntityById(request.categoryId());
        Product product = Product.builder().build();
        applyRequest(product, request, category);

        return productMapper.toResponse(productRepository.save(product));
    }

    @Transactional
    public ProductResponse update(Long id, ProductRequest request) {
        Product product = getProductEntityById(id);

        if (!product.getSlug().equalsIgnoreCase(request.slug()) && productRepository.existsBySlugIgnoreCase(request.slug())) {
            throw new DuplicateResourceException("A product with slug '" + request.slug() + "' already exists");
        }
        if (!product.getSku().equalsIgnoreCase(request.sku()) && productRepository.existsBySkuIgnoreCase(request.sku())) {
            throw new DuplicateResourceException("A product with SKU '" + request.sku() + "' already exists");
        }

        Category category = categoryService.getCategoryEntityById(request.categoryId());
        applyRequest(product, request, category);

        return productMapper.toResponse(product);
    }

    @Transactional
    public void delete(Long id) {
        Product product = getProductEntityById(id);
        productRepository.delete(product);
    }

    private void applyRequest(Product product, ProductRequest request, Category category) {
        product.setSku(request.sku());
        product.setSlug(request.slug());
        product.setName(request.name());
        product.setTagline(request.tagline());
        product.setCategory(category);
        product.setPrice(request.price());
        product.setOriginalPrice(request.originalPrice());
        product.setDescription(request.description());
        product.setBadge(request.badge());
        product.setStock(request.stock());
        product.setAccent(request.accent());

        product.getFeatures().clear();
        product.getFeatures().addAll(request.features());

        product.getSpecs().clear();
        if (request.specs() != null) {
            product.getSpecs().putAll(request.specs());
        }

        product.getImages().clear();
        product.getImages().addAll(request.images());

        product.getColors().clear();
        if (request.colors() != null) {
            request.colors().forEach(dto -> product.getColors().add(productMapper.toColorEntity(dto)));
        }
    }

    private void validateFilters(BigDecimal minPrice, BigDecimal maxPrice, BigDecimal minRating) {
        if (minPrice != null && minPrice.signum() < 0) {
            throw new BadRequestException("minPrice must be greater than or equal to zero");
        }
        if (maxPrice != null && maxPrice.signum() < 0) {
            throw new BadRequestException("maxPrice must be greater than or equal to zero");
        }
        if (minPrice != null && maxPrice != null && minPrice.compareTo(maxPrice) > 0) {
            throw new BadRequestException("minPrice cannot be greater than maxPrice");
        }
        if (minRating != null
                && (minRating.compareTo(BigDecimal.ZERO) < 0 || minRating.compareTo(BigDecimal.valueOf(5)) > 0)) {
            throw new BadRequestException("minRating must be between 0 and 5");
        }
    }

    private ProductSortMode resolveSortMode(List<String> rawSort, Sort pageableSort) {
        if (rawSort != null) {
            for (String value : rawSort) {
                if (hasText(value)) {
                    return parseSort(value);
                }
            }
        }

        if (pageableSort.isSorted()) {
            Sort.Order order = pageableSort.iterator().next();
            return toSortMode(order.getProperty(), order.getDirection());
        }

        return ProductSortMode.DEFAULT;
    }

    private Specification<Product> buildSearchSpecification(
            String category,
            String search,
            BigDecimal minPrice,
            BigDecimal maxPrice,
            BigDecimal minRating,
            Boolean inStock,
            String badge) {
        Specification<Product> specification = Specification.where(null);

        if (category != null) {
            String categoryValue = category.toLowerCase(Locale.ROOT);
            specification = specification.and((root, query, criteriaBuilder) -> {
                var categoryJoin = root.join("category");
                return criteriaBuilder.or(
                        criteriaBuilder.equal(criteriaBuilder.lower(categoryJoin.get("slug")), categoryValue),
                        criteriaBuilder.equal(criteriaBuilder.lower(categoryJoin.get("name")), categoryValue));
            });
        }

        if (search != null) {
            String searchPattern = "%" + search.toLowerCase(Locale.ROOT) + "%";
            specification = specification.and((root, query, criteriaBuilder) -> criteriaBuilder.or(
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("name")), searchPattern),
                    criteriaBuilder.like(criteriaBuilder.lower(root.get("description")), searchPattern)));
        }

        if (minPrice != null) {
            specification = specification.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.greaterThanOrEqualTo(root.get("price"), minPrice));
        }

        if (maxPrice != null) {
            specification = specification.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.lessThanOrEqualTo(root.get("price"), maxPrice));
        }

        if (minRating != null) {
            specification = specification.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.greaterThanOrEqualTo(root.get("rating"), minRating));
        }

        if (inStock != null) {
            specification = specification.and((root, query, criteriaBuilder) -> inStock
                    ? criteriaBuilder.greaterThan(root.get("stock"), 0)
                    : criteriaBuilder.equal(root.get("stock"), 0));
        }

        if (badge != null) {
            String badgeValue = badge.toLowerCase(Locale.ROOT);
            specification = specification.and((root, query, criteriaBuilder) ->
                    criteriaBuilder.equal(criteriaBuilder.lower(root.get("badge")), badgeValue));
        }

        return specification;
    }

    private Pageable withSearchSort(Pageable pageable, ProductSortMode sortMode) {
        if (!pageable.isPaged()) {
            return Pageable.unpaged();
        }

        return PageRequest.of(pageable.getPageNumber(), pageable.getPageSize(), sortFor(sortMode));
    }

    private Sort sortFor(ProductSortMode sortMode) {
        return switch (sortMode) {
            case FEATURED -> Sort.by(
                    Sort.Order.asc("badge").nullsLast(),
                    Sort.Order.asc("id"));
            case PRICE_ASC -> Sort.by(Sort.Order.asc("price"), Sort.Order.asc("id"));
            case PRICE_DESC -> Sort.by(Sort.Order.desc("price"), Sort.Order.asc("id"));
            case RATING_ASC -> Sort.by(Sort.Order.asc("rating"), Sort.Order.asc("id"));
            case RATING_DESC -> Sort.by(Sort.Order.desc("rating"), Sort.Order.asc("id"));
            case DEFAULT -> Sort.by(Sort.Order.asc("id"));
        };
    }

    private ProductSortMode parseSort(String rawSort) {
        String normalized = rawSort.trim().toLowerCase(Locale.ROOT);

        return switch (normalized) {
            case "featured", "featured,asc", "featured,desc" -> ProductSortMode.FEATURED;
            case "price-asc" -> ProductSortMode.PRICE_ASC;
            case "price-desc" -> ProductSortMode.PRICE_DESC;
            case "rating", "rating-desc", "rating,desc" -> ProductSortMode.RATING_DESC;
            case "rating-asc", "rating,asc" -> ProductSortMode.RATING_ASC;
            default -> {
                String[] parts = normalized.split(",");
                Sort.Direction direction = parts.length > 1 && "desc".equals(parts[1].trim())
                        ? Sort.Direction.DESC
                        : Sort.Direction.ASC;
                yield toSortMode(parts[0].trim(), direction);
            }
        };
    }

    private ProductSortMode toSortMode(String property, Sort.Direction direction) {
        return switch (property) {
            case "featured" -> ProductSortMode.FEATURED;
            case "price" -> direction.isDescending() ? ProductSortMode.PRICE_DESC : ProductSortMode.PRICE_ASC;
            case "rating" -> direction.isAscending() ? ProductSortMode.RATING_ASC : ProductSortMode.RATING_DESC;
            default -> throw new BadRequestException(
                    "Unsupported product sort '" + property + "'. Use featured, price-asc, price-desc, or rating.");
        };
    }

    private String normalize(String value) {
        return hasText(value) ? value.trim() : null;
    }

    private boolean hasText(String value) {
        return value != null && !value.trim().isEmpty();
    }

    private enum ProductSortMode {
        DEFAULT,
        FEATURED,
        PRICE_ASC,
        PRICE_DESC,
        RATING_ASC,
        RATING_DESC
    }
}
