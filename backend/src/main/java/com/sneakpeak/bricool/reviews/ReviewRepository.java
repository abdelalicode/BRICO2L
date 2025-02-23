package com.sneakpeak.bricool.reviews;


import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface ReviewRepository extends JpaRepository<Review, Long> {

    @Query("SELECT r FROM Review r WHERE r.client.id = :clientId")
    List<Review> findByClientId(Long clientId);

    @Query("SELECT r FROM Review r WHERE r.worker.id = :workerId")
    List<Review> findByWorkerId(Long workerId);
}
