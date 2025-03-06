package com.sneakpeak.bricool.reviews;

import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reviews")
public class ReviewController {


    private final ReviewService reviewService;

    public ReviewController(ReviewService reviewService) {
        this.reviewService = reviewService;
    }

    @PostMapping
    public ResponseEntity<Object> addReview(Review review) {

        Review createdReview = reviewService.addReview(review);

        if(createdReview == null) {
            return ResponseEntity.status(400).body("Review not created");
        }

        return ResponseEntity.status(201).body(createdReview);
    }


    @GetMapping
    public ResponseEntity<Object> getAllReviews() {
        return ResponseEntity.ok(reviewService.getAllReviews());
    }


    @GetMapping("/client/{clientId}")
    public ResponseEntity<Object> getReviewByClientId(Long clientId) {
        return ResponseEntity.ok(reviewService.getReviewByClientId(clientId));
    }

    @GetMapping("/worker/{workerId}")
    public ResponseEntity<Object> getReviewByWorkerId(Long workerId) {
        return ResponseEntity.ok(reviewService.getReviewByWorkerId(workerId));
    }


    @GetMapping("/{id}")
    public ResponseEntity<Object> getReviewById(Long id) {
        Review review = reviewService.getReviewById(id);

        if(review == null) {
            return ResponseEntity.status(404).body("Review not found");
        }

        return ResponseEntity.ok(review);
    }


    @PutMapping("/{id}")
    public ResponseEntity<Object> updateReview(Long id, Review review) {
        Review updatedReview = reviewService.updateReview(id, review);

        if(updatedReview == null) {
            return ResponseEntity.status(404).body("Review not found");
        }

        return ResponseEntity.ok(updatedReview);
    }


    @DeleteMapping("/{id}")
    public ResponseEntity<Object> deleteReview(Long id) {
        boolean isDeleted = reviewService.deleteReview(id);

        if(!isDeleted) {
            return ResponseEntity.status(404).body("Review not found");
        }

        return ResponseEntity.status(204).build();
    }
}
