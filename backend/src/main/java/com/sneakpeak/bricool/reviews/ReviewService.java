package com.sneakpeak.bricool.reviews;

import com.sneakpeak.bricool.exception.NotAuthorizedException;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

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

    public boolean deleteReview(Long id, Long authId) {
        Review review = reviewRepository.findById(id).orElse(null);

        if(review == null) {
            return false;
        }
        if(!Objects.equals(review.getClient().getId(), authId)) {
            throw new NotAuthorizedException("You are not authorized to delete this review");
        }
        reviewRepository.delete(review);
        return true;
    }

    public List<Review> getAllReviews() {
        return reviewRepository.findAll();
    }

    public List<Review> getReviewByClientId(Long clientId) {
        return reviewRepository.findByClientId(clientId);
    }

    public Object getReviewByWorkerId(Long workerId) {
        return reviewRepository.findByWorkerId(workerId);
    }
}
