package com.sneakpeak.bricool.worker;

import com.sneakpeak.bricool.user.User;
import jakarta.transaction.Transactional;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.Optional;


public interface WorkerRepository extends JpaRepository<Worker, Long> {
    Optional<Worker> findByEmail(String email);

}
