package com.elevate.backend.mapper;

import com.elevate.backend.dto.review.ReviewResponse;
import com.elevate.backend.entity.Review;
import org.springframework.stereotype.Component;

@Component
public class ReviewMapper {

    public ReviewResponse toResponse(Review review) {
        return toResponse(review, null);
    }

    public ReviewResponse toResponse(Review review, Long currentUserId) {
        return new ReviewResponse(
                review.getId(),
                review.getProduct().getId(),
                review.getUser().getFullName(),
                review.getRating(),
                review.getComment(),
                review.getCreatedAt(),
                currentUserId != null && currentUserId.equals(review.getUser().getId()));
    }
}
