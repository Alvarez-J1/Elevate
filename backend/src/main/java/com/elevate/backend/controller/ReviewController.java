package com.elevate.backend.controller;

import com.elevate.backend.dto.common.PageResponse;
import com.elevate.backend.dto.review.ReviewRequest;
import com.elevate.backend.dto.review.ReviewResponse;
import com.elevate.backend.security.SecurityUser;
import com.elevate.backend.service.ReviewService;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.data.web.PageableDefault;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.annotation.AuthenticationPrincipal;
import org.springframework.web.bind.annotation.DeleteMapping;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequestMapping("/api/products/{slug}/reviews")
@RequiredArgsConstructor
@Tag(name = "Reviews", description = "Customer product reviews and ratings")
public class ReviewController {

    private final ReviewService reviewService;

    @GetMapping
    public ResponseEntity<PageResponse<ReviewResponse>> findForProduct(
            @AuthenticationPrincipal SecurityUser principal,
            @PathVariable String slug,
            @PageableDefault(size = 10) Pageable pageable) {
        Long userId = principal != null ? principal.getId() : null;
        return ResponseEntity.ok(reviewService.findForProduct(userId, slug, pageable));
    }

    /**
     * Creates the caller's review for this product, or updates it if one
     * already exists (one review per user per product).
     */
    @PutMapping("/me")
    public ResponseEntity<ReviewResponse> upsertMyReview(
            @AuthenticationPrincipal SecurityUser principal,
            @PathVariable String slug,
            @Valid @RequestBody ReviewRequest request) {
        return ResponseEntity.ok(reviewService.upsert(principal.getId(), slug, request));
    }

    @DeleteMapping("/me")
    public ResponseEntity<Void> deleteMyReview(
            @AuthenticationPrincipal SecurityUser principal,
            @PathVariable String slug) {
        reviewService.deleteMine(principal.getId(), slug);
        return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
    }
}
