package com.elevate.backend.controller;

import com.elevate.backend.dto.common.PageResponse;
import com.elevate.backend.dto.product.ProductRequest;
import com.elevate.backend.dto.product.ProductResponse;
import com.elevate.backend.dto.product.ProductSummaryResponse;
import com.elevate.backend.service.ProductService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.math.BigDecimal;
import java.util.List;

@RestController
@RequestMapping("/api/products")
@RequiredArgsConstructor
@Tag(name = "Products", description = "Product catalog browsing and admin management")
public class ProductController {

    private final ProductService productService;

    @GetMapping
    public ResponseEntity<PageResponse<ProductSummaryResponse>> search(
            @RequestParam(required = false) String category,
            @RequestParam(required = false) String search,
            @RequestParam(required = false) BigDecimal minPrice,
            @RequestParam(required = false) BigDecimal maxPrice,
            @RequestParam(required = false) BigDecimal minRating,
            @RequestParam(required = false) Boolean inStock,
            @RequestParam(required = false) String badge,
            @RequestParam(required = false, name = "sort") List<String> sort,
            @PageableDefault(size = 24) Pageable pageable) {
        return ResponseEntity.ok(productService.search(
                category, search, minPrice, maxPrice, minRating, inStock, badge, sort, pageable));
    }

    @GetMapping("/featured")
    public ResponseEntity<List<ProductSummaryResponse>> featured() {
        return ResponseEntity.ok(productService.findFeatured());
    }

    @GetMapping("/{slug}")
    public ResponseEntity<ProductResponse> findBySlug(@PathVariable String slug) {
        return ResponseEntity.ok(productService.findBySlug(slug));
    }

    @GetMapping("/{slug}/related")
    public ResponseEntity<List<ProductSummaryResponse>> related(@PathVariable String slug) {
        return ResponseEntity.ok(productService.findRelated(slug));
    }

    @PostMapping
    public ResponseEntity<ProductResponse> create(@Valid @RequestBody ProductRequest request) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.create(request));
    }

    @PutMapping("/{id}")
    public ResponseEntity<ProductResponse> update(@PathVariable Long id, @Valid @RequestBody ProductRequest request) {
        return ResponseEntity.ok(productService.update(id, request));
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<Void> delete(@PathVariable Long id) {
        productService.delete(id);
        return ResponseEntity.noContent().build();
    }
}
