package com.sneakpeak.bricool.reviews;

import com.sneakpeak.bricool.config.JwtService;
import com.sneakpeak.bricool.user.User;
import com.sneakpeak.bricool.user.UserService;
import com.sneakpeak.bricool.user.Worker;
import org.modelmapper.ModelMapper;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/reviews")
public class ReviewController {



    private final ReviewService reviewService;
    private final JwtService jwtService;
    private final UserService userService;
    private final ModelMapper modelMapper;

    public ReviewController(ReviewService reviewService, JwtService jwtService, UserService userService, ModelMapper modelMapper) {
        this.reviewService = reviewService;
        this.jwtService = jwtService;
        this.userService = userService;
        this.modelMapper = modelMapper;
    }

    @PostMapping
    public ResponseEntity<Object> addReview(@RequestBody Review review, @RequestParam("workerId") Long id, @RequestHeader("Authorization") String header) {

        String token = header.replace("Bearer ", "");

        String username = jwtService.extractUsername(token);
        User client = userService.getClient(username);
        Worker worker = userService.getWorker(id)
                .orElseThrow(() -> new RuntimeException("Worker not found"));
        review.setClient(client);
        review.setWorker(worker);
        System.out.println(review);

        Review createdReview = reviewService.addReview(review);

        if(createdReview == null) {
            return ResponseEntity.status(400).body("Review not created");
        }

        ReviewReturnDTO reviewReturnDTO = modelMapper.map(createdReview, ReviewReturnDTO.class);


        return ResponseEntity.status(201).body(reviewReturnDTO);
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
    public ResponseEntity<Object> deleteReview(@PathVariable Long id, @RequestHeader("Authorization") String header) {
        String token = header.replace("Bearer ", "");

        String username = jwtService.extractUsername(token);
        User auth = userService.getClient(username);

        boolean isDeleted = reviewService.deleteReview(id, auth.getId());

        if(!isDeleted) {
            return ResponseEntity.status(404).body("Review not found");
        }
        return ResponseEntity.status(204).build();
    }
}
