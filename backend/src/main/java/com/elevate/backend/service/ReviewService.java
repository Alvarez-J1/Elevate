package com.elevate.backend.service;

import com.elevate.backend.dto.common.PageResponse;
import com.elevate.backend.dto.review.ReviewRequest;
import com.elevate.backend.dto.review.ReviewResponse;
import com.elevate.backend.entity.Product;
import com.elevate.backend.entity.Review;
import com.elevate.backend.entity.User;
import com.elevate.backend.exception.ResourceNotFoundException;
import com.elevate.backend.mapper.ReviewMapper;
import com.elevate.backend.repository.ProductRepository;
import com.elevate.backend.repository.ReviewRepository;
import com.elevate.backend.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.math.BigDecimal;
import java.math.RoundingMode;

@Service
@RequiredArgsConstructor
public class ReviewService {

    private final ReviewRepository reviewRepository;
    private final ProductRepository productRepository;
    private final UserRepository userRepository;
    private final ProductService productService;
    private final ReviewMapper reviewMapper;

    @Transactional(readOnly = true)
    public PageResponse<ReviewResponse> findForProduct(Long currentUserId, String productSlug, Pageable pageable) {
        Product product = productService.getProductEntityBySlug(productSlug);
        Page<Review> page = reviewRepository.findByProduct_IdOrderByCreatedAtDesc(product.getId(), pageable);
        return PageResponse.from(page.map(review -> reviewMapper.toResponse(review, currentUserId)));
    }

    @Transactional
    public ReviewResponse upsert(Long userId, String productSlug, ReviewRequest request) {
        Product product = productService.getProductEntityBySlug(productSlug);
        User user = userRepository.findById(userId)
                .orElseThrow(() -> ResourceNotFoundException.of("User", userId));

        Review review = reviewRepository.findByProduct_IdAndUser_Id(product.getId(), user.getId())
                .orElseGet(() -> Review.builder().product(product).user(user).build());

        review.setRating(request.rating());
        review.setComment(request.comment());
        Review saved = reviewRepository.save(review);
        reviewRepository.flush();

        recalculateAggregateRating(product);

        return reviewMapper.toResponse(saved, userId);
    }

    @Transactional
    public void deleteMine(Long userId, String productSlug) {
        Product product = productService.getProductEntityBySlug(productSlug);
        Review review = reviewRepository.findByProduct_IdAndUser_Id(product.getId(), userId)
                .orElseThrow(() -> ResourceNotFoundException.of("Review", "current user for product " + productSlug));

        reviewRepository.delete(review);
        reviewRepository.flush();
        recalculateAggregateRating(product);
    }

    private void recalculateAggregateRating(Product product) {
        Double rawAverage = reviewRepository.averageRatingForProduct(product.getId());
        BigDecimal average = BigDecimal.valueOf(rawAverage).setScale(2, RoundingMode.HALF_UP);
        long count = reviewRepository.countByProduct_Id(product.getId());

        product.setRating(average);
        product.setReviewCount((int) count);
        productRepository.save(product);
    }
}
