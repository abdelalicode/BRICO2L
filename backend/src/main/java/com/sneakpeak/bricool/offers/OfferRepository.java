package com.sneakpeak.bricool.offers;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.JpaSpecificationExecutor;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface OfferRepository  extends JpaRepository<Offer, Long>, JpaSpecificationExecutor<Offer> {

    @Query(value = "SELECT o.* FROM offer o " +
            "INNER JOIN users w ON o.worker_id = w.id " +
            "WHERE w.city_id = :cityId " +
            "AND w.user_type = 'worker'", nativeQuery = true)
    List<Offer> findByCity(@Param("cityId") Long cityId);


    @Query(value = "SELECT o.* FROM offer o " +
            "INNER JOIN users w ON o.worker_id = w.id " +
            "WHERE w.profession_id = :jobId " +
            "AND w.user_type = 'worker'", nativeQuery = true)
    List<Offer> findByJob(@Param("jobId") Long jobId);
}
