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
import org.junit.jupiter.api.Test;
import org.junit.jupiter.api.extension.ExtendWith;
import org.mockito.Mock;
import org.mockito.junit.jupiter.MockitoExtension;
import org.springframework.data.domain.PageImpl;
import org.springframework.data.domain.PageRequest;

import java.math.BigDecimal;
import java.util.List;
import java.util.Optional;

import static org.assertj.core.api.Assertions.assertThat;
import static org.junit.jupiter.api.Assertions.assertThrows;
import static org.mockito.ArgumentMatchers.any;
import static org.mockito.BDDMockito.given;
import static org.mockito.Mockito.verify;

@ExtendWith(MockitoExtension.class)
class ReviewServiceTest {

    @Mock
    private ReviewRepository reviewRepository;
    @Mock
    private ProductRepository productRepository;
    @Mock
    private UserRepository userRepository;
    @Mock
    private ProductService productService;

    private final ReviewMapper reviewMapper = new ReviewMapper();

    private ReviewService reviewService() {
        return new ReviewService(reviewRepository, productRepository, userRepository, productService, reviewMapper);
    }

    private Product product(long id) {
        return Product.builder()
                .id(id)
                .sku("SKU-" + id)
                .slug("product-" + id)
                .name("Product " + id)
                .tagline("A useful product")
                .price(new BigDecimal("100.00"))
                .rating(new BigDecimal("4.50"))
                .reviewCount(12)
                .accent("#7dd3fc")
                .build();
    }

    private User user(long id) {
        return User.builder()
                .id(id)
                .email("user-" + id + "@example.com")
                .passwordHash("hash")
                .firstName("Test")
                .lastName("User")
                .build();
    }

    private Review review(long id, Product product, User user, int rating, String comment) {
        return Review.builder()
                .id(id)
                .product(product)
                .user(user)
                .rating(rating)
                .comment(comment)
                .build();
    }

    @Test
    void findForProduct_marksCurrentUsersReview() {
        Product product = product(1L);
        User user = user(7L);
        Review review = review(11L, product, user, 5, "Excellent");

        given(productService.getProductEntityBySlug("product-1")).willReturn(product);
        given(reviewRepository.findByProduct_IdOrderByCreatedAtDesc(1L, PageRequest.of(0, 10)))
                .willReturn(new PageImpl<>(List.of(review)));

        PageResponse<ReviewResponse> response = reviewService()
                .findForProduct(7L, "product-1", PageRequest.of(0, 10));

        assertThat(response.content()).singleElement().satisfies(item -> {
            assertThat(item.id()).isEqualTo(11L);
            assertThat(item.mine()).isTrue();
        });
    }

    @Test
    void upsert_createsOneReviewAndRecalculatesAggregate() {
        Product product = product(1L);
        User user = user(7L);

        given(productService.getProductEntityBySlug("product-1")).willReturn(product);
        given(userRepository.findById(7L)).willReturn(Optional.of(user));
        given(reviewRepository.findByProduct_IdAndUser_Id(1L, 7L)).willReturn(Optional.empty());
        given(reviewRepository.save(any(Review.class))).willAnswer(invocation -> {
            Review review = invocation.getArgument(0);
            review.setId(100L);
            return review;
        });
        given(reviewRepository.averageRatingForProduct(1L)).willReturn(5.0);
        given(reviewRepository.countByProduct_Id(1L)).willReturn(1L);

        ReviewResponse response = reviewService()
                .upsert(7L, "product-1", new ReviewRequest(5, "Excellent"));

        assertThat(response.id()).isEqualTo(100L);
        assertThat(response.mine()).isTrue();
        assertThat(product.getRating()).isEqualByComparingTo("5.00");
        assertThat(product.getReviewCount()).isEqualTo(1);
        verify(reviewRepository).flush();
        verify(productRepository).save(product);
    }

    @Test
    void upsert_existingReviewUpdatesInsteadOfDuplicating() {
        Product product = product(1L);
        User user = user(7L);
        Review existing = review(100L, product, user, 3, "Good");

        given(productService.getProductEntityBySlug("product-1")).willReturn(product);
        given(userRepository.findById(7L)).willReturn(Optional.of(user));
        given(reviewRepository.findByProduct_IdAndUser_Id(1L, 7L)).willReturn(Optional.of(existing));
        given(reviewRepository.save(existing)).willReturn(existing);
        given(reviewRepository.averageRatingForProduct(1L)).willReturn(4.0);
        given(reviewRepository.countByProduct_Id(1L)).willReturn(1L);

        ReviewResponse response = reviewService()
                .upsert(7L, "product-1", new ReviewRequest(4, "Better now"));

        assertThat(response.id()).isEqualTo(100L);
        assertThat(existing.getRating()).isEqualTo(4);
        assertThat(existing.getComment()).isEqualTo("Better now");
        assertThat(product.getRating()).isEqualByComparingTo("4.00");
        assertThat(product.getReviewCount()).isEqualTo(1);
    }

    @Test
    void deleteMine_removesReviewAndResetsAggregateWhenNoReviewsRemain() {
        Product product = product(1L);
        User user = user(7L);
        Review existing = review(100L, product, user, 5, "Excellent");

        given(productService.getProductEntityBySlug("product-1")).willReturn(product);
        given(reviewRepository.findByProduct_IdAndUser_Id(1L, 7L)).willReturn(Optional.of(existing));
        given(reviewRepository.averageRatingForProduct(1L)).willReturn(0.0);
        given(reviewRepository.countByProduct_Id(1L)).willReturn(0L);

        reviewService().deleteMine(7L, "product-1");

        verify(reviewRepository).delete(existing);
        verify(reviewRepository).flush();
        assertThat(product.getRating()).isEqualByComparingTo("0.00");
        assertThat(product.getReviewCount()).isZero();
    }

    @Test
    void deleteMine_missingUserReviewThrowsNotFound() {
        Product product = product(1L);

        given(productService.getProductEntityBySlug("product-1")).willReturn(product);
        given(reviewRepository.findByProduct_IdAndUser_Id(1L, 7L)).willReturn(Optional.empty());

        assertThrows(ResourceNotFoundException.class, () -> reviewService().deleteMine(7L, "product-1"));
    }
}
