package com.sneakpeak.bricool.reviews;

import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class ReviewService {


    private final ReviewRepository reviewRepository;

    public ReviewService(ReviewRepository reviewRepository) {
        this.reviewRepository = reviewRepository;
    }

    public Review addReview(Review review) {
        return reviewRepository.save(review);
    }

    public Review getReviewById(Long id) {
        return reviewRepository.findById(id).orElse(null);
    }

    public Review updateReview(Long id, Review review) {
        Review reviewToUpdate = reviewRepository.findById(id).orElse(null);
        if (reviewToUpdate == null) {
            return null;
        }
        reviewToUpdate.setStars(review.getStars());
        reviewToUpdate.setContent(review.getContent());
        return reviewRepository.save(reviewToUpdate);
    }

    public boolean deleteReview(Long id) {
        Review review = reviewRepository.findById(id).orElse(null);
        if (review == null) {
            return false;
        }
        reviewRepository.delete(review);
        return true;
    }

    public Object getAllReviews() {
        return reviewRepository.findAll();
    }

    public List<Review> getReviewByClientId(Long clientId) {
        return reviewRepository.findByClientId(clientId);
    }

    public Object getReviewByWorkerId(Long workerId) {
        return reviewRepository.findByWorkerId(workerId);
    }
}
